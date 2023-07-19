package com.codestates.server.funding.entity;

import com.codestates.server.audit.Auditable;
import com.codestates.server.member.entity.Member;
import com.codestates.server.project.entity.Project;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Funding extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long fundingId;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private int quantity;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    private Project project;


}
