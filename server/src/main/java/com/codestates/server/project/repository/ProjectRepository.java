package com.codestates.server.project.repository;

import com.codestates.server.funding.entity.Funding;
import com.codestates.server.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


public interface ProjectRepository extends JpaRepository<Project,Long> {

    List<Project> findByTitleContaining(String keyword);
    @Query(value = "SELECT p FROM Project p WHERE p.member.memberId =:memberId")
    List<Project> findByMemberId(long memberId);

    @Query(value = "SELECT p FROM Project p WHERE p.category.categoryId =:categoryId")
    List<Project> findByCategoryType(long categoryId);

    @Query(value = "SELECT p FROM Project p JOIN p.projectLikes l WHERE l.member.memberId =:memberId")
    List<Project> findByLikedProject(long memberId);
    @Query(value = "SELECT p FROM Project p JOIN p.fundings f WHERE f.member.memberId =:memberId")
    List<Project> findByFundingMemberId(long memberId);
    @Modifying
    @Query("UPDATE Project set view = view + 1 WHERE projectId =:projectId")
    void updateView(long projectId);


}
