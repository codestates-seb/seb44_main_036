package com.codestates.server.project.service;//package com.codestates.server.project.service;

import com.codestates.server.exception.BusinessLogicException;
import com.codestates.server.exception.ExceptionCode;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository){
        this.projectRepository = projectRepository;
    }

    public Project createProject(Project project){
        project.setExpiredDate(LocalDateTime.now().plusDays(project.getEndDay()));
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

    private Project findVerifiedProject(long projectId) {
        Project findProject = projectRepository.findById(projectId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));

        return findProject;
    }
}
