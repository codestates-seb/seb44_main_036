package com.codestates.server.project.repository;//package com.codestates.server.project.repository;

import com.codestates.server.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    @Query(value = "SELECT p FROM Project p WHERE p.member.memberId =:memberId")
    List<Project> findByMemberId(long memberId);
}
