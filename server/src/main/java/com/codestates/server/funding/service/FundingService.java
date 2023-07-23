package com.codestates.server.funding.service;

import com.codestates.server.exception.BusinessLogicException;
import com.codestates.server.exception.ExceptionCode;
import com.codestates.server.funding.dto.FundingDto;
import com.codestates.server.funding.entity.Funding;
import com.codestates.server.funding.mapper.FundingMapper;
import com.codestates.server.funding.repository.FundingRepository;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.service.MemberService;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FundingService {

    private final FundingRepository fundingRepository;
    private final ProjectService projectService;
    private final MemberService memberService;
    private final FundingMapper mapper;

    public Funding createFunding(Funding funding){
        Project findProject = projectService.findProject(funding.getProject().getProjectId());
        Member findMember = memberService.findMember(funding.getMember().getMemberId());
        if(findMember.getCash() < getFundingPrice(funding,findProject)){
            throw new BusinessLogicException(ExceptionCode.MEMBER_CASH_INSUFFICIENT);
        }
        findProject.setCurrentAmount(findProject.getCurrentAmount() + getFundingPrice(funding, findProject));
        projectService.save(findProject);
        findMember.setCash(findMember.getCash() - getFundingPrice(funding,findProject));
        memberService.save(findMember);

        return fundingRepository.save(funding);
    }

    private static int getFundingPrice(Funding funding, Project findProject) {
        return findProject.getPrice() * funding.getQuantity();
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

        Funding findFunding = findFunding(fundingId);
        Project findProject = projectService.findProject(findFunding.getProject().getProjectId());
        Member findMember = memberService.findMember(findFunding.getMember().getMemberId());

        backCash(findFunding, findProject, findMember);
        backCurrentAmount(findFunding, findProject);
        fundingRepository.deleteById(fundingId);
    }

    private void backCurrentAmount(Funding findFunding, Project findProject) {
        findProject.setCurrentAmount(findProject.getCurrentAmount() - getFundingPrice(findFunding, findProject));
        projectService.save(findProject);
    }

    private void backCash(Funding findFunding, Project findProject, Member findMember) {
        findMember.setCash(findMember.getCash() + getFundingPrice(findFunding, findProject));
        memberService.save(findMember);
    }
}
