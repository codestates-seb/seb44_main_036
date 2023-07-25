package com.codestates.server.member.controller;


import com.codestates.server.funding.service.FundingService;
import com.codestates.server.member.dto.MemberDto;
import com.codestates.server.member.mapper.MemberMapper;
import com.codestates.server.member.service.MemberService;
import com.codestates.server.project.mapper.ProjectMapper;
import com.codestates.server.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    private final ProjectService projectService;

    private final ProjectMapper projectMapper;
    private final FundingService fundingService;


    //회원 정보 등록
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post post) {


        return new ResponseEntity(mapper.memberToMemberResponseDto(memberService.createMember(mapper.memberPostDtoToMember(post))), HttpStatus.CREATED);
    }

    //회원 정보 수정
    @PatchMapping("/members/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch patch) {
        patch.setMemberId(memberId);
        return new ResponseEntity<>(mapper.memberToMemberResponseDto(memberService.updateMember(mapper.memberPatchDtoToMember(patch))), HttpStatus.OK);
    }
    //전체 회원 정보 조회
    @GetMapping
    public ResponseEntity getMembers() {

        return new ResponseEntity<>(mapper.membersToMemberResponseDtos(memberService.findMembers()), HttpStatus.OK);
    }


    //회원 정보 조회
    @GetMapping("/members/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        return new ResponseEntity<>(mapper.memberToMemberResponseDto(memberService.findMember(memberId)), HttpStatus.OK);
    }

    // 회원 정보 삭제
    @DeleteMapping("/members/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping("/members/{member-id}/project")
    public ResponseEntity getProjectsByMemberId(@PathVariable("member-id") long memberId){

    return new ResponseEntity(projectService.findByMemberId(memberId),HttpStatus.OK);
}

    @GetMapping("/members/{member-id}/funding")
    public ResponseEntity getFundingByMemberId(@PathVariable("member-id") long memberId){


        return new ResponseEntity(projectService.findByFundingMemberId(memberId),HttpStatus.OK);
    }

    @GetMapping("/members/{member-id}/like")
    public ResponseEntity findByMyProjectLiked(@PathVariable("member-id") long memberId){
        return new ResponseEntity(projectService.findByLikedProject(memberId),HttpStatus.OK);
    }


}
