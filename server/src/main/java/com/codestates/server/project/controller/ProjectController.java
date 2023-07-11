package com.codestates.server.project.controller;


import com.codestates.server.project.dto.ProjectDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    public ResponseEntity postProject(@RequestBody ProjectDto.Post requestBody){

       return new ResponseEntity(HttpStatus.CREATED);
    }

}
