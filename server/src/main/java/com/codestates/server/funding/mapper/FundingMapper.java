package com.codestates.server.funding.mapper;

import com.codestates.server.funding.dto.FundingDto;
import com.codestates.server.funding.entity.Funding;
import com.codestates.server.member.entity.Member;
import com.codestates.server.project.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FundingMapper {
    default Funding fundingPostDtoToFunding(FundingDto.Post post){
        Funding funding = new Funding();
        Member member = new Member();
        Project project = new Project();
        project.setProjectId(post.getProjectId());
        member.setMemberId(post.getMemberId());
        funding.setAddress(post.getAddress());
        funding.setQuantity(post.getQuantity());
        funding.setMember(member);
        funding.setProject(project);

        return funding;
    }

    default FundingDto.Response fundingToFundingResponseDto(Funding funding){
        FundingDto.Response response = new FundingDto.Response();
        response.setAddress(funding.getAddress());
        response.setQuantity(funding.getQuantity());
        response.setMemberId(funding.getMember().getMemberId());
        response.setProjectId(funding.getProject().getProjectId());
        return response;
    }
    List<FundingDto.Response> fundingsToFundingResponseDtos(List<Funding> fundings);
}
