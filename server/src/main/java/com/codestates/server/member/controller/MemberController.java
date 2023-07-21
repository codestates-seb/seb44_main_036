package com.codestates.server.member.controller;

import com.codestates.server.dto.SingleResponseDto;
import com.codestates.server.funding.entity.Funding;
import com.codestates.server.funding.mapper.FundingMapper;
import com.codestates.server.funding.service.FundingService;
import com.codestates.server.member.dto.SignupPostDto;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.mapper.MemberMapper;
import com.codestates.server.member.service.MemberService;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.mapper.ProjectMapper;
import com.codestates.server.project.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    private final ProjectService projectService;

    private final ProjectMapper projectMapper;

    private final FundingMapper fundingMapper;

    private final FundingService fundingService;


    public MemberController(MemberService memberService, MemberMapper mapper, ProjectService projectService, ProjectMapper projectMapper, FundingMapper fundingMapper, FundingService fundingService) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.projectService = projectService;
        this.projectMapper = projectMapper;
        this.fundingMapper = fundingMapper;
        this.fundingService = fundingService;
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
    //회원 정보 조회
    @GetMapping("/members/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member response = memberService.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.OK);
    }
//
//    // 회원 정보 삭제
//    @DeleteMapping("/{member-id}")
//    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
//        memberService.deleteMember(memberId);
//        return new ResponseEntity(HttpStatus.OK);
//    }
    @GetMapping("/members/{member-id}/project")
    public ResponseEntity getProjectsByMemberId(@PathVariable("member-id") long memberId){
        List<Project> findProjects = projectService.findByMemberId(memberId);

    return new ResponseEntity(projectMapper.projectsToProjectResponseDtos(findProjects),HttpStatus.OK);
}

    @GetMapping("/members/{member-id}/funding")
    public ResponseEntity getFundingByMemberId(@PathVariable("member-id") long memberId){
        List<Funding> findFundings = fundingService.findByMemberId(memberId);

        return new ResponseEntity(fundingMapper.fundingsToFundingResponseDtos(findFundings),HttpStatus.OK);
    }


}
