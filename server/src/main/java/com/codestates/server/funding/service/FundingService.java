package com.codestates.server.funding.service;

import com.codestates.server.exception.BusinessLogicException;
import com.codestates.server.exception.ExceptionCode;
import com.codestates.server.funding.dto.FundingDto;
import com.codestates.server.funding.entity.Funding;
import com.codestates.server.funding.mapper.FundingMapper;
import com.codestates.server.funding.repository.FundingRepository;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.repository.ProjectRepository;
import com.codestates.server.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FundingService {

    private final FundingRepository fundingRepository;
    private final ProjectRepository projectRepository;

    private final ProjectService projectService;

    private final FundingMapper mapper;

    public Funding createFunding(Funding funding){
        Project findProject = projectService.findProject(funding.getProject().getProjectId());
        findProject.setCurrentAmount(getFundingPrice(funding, findProject));
        projectRepository.save(findProject);

        return fundingRepository.save(funding);
    }

    private static int getFundingPrice(Funding funding, Project findProject) {
        return findProject.getCurrentAmount() + (findProject.getPrice() * funding.getQuantity());
    }

    public Funding findFunding(long fundingId){
        return fundingRepository.findById(fundingId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.FUNDING_NOT_FOUND));
    }

    public List<Funding> findFundings(){
        return fundingRepository.findAll();
    }

    public List<FundingDto.Response> findByMemberId(long memberId){
        return mapper.fundingsToFundingResponseDtos(fundingRepository.findByMemberId(memberId));
    }

    public void cancelFunding(long fundingId){
        fundingRepository.deleteById(fundingId);
    }
}
