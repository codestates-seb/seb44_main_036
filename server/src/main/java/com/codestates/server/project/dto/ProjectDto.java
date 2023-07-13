package com.codestates.server.project.dto;

import com.codestates.server.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class ProjectDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        private String title;
        private String content;

        private int targetAmount;

        private MultipartFile multipartFile;

        private int expired_at; //주 단위
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long memberId;

        @NotSpace(message = "회원 이름은 공백이 아니어야 합니다")
        private String name;
        @NotSpace(message = "주소는 공백이 아니여야 합니다")
        private String address;
        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long memberId;
        private String email;
        private String n;



    }
}
