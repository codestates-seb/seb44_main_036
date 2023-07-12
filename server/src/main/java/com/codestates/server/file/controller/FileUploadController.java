package com.codestates.server.file.controller;

import com.codestates.server.file.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class FileUploadController {

    private final S3UploadService s3UploadService;

    @PostMapping("/upload")
    public ResponseEntity uploadFile(@RequestParam("image")MultipartFile multipartFile) throws IOException{
        String imageUrl = s3UploadService.upload(multipartFile);

        return new ResponseEntity(imageUrl, HttpStatus.CREATED);
    }
}
