package com.codestates.server.projectLike.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProjectLikeDto {
        private Long memberId;
        private Long projectId;

        public ProjectLikeDto(Long memberId,Long projectId){
                this.projectId = projectId;
                this.memberId = memberId;
        }
}
