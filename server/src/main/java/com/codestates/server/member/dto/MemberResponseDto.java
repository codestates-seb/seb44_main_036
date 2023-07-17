package com.codestates.server.member.dto;

import com.codestates.server.funding.entity.Funding;
import com.codestates.server.project.dto.ProjectDto;
import com.codestates.server.project.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberResponseDto {
    private long memberId;
    private String nickname;
    private String email;
    private List<Project> projects;

    private List<Funding> fundings;
}
