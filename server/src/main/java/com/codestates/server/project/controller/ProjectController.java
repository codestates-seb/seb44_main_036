package com.codestates.server.project.controller;//package com.codestates.server.project.controller;


import com.codestates.server.project.dto.ProjectDto;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.mapper.ProjectMapper;
import com.codestates.server.project.repository.ProjectRepository;
import com.codestates.server.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/projects")
@Validated
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectMapper mapper;
    private final ProjectService projectService;

    private final ProjectRepository projectRepository;



    @PostMapping
    public ResponseEntity postProject(@RequestBody ProjectDto.Post requestBody){
        Project project = mapper.projectPostDtoToProject(requestBody);
        Project createdProject = projectService.createProject(project);

       return new ResponseEntity(mapper.projectToProjectResponseDto(createdProject),HttpStatus.CREATED);
    }

    @PatchMapping("/{project-id}")
    public ResponseEntity patchProject(
            @PathVariable("project-id") @Positive long projectId,@Valid @RequestBody ProjectDto.Patch requestBody) {
        requestBody.setProjectId(projectId);


        return new ResponseEntity(mapper.projectToProjectResponseDto(projectService.updateProject(mapper.projectPatchDtoToProject(requestBody))),HttpStatus.OK);

    }

    @GetMapping("/{project-id}")
    public ResponseEntity getProject(@PathVariable("project-id") long projectId){
        Project findProject = projectService.findProject(projectId);

        return new ResponseEntity(mapper.projectToProjectResponseDto(findProject),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getProjects(){
        List<Project> projects = projectService.findProjects();

        return new ResponseEntity(mapper.projectsToProjectResponseDtos(projects),HttpStatus.OK);
    }

    @GetMapping("/category/{category-id}")
    public ResponseEntity getProjectByCategoryType(@PathVariable("category-id")long categoryId){
        return new ResponseEntity(projectService.findByCategoryType(categoryId),HttpStatus.OK);
    }

    @GetMapping("/like/{member-id}/{liked}")
    public ResponseEntity findByMyProjectLiked(@PathVariable("member-id") long memberId,@PathVariable("liked") Integer likedProject){
        return new ResponseEntity(projectService.findByLikedProject(memberId,likedProject),HttpStatus.OK);
    }

    @DeleteMapping("/{project-id}")
    public ResponseEntity deleteMember(@PathVariable("project-id") @Positive long projectId) {
        projectService.deleteProject(projectId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
