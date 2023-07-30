package com.codestates.server.auth.handler;

import com.codestates.server.auth.jwt.JwtTokenizer;
import com.codestates.server.auth.utils.CustomAuthorityUtils;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    private final MemberService memberService;



    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();

        String nickname = (String) oAuth2User.getAttributes().get("name");
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String image = (String) oAuth2User.getAttributes().get("picture");
        if(image == null){
            image = (String) oAuth2User.getAttributes().get("profile_image");
        }
        Member member = new Member(email,nickname,image);
        List<String> authorities = authorityUtils.createRoles(email);

        Member savedMember = saveMember(member);
        redirect(request,response,savedMember,authorities);
    }

    private Member saveMember(Member member){
        return memberService.createMember(member);
    }

    private void redirect(HttpServletRequest request,HttpServletResponse response,Member member,List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(member,authorities);
        String refreshToken = delegateRefreshToken(member);

        String uri = createURI(accessToken,refreshToken).toString();

        response.setHeader("Authorization","Bearer "+ accessToken);
        response.setHeader("Refresh",refreshToken);

        getRedirectStrategy().sendRedirect(request,response,uri);
    }

    private String delegateAccessToken(Member member,List<String> authorities){
        Map<String,Object> claims = new HashMap<>();
        claims.put("memberId",member.getMemberId());
        claims.put("roles",authorities);

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims,subject,expiration,base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member){
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodedBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject,expiration,base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken,String refreshToken){
        MultiValueMap<String,String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token",accessToken);
        queryParams.add("refresh_token",refreshToken);

        return UriComponentsBuilder
                .newInstance()
//                .scheme("http")
                .scheme("https")
//                .host("localhost")
                .host("mifunding.vercel.app")
                .port(443)
                .path("/users/login")
//                .port(80)
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
