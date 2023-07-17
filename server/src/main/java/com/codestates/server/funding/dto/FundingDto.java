package com.codestates.server.funding.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

public class FundingDto {
    @AllArgsConstructor
    @Getter
    public static class Post{
        @Positive
        private long projectId;
        @Positive
        private long memberId;
        @NotBlank
        private String address;
        @Positive
        private int quantity;
    }

    @Setter
    @Getter
    public static class Response{
        private long memberId;
        private long projectId;
        private int quantity;
        private String address;
    }
}
