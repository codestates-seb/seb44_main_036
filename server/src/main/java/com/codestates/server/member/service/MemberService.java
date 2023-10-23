package com.codestates.server.member.service;

import com.codestates.server.auth.utils.CustomAuthorityUtils;
import com.codestates.server.config.Encrypt;
import com.codestates.server.exception.BusinessLogicException;
import com.codestates.server.exception.ExceptionCode;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    private final Encrypt encrypt;


    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());
        if (member.getPassword() != null) {
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        }
        member.setCash(3000000);
        member.setRoles(authorityUtils.createRoles(member.getEmail()));
        return memberRepository.save(member);
    }


    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }


    public Member updateMember(Member member) {
        Member findMember = findMember(member.getMemberId());

        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> findMember.setNickname(nickname));
        Optional.ofNullable(member.getAddress())
                .ifPresent(address -> findMember.setAddress(address));
        Optional.ofNullable(member.getImageUrl())
                .ifPresent(imageUrl -> findMember.setImageUrl(imageUrl));

        return memberRepository.save(findMember);
    }

    public void deleteMember(long memberId) {
        memberRepository.delete(findVerifiedMember(memberId));
    }

    public Member findVerifiedMember(long memberId) {
        return  memberRepository.findById(memberId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistsEmail(String email) {


        if (memberRepository.findByEmail(email).isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXIST);
    }

    public void save(Member member){
        memberRepository.save(member);
    }
}
