package com.codestates.server.project.entity;//package com.codestates.server.project.entity;

import com.codestates.server.audit.Auditable;
import com.codestates.server.funding.entity.Funding;
import com.codestates.server.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Project extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long projectId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String summary;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private String imageUrl;
    @Column(nullable = false)
    private Integer price;
    @Column(nullable = false)
    private Integer endDay;
    @Column(nullable = true)
    private Integer currentAmount;
    @Column(nullable = false,updatable = false)
    private Integer targetAmount;
    @Column(name = "EXPIRED_DATE",updatable = false)
    private LocalDateTime expiredDate;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @JsonManagedReference
    @OneToMany(mappedBy = "project")
    private List<Funding> fundings = new ArrayList<>();

    public void setMember(Member member) {
        this.member = member;
    }

}
