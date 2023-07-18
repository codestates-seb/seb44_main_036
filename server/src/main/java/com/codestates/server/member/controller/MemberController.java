package com.codestates.server.member.controller;
import com.codestates.server.dto.MultiResponseDto;
import com.codestates.server.dto.SingleResponseDto;
import com.codestates.server.member.dto.MemberDto;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.mapper.MemberMapper;
import com.codestates.server.member.service.MemberService;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.mapper.ProjectMapper;
import com.codestates.server.project.service.ProjectService;
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

    private final ProjectService projectService;

    private final ProjectMapper projectMapper;


    public MemberController(MemberService memberService, MemberMapper mapper, ProjectService projectService, ProjectMapper projectMapper) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.projectService = projectService;
        this.projectMapper = projectMapper;
    }
    //회원 정보 등록
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);

        Member response = memberService.createMember(member);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponse(response)), HttpStatus.CREATED);
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
    //    //전체 회원 정보 조회
//    @GetMapping
//    public ResponseEntity getMembers() {
//        List<Member> members = memberService.findMembers();
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//
//
    //회원 정보 조회
    @GetMapping("/members/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member response = memberService.findMember(memberId);
        return new ResponseEntity<>(mapper.memberToMemberResponse(response), HttpStatus.OK);
    }
    // 회원 정보 삭제
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/members/{member-id}/myproject")
    public ResponseEntity getProjectsByMemberId(@PathVariable("member-id") long memberId) {
        List<Project> findProjects = projectService.findByMemberId(memberId);

        return new ResponseEntity(projectMapper.projectsToProjectResponseDtos(findProjects), HttpStatus.OK);
    }
}


