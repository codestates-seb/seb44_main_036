package com.codestates.server.project.controller;//package com.codestates.server.project.controller;


import com.codestates.server.project.dto.ProjectDto;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.mapper.ProjectMapper;
import com.codestates.server.project.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectMapper mapper;
    private final ProjectService projectService;

    public ProjectController(ProjectMapper mapper,ProjectService projectService){
        this.mapper = mapper;
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity postProject(@RequestBody ProjectDto.Post requestBody){
        Project project = mapper.projectPostDtoToProject(requestBody);
        Project createdProject = projectService.createProject(project);

       return new ResponseEntity(mapper.projectToProjectResponseDto(createdProject),HttpStatus.CREATED);
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
        return new ResponseEntity(mapper.projectsToProjectResponseDtos(projectService.findByCategoryType(categoryId)),HttpStatus.OK);
    }

}
