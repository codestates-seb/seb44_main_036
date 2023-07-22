package com.codestates.server.funding.controller;

import com.codestates.server.funding.dto.FundingDto;
import com.codestates.server.funding.mapper.FundingMapper;
import com.codestates.server.funding.service.FundingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/fundings")
@RequiredArgsConstructor
@Validated
public class FundingController {
    private final FundingMapper mapper;
    private final FundingService fundingService;

    @PostMapping
    public ResponseEntity postFunding(@Valid @RequestBody FundingDto.Post requestBody){
        return new ResponseEntity(mapper.fundingToFundingResponseDto(fundingService.createFunding(mapper.fundingPostDtoToFunding(requestBody))), HttpStatus.CREATED);
    }

    @GetMapping("/{funding-id}")
    public ResponseEntity getFunding(@PathVariable("funding-id") long fundingId){
        return new ResponseEntity(mapper.fundingToFundingResponseDto(fundingService.findFunding(fundingId)),HttpStatus.OK);
    }
    @DeleteMapping("/{funding-id}")
    public ResponseEntity cancelFunding(@PathVariable("funding-id") long fundingId){
            fundingService.cancelFunding(fundingId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
