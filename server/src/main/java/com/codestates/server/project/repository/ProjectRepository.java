package com.codestates.server.project.repository;//package com.codestates.server.project.repository;

import com.codestates.server.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project,Long> {
}
