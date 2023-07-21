package com.codestates.server.funding.controller;

import com.codestates.server.funding.dto.FundingDto;
import com.codestates.server.funding.entity.Funding;
import com.codestates.server.funding.mapper.FundingMapper;
import com.codestates.server.funding.service.FundingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/fundings")
@RequiredArgsConstructor
public class FundingController {
    private final FundingMapper mapper;
    private final FundingService fundingService;

    @PostMapping
    public ResponseEntity postFunding(@Valid @RequestBody FundingDto.Post requestBody){
        Funding funding = mapper.fundingPostDtoToFunding(requestBody);
        System.out.println(funding);
        Funding createdFunding = fundingService.createFunding(funding);

        return new ResponseEntity(mapper.fundingToFundingResponseDto(createdFunding), HttpStatus.CREATED);
    }

    @GetMapping("/{funding-id}")
    public ResponseEntity getFunding(@PathVariable("funding-id") long fundingId){
        Funding findFunding = fundingService.findFunding(fundingId);

        return new ResponseEntity(mapper.fundingToFundingResponseDto(findFunding),HttpStatus.OK);
    }
}
