package com.codestates.server.member.entity;

import com.codestates.server.audit.Auditable;
import com.codestates.server.funding.entity.Funding;
import com.codestates.server.project.entity.Project;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @JsonManagedReference
    @OneToMany(mappedBy = "member")
    private List<Project> projects = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "member")
    private List<Funding> fundings = new ArrayList<>();


    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public Member(String nickname,String email ){
        this.nickname = nickname;
        this.email = email;

    }
    public Member(String email) {

        this.email = email;
    }



    public enum MemberRole {
        ROLE_USER,
        ROLE_ADMIN
    }
//    public enum MemberStatus {
//        MEMBER_ACTIVE("활동중"),
//        MEMBER_SLEEP("휴면 상태"),
//        MEMBER_QUIT("탈퇴 상태");
//
//        @Getter
//        private String status;
//
//        MemberStatus(String status) {
//            this.status = status;
//        }
//    }
}
