package com.codestates.server.project.controller;//package com.codestates.server.project.controller;


import com.codestates.server.project.dto.ProjectDto;
import com.codestates.server.project.entity.Project;
import com.codestates.server.project.mapper.ProjectMapper;
import com.codestates.server.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/projects")
@Validated
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectMapper mapper;
    private final ProjectService projectService;



    @PostMapping
    public ResponseEntity postProject(@RequestBody ProjectDto.Post requestBody){

       return new ResponseEntity(mapper.projectToProjectResponseDto(projectService.createProject(mapper.projectPostDtoToProject(requestBody))),HttpStatus.CREATED);
    }

    @PatchMapping("/{project-id}")
    public ResponseEntity patchProject(
            @PathVariable("project-id") @Positive long projectId,@Valid @RequestBody ProjectDto.Patch requestBody) {
        requestBody.setProjectId(projectId);


        return new ResponseEntity(mapper.projectToProjectResponseDto(projectService.updateProject(mapper.projectPatchDtoToProject(requestBody))),HttpStatus.OK);

    }

//    @GetMapping("/{project-id}")
//    public ResponseEntity getProject(@PathVariable("project-id") long projectId){
//        projectService.updateView(projectId);
//
//        return new ResponseEntity(projectService.findProject(projectId),HttpStatus.OK);
//    }

    @GetMapping("/{project-id}")
    public ResponseEntity getProject(@PathVariable("project-id") long projectId,HttpServletRequest request) {
        projectService.updateView(projectId);

        return new ResponseEntity(projectService.findProject(projectId,request),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getProjects(HttpServletRequest request){


        return new ResponseEntity(projectService.findProjects(request),HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity getProjects(){
//        return new ResponseEntity(projectService.findProjects(),HttpStatus.OK);
//    }

//    @GetMapping("/category/{category-id}")
//    public ResponseEntity getProjectByCategoryType(@PathVariable("category-id")long categoryId){
//        return new ResponseEntity(projectService.findByCategoryType(categoryId),HttpStatus.OK);
//    }

    @GetMapping("/category/{category-id}")
    public ResponseEntity getProjectByCategoryType(@PathVariable("category-id")long categoryId,HttpServletRequest request){
        return new ResponseEntity(projectService.findByCategoryType(categoryId,request),HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity searchProject(@RequestParam("q") String keyword){
        return new ResponseEntity(projectService.searchByKeyword(keyword),HttpStatus.OK);
    }

    @GetMapping("/bin")
    public ResponseEntity getRecycleBin(HttpServletRequest request){


        return new ResponseEntity(projectService.findRecycleBinProject(request),HttpStatus.OK);
    }

    @PostMapping("/restoration/{project-id}")
    public ResponseEntity restorationProject(@PathVariable("project-id") long projectId){
        projectService.restorationProject(projectId);
        return new ResponseEntity(HttpStatus.OK);
    }


    @DeleteMapping("/{project-id}")
    public ResponseEntity deleteProject(@PathVariable("project-id") @Positive long projectId) {
        projectService.deleteProject(projectId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
