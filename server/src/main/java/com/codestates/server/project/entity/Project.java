package com.codestates.server.project.entity;//package com.codestates.server.project.entity;

import com.codestates.server.audit.Auditable;
import com.codestates.server.category.entity.Category;
import com.codestates.server.funding.entity.Funding;
import com.codestates.server.member.entity.Member;
import com.codestates.server.projectLike.entity.ProjectLike;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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
    @Column(nullable = false,updatable = false)
    private Integer targetAmount;
    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL)
    private List<ProjectLike> projectLikes = new ArrayList<>();

    @Column(nullable = false)
    private int likeCount = this.projectLikes.size();

    @Column(nullable = false)
    private Integer likedProject = 0;
    @Column(name = "EXPIRED_DATE",updatable = false)
    private LocalDateTime expiredDate;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "project")
    private List<Funding> fundings = new ArrayList<>();
    @OneToOne
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;

    public void setMember(Member member) {
        this.member = member;
    }

    public void addProjectLike(ProjectLike projectLike){
        this.projectLikes.add(projectLike);
        this.likeCount = this.projectLikes.size();
    }

    public void removeProjectLike(ProjectLike projectLike){
        this.projectLikes.remove(projectLike);
        this.likeCount = this.projectLikes.size();
    }

}
