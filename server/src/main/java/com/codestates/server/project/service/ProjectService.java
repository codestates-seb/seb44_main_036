package com.codestates.server.project.service;//package com.codestates.server.project.service;

import com.codestates.server.exception.BusinessLogicException;
import com.codestates.server.exception.ExceptionCode;
import com.codestates.server.member.entity.Member;
import com.codestates.server.member.service.MemberService;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    private final MemberService memberService;

    public ProjectService(ProjectRepository projectRepository, MemberService memberService){
        this.projectRepository = projectRepository;
        this.memberService = memberService;
    }

    public Project createProject(Project project){
        project.setExpiredDate(LocalDateTime.now().plusDays(project.getEndDay()));
        project.setCurrentAmount(0);
        return projectRepository.save(project);
    }

    public Project updateProject(Project project){
        return project;
    }

    public Project findProject(long projectId){
        return findVerifiedProject(projectId);
    }

    public List<Project> findProjects(){
        return projectRepository.findAll();
    }

    public List<Project> findByMemberId(long memberId){
        List<Project> findProject = projectRepository.findByMemberId(memberId);
        return findProject;
    }

    private Project findVerifiedProject(long projectId) {
        Project findProject = projectRepository.findById(projectId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
        return findProject;
    }

}
