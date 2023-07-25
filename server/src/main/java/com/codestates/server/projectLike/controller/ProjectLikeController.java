package com.codestates.server.projectLike.controller;

import com.codestates.server.project.service.ProjectService;
import com.codestates.server.projectLike.dto.ProjectLikeDto;
import com.codestates.server.projectLike.entity.ProjectLike;
import com.codestates.server.projectLike.service.ProjectLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects/like")
@RequiredArgsConstructor
@Validated
public class ProjectLikeController {

    private final ProjectLikeService projectLikeService;
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity addProjectLike(@RequestBody ProjectLikeDto projectLikeDto) {
        projectLikeService.addLikeProject(projectLikeDto);
        return ResponseEntity.ok(null);
    }

}
