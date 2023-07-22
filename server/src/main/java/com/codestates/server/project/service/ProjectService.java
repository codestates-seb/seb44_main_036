package com.codestates.server.project.service;//package com.codestates.server.project.service;

import com.codestates.server.exception.BusinessLogicException;
import com.codestates.server.exception.ExceptionCode;
import com.codestates.server.member.service.MemberService;
import com.codestates.server.project.dto.ProjectDto;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.mapper.ProjectMapper;
import com.codestates.server.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    private final MemberService memberService;

    private final ProjectMapper mapper;


    public Project createProject(Project project){
        project.setExpiredDate(LocalDateTime.now().plusDays(project.getEndDay()));
        return projectRepository.save(project);
    }

    public Project updateProject(Project project) {
        Project findProject = findProject(project.getProjectId());

        if(findProject.getCurrentAmount() > 0){
            throw new BusinessLogicException(ExceptionCode.PROJECT_CANT_MODIFY);
        }

        Optional.ofNullable(project.getContent())
                .ifPresent(content -> findProject.setContent(content));
        Optional.ofNullable(project.getSummary())
                .ifPresent(summary -> findProject.setSummary(summary));
        Optional.ofNullable(project.getTitle())
                .ifPresent(title -> findProject.setTitle(title));
        Optional.ofNullable(project.getTargetAmount())
                .ifPresent(targetAmount -> findProject.setTargetAmount(targetAmount));
        Optional.ofNullable(project.getEndDay())
                .ifPresent(endDay -> findProject.setEndDay(endDay));
        Optional.ofNullable(project.getEndDay())
                .ifPresent(endDay -> findProject.setExpiredDate(findProject.getCreatedAt().plusDays(endDay)));
        Optional.ofNullable(project.getImageUrl())
                .ifPresent(imageUrl -> findProject.setImageUrl(imageUrl));
        Optional.ofNullable(project.getPrice())
                .ifPresent(price -> findProject.setPrice(price));



        return projectRepository.save(findProject);
    }

    public Project findProject(long projectId){
        return findVerifiedProject(projectId);
    }

    public List<Project> findProjects(){
        return projectRepository.findAll(Sort.by(Sort.Direction.DESC,"projectId"));
    }

    public List<ProjectDto.Response> findByMemberId(long memberId){

        return  mapper.projectsToProjectResponseDtos(projectRepository.findByMemberId(memberId));
    }

    private Project findVerifiedProject(long projectId) {
        Project findProject = projectRepository.findById(projectId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PROJECT_NOT_FOUND));
        return findProject;
    }

    public List<ProjectDto.Response> findByCategoryType(long categoryId){
        return mapper.projectsToProjectResponseDtos(projectRepository.findByCategoryType(categoryId));
    }

    public List<ProjectDto.Response> findByLikedProject(long memberId,Integer likedProject){
        return mapper.projectsToProjectResponseDtos(projectRepository.findByLikedProject(memberId,likedProject));
    }

    public void deleteProject(long projectId){
        if(findProject(projectId).getCurrentAmount() > 0){
            throw new BusinessLogicException(ExceptionCode.PROJECT_CANT_DELETE);
        }
        projectRepository.delete(findProject(projectId));
    }



}
