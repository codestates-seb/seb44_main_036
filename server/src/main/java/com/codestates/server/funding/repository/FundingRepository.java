package com.codestates.server.funding.repository;

import com.codestates.server.funding.entity.Funding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FundingRepository extends JpaRepository<Funding,Long> {
        @Query(value = "SELECT f FROM Funding f WHERE f.member.memberId =:memberId")
        List<Funding> findByMemberId(long memberId);
}
