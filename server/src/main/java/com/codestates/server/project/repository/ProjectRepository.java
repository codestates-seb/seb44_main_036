package com.codestates.server.project.repository;

import com.codestates.server.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


public interface ProjectRepository extends JpaRepository<Project,Long> {
    @Query(value = "SELECT p FROM Project p WHERE p.member.memberId =:memberId")
    List<Project> findByMemberId(long memberId);

    @Query(value = "SELECT p FROM Project p WHERE p.category.categoryId =:categoryId")
    List<Project> findByCategoryType(long categoryId);

    @Query(value = "SELECT p FROM Project p WHERE p.member.memberId =:memberId AND p.likedProject =:liked")
    List<Project> findByLikedProject(long memberId,Integer liked);
    @Modifying
    @Query("UPDATE Project set view = view + 1 WHERE projectId =:projectId")
    int updateView(long projectId);


}
