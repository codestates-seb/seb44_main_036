package com.codestates.server.project.dto;//package com.codestates.server.project.dto;

import com.codestates.server.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

public class ProjectDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank
        private long memberId;
        @NotBlank
        private String title;
        @NotBlank
        private String content;

        @NotBlank
        private String summary;

        @NotBlank
        private Integer targetAmount;
        @NotBlank
        private int endDay; //일 단위

        @NotBlank
        private String imageUrl;
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

        private long projectId;
        private long memberId;
        private String imageUrl;
        private String title;
        private String summary;
        private String content;
        private Integer currentAmount;
        private Integer targetAmount;
        private LocalDateTime expiredDate;

    }
}
