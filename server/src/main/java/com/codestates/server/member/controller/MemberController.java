package com.codestates.server.member.controller;
import com.codestates.server.dto.MultiResponseDto;
import com.codestates.server.dto.SingleResponseDto;
import com.codestates.server.member.dto.MemberDto;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.mapper.MemberMapper;
import com.codestates.server.member.service.MemberService;
import com.codestates.server.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

//import static java.util.ResourceBundle.ResourceBundleControlProviderHolder.pa;


/**
 * - DI 적용
 * - Mapstruct Mapper 적용
 * - @ExceptionHandler 적용
 */
@RestController
@RequestMapping("/member")
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }
    // 회원 정보 등록
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);


        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }
    //회원 정보 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);

        Member member =
                memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member)),
                HttpStatus.OK);
    }
    //한명의 회원 정보 조회
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member))
                , HttpStatus.OK);
    }
    // 모든 회원 정보 조회
    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page -1, size);
        List<Member> members = pageMembers.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.membersToMemberResponses(members),
                        pageMembers),
                HttpStatus.OK);
    }
    // 회원 정보 삭제
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}






//package com.codestates.server.member.controller;
//
//import com.codestates.server.dto.SingleResponseDto;
//import com.codestates.server.member.entity.Member;
//import com.codestates.server.member.mapper.MemberMapper;
//import com.codestates.server.member.service.MemberService;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//
//@RestController
//@Validated
//@CrossOrigin
//public class MemberController {
//
//    private final MemberService memberService;
//    private final MemberMapper mapper;
//    public MemberController(MemberService memberService, MemberMapper mapper) {
//        this.memberService = memberService;
//        this.mapper = mapper;
//    }
//    //회원 정보 등록
//    @PostMapping("/signup")
//    public ResponseEntity postMember(@Valid @RequestBody SignupPostDto signupPostDto) {
//        Member member = mapper.signupPostDtoToMember(signupPostDto);
//
//        Member response = memberService.createMember(member);
//        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponseDto(response)), HttpStatus.CREATED);
//    }
//
////    //회원 정보 수정
////    @PatchMapping("/{member-id}")
////    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
////                                      @Valid @RequestBody MemberPatchDto memberPatchDto) {
////        memberPatchDto.setMemberId(memberId);
////        Member response = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));
////        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.OK);
////    }
////    //전체 회원 정보 조회
////    @GetMapping
////    public ResponseEntity getMembers() {
////        List<Member> members = memberService.findMembers();
////        List<MemberResponseDto> response =
////                members.stream()
////                        .map(member -> mapper.memberToMemberResponseDto(member))
////                        .collect(Collectors.toList());
////        return new ResponseEntity<>(response, HttpStatus.OK);
////    }
////
////
////    //회원 정보 조회
////    @GetMapping("/{member-id}")
////    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
////        Member response = memberService.findMember(memberId);
////        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.OK);
////    }
////
////    // 회원 정보 삭제
////    @DeleteMapping("/{member-id}")
////    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
////        memberService.deleteMember(memberId);
////        return new ResponseEntity(HttpStatus.OK);
////    }
//}
