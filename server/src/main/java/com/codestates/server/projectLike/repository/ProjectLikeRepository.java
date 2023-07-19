package com.codestates.server.projectLike.repository;

import com.codestates.server.member.entity.Member;
import com.codestates.server.project.entity.Project;
import com.codestates.server.projectLike.entity.ProjectLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectLikeRepository extends JpaRepository<ProjectLike,Long> {
    Optional<ProjectLike> findByMemberAndProject(Member member, Project project);

}
