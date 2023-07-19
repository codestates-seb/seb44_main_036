package com.codestates.server.projectLike.controller;

import com.codestates.server.projectLike.dto.ProjectLikeDto;
import com.codestates.server.projectLike.service.ProjectLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/projects/like")
@RequiredArgsConstructor
public class ProjectLikeController {

    private final ProjectLikeService projectLikeService;

    @PostMapping
    public ResponseEntity addProjectLike(@RequestBody ProjectLikeDto projectLikeDto){
            projectLikeService.addLikeProject(projectLikeDto);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping
    public ResponseEntity cancelProjectLike(@RequestBody ProjectLikeDto projectLikeDto){
        projectLikeService.cancelLikeProject(projectLikeDto);

        return ResponseEntity.ok(null);
    }
}
