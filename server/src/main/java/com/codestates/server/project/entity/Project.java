package com.codestates.server.project.entity;//package com.codestates.server.project.entity;

import com.codestates.server.audit.Auditable;
import com.codestates.server.category.entity.Category;
import com.codestates.server.funding.entity.Funding;
import com.codestates.server.member.entity.Member;
import com.codestates.server.projectLike.entity.ProjectLike;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @Column(nullable = false,length = 50)
    private String title;
    @Column(nullable = false,length = 100)
    private String summary;
    @Column(nullable = false,length = 10000)
    private String content;
    @Column(nullable = false)
    private String imageUrl;
    @Column(nullable = false)
    private Integer price;
    @Column(nullable = false)
    private Integer endDay;
    @Column(nullable = false)
    private Integer currentAmount = 0;
    @Column(nullable = false)
    private Integer targetAmount;
    @Column(columnDefinition = "integer default 0",nullable = false)
    private int view;
    @Column(nullable = false)
    private Integer likeCount = 0;

    @Column(name = "EXPIRED_DATE")
    private LocalDateTime expiredDate;

    @ElementCollection
    private List<String> tags;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "project")
    private List<Funding> fundings = new ArrayList<>();
    @OneToOne
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;


    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL)
    private List<ProjectLike> projectLikes = new ArrayList<>();

    @Column
    private Integer likedProject = 0;

    @Column
    private String location;
    @Column
    private String x;
    @Column
    private String y;
    @Column(name = "DELETED_DATE")
    private LocalDateTime deletedAt;

//    @Column
//    private boolean isFinished = false;

    public void addProjectLike(ProjectLike projectLike){
        this.projectLikes.add(projectLike);
        this.likeCount = this.projectLikes.size();
    }

    public void removeProjectLike(ProjectLike projectLike){
        this.projectLikes.remove(projectLike);
        this.likeCount = this.projectLikes.size();
    }

    public void setMember(Member member) {
        this.member = member;
    }


}
