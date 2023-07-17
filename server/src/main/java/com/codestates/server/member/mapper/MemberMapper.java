package com.codestates.server.member.mapper;
import com.codestates.server.member.dto.MemberDto;
import com.codestates.server.member.dto.MemberResponseDto;
import com.codestates.server.member.dto.SignupPostDto;
import com.codestates.server.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchToMember(MemberDto.Patch requestBody);
    MemberDto.Response memberToMemberResponse(Member member);
    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
    Member signupPostDtoToMember(SignupPostDto signupPostDto);
    default MemberResponseDto memberToMemberResponseDto(Member member){
        MemberResponseDto responseDto = new MemberResponseDto();
        responseDto.setMemberId(member.getMemberId());
        responseDto.setNickname(member.getNickname());
        responseDto.setEmail(member.getEmail());
        responseDto.setProjects(member.getProjects());
        return responseDto;
    }
}
