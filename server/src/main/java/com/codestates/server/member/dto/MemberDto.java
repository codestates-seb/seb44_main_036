package com.codestates.server.member.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "이메일은 필수 입력값입니다.")
        @Email
        private String email;

        @NotBlank(message = "닉네임은 필수 입력값입니다.")
        private String nickname;
        private String address;
        @NotBlank(message = "비밀번호는 필수 입력값입니다.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}",
                message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long memberId;

        @NotBlank(message = "닉네임은 필수 입력값입니다.")
        private String nickname;
        private String address;

        //private Member.MemberStatus memberStatus;


        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class Response {
        private long memberId;
        private String email;
        private String nickname;
        private String address;
        //private Member.MemberStatus memberStatus;



        //public String getMemberStatus() {
            //return memberStatus.getStatus();
        }

    }

