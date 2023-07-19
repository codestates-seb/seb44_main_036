package com.codestates.server.member.mapper;

import com.codestates.server.member.dto.MemberResponseDto;
import com.codestates.server.member.dto.SignupPostDto;
import com.codestates.server.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member signupPostDtoToMember(SignupPostDto signupPostDto);
    default MemberResponseDto memberToMemberResponseDto(Member member){
        MemberResponseDto responseDto = new MemberResponseDto();
        responseDto.setMemberId(member.getMemberId());
        responseDto.setNickname(member.getNickname());
        responseDto.setEmail(member.getEmail());
        responseDto.setProjects(member.getProjects());
        responseDto.setFundings(member.getFundings());
        return responseDto;
    }
}
