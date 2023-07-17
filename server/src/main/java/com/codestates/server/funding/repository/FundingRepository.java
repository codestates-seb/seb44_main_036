package com.codestates.server.funding.repository;

import com.codestates.server.funding.entity.Funding;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FundingRepository extends JpaRepository<Funding,Long> {

}
