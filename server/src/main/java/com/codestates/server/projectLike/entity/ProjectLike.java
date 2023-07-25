package com.codestates.server.projectLike.entity;

import com.codestates.server.member.entity.Member;
import com.codestates.server.project.entity.Project;
import lombok.*;


import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Setter
public class ProjectLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long projectLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PROJECT_ID")
    private Project project;
}
