package com.codestates.server.projectLike.repository;

import com.codestates.server.member.entity.Member;
import com.codestates.server.project.entity.Project;
import com.codestates.server.projectLike.entity.ProjectLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProjectLikeRepository extends JpaRepository<ProjectLike,Long> {
    Optional<ProjectLike> findByMemberAndProject(Member member, Project project);
    @Query(value = "SELECT pl FROM ProjectLike pl WHERE pl.member.memberId =:memberId")
    List<ProjectLike> findByMemberId(long memberId);

    @Query(value = "SELECT pl FROM ProjectLike pl WHERE pl.project.projectId =:projectId")
    List<ProjectLike> findByProjectId(long projectId);

    @Query(value = "SELECT pl FROM ProjectLike pl WHERE pl.project.projectId =:projectId AND pl.member.memberId =:memberId")
    Optional<ProjectLike> findByMemberIdAndProjectId(long projectId,long memberId);
}
