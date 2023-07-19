package com.codestates.server.project.dto;//package com.codestates.server.project.dto;

import com.codestates.server.validator.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class ProjectDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @Positive
        private long memberId;
        @NotBlank
        private String title;
        @NotBlank
        private String content;

        @NotBlank
        private String summary;

        @Positive
        private Integer targetAmount;
        @Positive
        private int endDay; //일 단위

        @NotBlank
        private String imageUrl;

        @Positive
        private int price;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long projectId;

        @NotSpace(message = "회원 이름은 공백이 아니어야 합니다")
        private String name;
        @NotSpace(message = "주소는 공백이 아니여야 합니다")
        private String address;
        public void setMemberId(long projectId) {
            this.projectId = projectId;
        }
    }
    @Setter
    @Getter
    public static class Response {

        private long projectId;
        private long memberId;
        private String imageUrl;
        private String title;
        private String summary;
        private String content;
        private int price;
        private int currentAmount;
        private Integer targetAmount;
        private LocalDateTime expiredDate;

    }
}
