package com.codestates.server.member.entity;

import com.codestates.server.audit.Auditable;
import com.codestates.server.funding.entity.Funding;
import com.codestates.server.project.entity.Project;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(length = 100, nullable = false)
    private String nickname;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;
    @Column(length = 100)
    private String password;
    @Column
    private String address;

    @Column(nullable = false)
    private Integer cash;

    @Column
    private String imageUrl;


    @OneToMany(mappedBy = "member")
    private List<Project> projects = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Funding> fundings = new ArrayList<>();


    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public Member(String email,String nickname,String imageUrl){
        this.nickname = nickname;
        this.email = email;
        this.imageUrl = imageUrl;

    }


}
