package com.codestates.server.member.mapper;

import com.codestates.server.member.dto.MemberDto;
import com.codestates.server.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchToMember(MemberDto.Patch requestBody);
    default MemberDto memberToMemberResponse(Member member){
        MemberDto responseDto = new MemberDto();
        responseDto.setMemberId(member.getMemberId());
        responseDto.setNickname(member.getNickname());
        responseDto.setEmail(member.getEmail());
        responseDto.setProjects(member.getProjects());
        responseDto.setFundings(member.getFundings());
        return responseDto;
    }
}
