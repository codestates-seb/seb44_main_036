package com.codestates.server.member.controller;

import com.codestates.server.dto.SingleResponseDto;
import com.codestates.server.member.dto.SignupPostDto;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.mapper.MemberMapper;
import com.codestates.server.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;
    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }
    //회원 정보 등록
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody SignupPostDto signupPostDto) {
        Member member = mapper.signupPostDtoToMember(signupPostDto);

        Member response = memberService.createMember(member);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponseDto(response)), HttpStatus.CREATED);
    }

//    //회원 정보 수정
//    @PatchMapping("/{member-id}")
//    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
//                                      @Valid @RequestBody MemberPatchDto memberPatchDto) {
//        memberPatchDto.setMemberId(memberId);
//        Member response = memberService.updateMember(mapper.memberPatchDtoToMember(memberPatchDto));
//        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.OK);
//    }
//    //전체 회원 정보 조회
//    @GetMapping
//    public ResponseEntity getMembers() {
//        List<Member> members = memberService.findMembers();
//        List<MemberResponseDto> response =
//                members.stream()
//                        .map(member -> mapper.memberToMemberResponseDto(member))
//                        .collect(Collectors.toList());
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//
//
//    //회원 정보 조회
//    @GetMapping("/{member-id}")
//    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
//        Member response = memberService.findMember(memberId);
//        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.OK);
//    }
//
//    // 회원 정보 삭제
//    @DeleteMapping("/{member-id}")
//    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
//        memberService.deleteMember(memberId);
//        return new ResponseEntity(HttpStatus.OK);
//    }
}
