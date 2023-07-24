package com.codestates.server.projectLike.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@NoArgsConstructor
public class ProjectLikeDto {
        @Positive
        private long memberId;

        @Positive
        private long projectId;

        public ProjectLikeDto(long memberId,long projectId){
                this.projectId = projectId;
                this.memberId = memberId;
        }
}
