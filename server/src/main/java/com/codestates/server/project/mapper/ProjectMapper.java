package com.codestates.server.project.mapper;//package com.codestates.server.project.mapper;

import com.codestates.server.member.entity.Member;
import com.codestates.server.project.dto.ProjectDto;
import com.codestates.server.project.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")

public interface ProjectMapper {

    default Project projectPostDtoToProject(ProjectDto.Post post){
        Project project = new Project();
        Member member = new Member();
        member.setMemberId(post.getMemberId());
        project.setContent(post.getContent());
        project.setSummary(post.getSummary());
        project.setTitle(post.getTitle());
        project.setImageUrl(post.getImageUrl());
        project.setTargetAmount(post.getTargetAmount());
        project.setEndDay(post.getEndDay());
        project.setMember(member);

        return project;
    }


     default ProjectDto.Response projectToProjectResponseDto(Project project){
        ProjectDto.Response response = new ProjectDto.Response(
                project.getProjectId(),
                project.getMember().getMemberId(),
                project.getImageUrl(),
                project.getTitle(),
                project.getSummary(),
                project.getContent(),
                project.getCurrentAmount(),
                project.getTargetAmount(),
                project.getExpiredDate()
        );

        return response;
     }

    List<ProjectDto.Response> projectsToProjectResponseDtos(List<Project> projects);
}
