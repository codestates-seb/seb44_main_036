package com.codestates.server.project.dto;



//import com.codestates.server.project.entity.Location;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

public class ProjectDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @Positive
        private long memberId;
        @NotBlank(message = "제목은 공백이 아니어야 합니다.")
        @Size(min = 2,max = 50,message = "제목은 2자~50자 내외로 써주세요")
        private String title;
        @NotBlank(message = "내용은 공백이 아니어야 합니다.")
        @Size(min = 2,max = 10000,message = "내용은 2자~10000자 내외로 써주세요")
        private String content;

        @NotBlank(message = "요약은 공백이 아니어야 합니다.")
        @Size(max = 100,message = "요약은 100자 내외로 써주세요")
        private String summary;

        @Positive
        @Min(50000)
        @Max(10000000)
        @NotBlank(message = "목표금액은 공백이 아니어야 합니다.")
        private Integer targetAmount;
        @Positive
        @NotBlank(message = "마감일자는 공백이 아니어야 합니다.")
        private int endDay; //일 단위

        @NotBlank(message = "이미지 url는 공백이 아니어야 합니다.")
        private String imageUrl;

        @NotBlank(message = "가격은 공백이 아니어야 합니다.")
        private Integer price;

        @NotBlank(message = "카테고리는 공백이 아니어야 합니다.")
        private long categoryId;

        private String location;

        private List<String> tags;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

        private long projectId;


        @Size(min = 2,max = 30,message = "제목은 2자~50자 내외로 써주세요")
        private String title;

        @Size(min = 2,max = 10000,message = "내용은 2자~10000자 내외로 써주세요")
        private String content;


        @Size(max = 100,message = "요약은 100자 내외로 써주세요")
        private String summary;

        @Min(50000)
        @Max(10000000)
        private Integer targetAmount;

        private int endDay; //일 단위

        private String imageUrl;

        private Integer price;

        private String location;

        private List<String> tags;

        public void setProjectId(long projectId) {
            this.projectId = projectId;
        }
    }
    @Setter
    @Getter
    public static class Response {

        private long projectId;
        private long memberId;
        private LocalDateTime createdAt;
        private int likeCount;
        private String imageUrl;
        private String title;
        private String summary;
        private String content;
        private Integer price;
        private Integer currentAmount;
        private Integer targetAmount;
        private LocalDateTime expiredDate;
        private long categoryId;
        private Integer likedProject;
        private int view;
        private String location;
        private List<String> tags;
    }
}
