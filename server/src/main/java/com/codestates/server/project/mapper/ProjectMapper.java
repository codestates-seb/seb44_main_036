package com.codestates.server.project.mapper;//package com.codestates.server.project.mapper;

import com.codestates.server.category.entity.Category;
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
        Category category = new Category();
        category.setCategoryId(post.getCategoryId());
        project.setContent(post.getContent());
        project.setSummary(post.getSummary());
        project.setTitle(post.getTitle());
        project.setImageUrl(post.getImageUrl());
        project.setPrice(post.getPrice());
        project.setTargetAmount(post.getTargetAmount());
        project.setEndDay(post.getEndDay());
        project.setLocation(post.getLocation());
        project.setMember(member);
        project.setCategory(category);

        return project;
    }

     Project projectPatchDtoToProject(ProjectDto.Patch patch);

     default ProjectDto.Response projectToProjectResponseDto(Project project){
        ProjectDto.Response response = new ProjectDto.Response();
            response.setProjectId(project.getProjectId());
            response.setMemberId(project.getMember().getMemberId());
            response.setPrice(project.getPrice());
            response.setContent(project.getContent());
            response.setSummary(project.getSummary());
            response.setCurrentAmount(project.getCurrentAmount());
            response.setTitle(project.getTitle());
            response.setExpiredDate(project.getExpiredDate());
            response.setTargetAmount(project.getTargetAmount());
            response.setImageUrl(project.getImageUrl());
            response.setCategoryId(project.getCategory().getCategoryId());
            response.setView(project.getView());
            response.setLocation(project.getLocation());
            response.setCreatedAt(project.getCreatedAt());
            response.setLikeCount(project.getLikeCount());

        return response;
     }

    List<ProjectDto.Response> projectsToProjectResponseDtos(List<Project> projects);
}
