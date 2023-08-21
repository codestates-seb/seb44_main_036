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
        project.setX(post.getX());
        project.setY(post.getY());
        project.setMember(member);
        project.setCategory(category);
        project.setTags(post.getTags());


        return project;
    }

     default Project projectPatchDtoToProject(ProjectDto.Patch patch){
        Project project = new Project();
        project.setProjectId(patch.getProjectId());
        project.setTitle(patch.getTitle());
        project.setContent(patch.getContent());
        project.setSummary(patch.getSummary());
        project.setPrice(patch.getPrice());
        project.setEndDay(patch.getEndDay());
        project.setTargetAmount(patch.getTargetAmount());
        project.setImageUrl(patch.getImageUrl());
        project.setLocation(patch.getLocation());
        project.setX(patch.getX());
        project.setY(patch.getY());
        project.setTags(patch.getTags());


        return project;
     }

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
            response.setCreatedAt(project.getCreatedAt());
            response.setLikedProject(project.getLikedProject());
            response.setLikeCount(project.getLikeCount());
            response.setLocation(project.getLocation());
            response.setX(project.getX());
            response.setY(project.getY());
            response.setTags(project.getTags());
//            response.setFinished(project.isFinished());

        return response;
     }

    List<ProjectDto.Response> projectsToProjectResponseDtos(List<Project> projects);
}
