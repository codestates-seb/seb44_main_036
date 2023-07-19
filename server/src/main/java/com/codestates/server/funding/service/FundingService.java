package com.codestates.server.funding.service;

import com.codestates.server.funding.entity.Funding;
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

    public Funding createFunding(Funding funding){
        Project findProject = projectService.findProject(funding.getProject().getProjectId());
        int fundingPrice = findProject.getCurrentAmount() + (findProject.getPrice() * funding.getQuantity());
        findProject.setCurrentAmount(fundingPrice);
        projectRepository.save(findProject);

        return fundingRepository.save(funding);
    }

    public Funding updateFunding(Funding funding){
        return funding;
    }

    public Funding findFunding(long fundingId){
        return fundingRepository.findById(fundingId).orElseThrow();
    }

    public List<Funding> findFundings(){
        return fundingRepository.findAll();
    }

    public void cancelFunding(long fundingId){
        fundingRepository.deleteById(fundingId);
    }
}
