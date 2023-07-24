package com.codestates.server.member.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.*;

public class MemberDto {

    @AllArgsConstructor
    @Getter
    public static class Post {
        @Pattern(regexp = "^[가-힣a-zA-Z0-9]+$",message = "닉네임은 한글, 영문만 사용가능 합니다.")
        @NotBlank(message = "닉네임은 공백이 아니어야 합니다.")
        @Size(min = 2,max = 10,message = "닉네임은 2자리 이상 10자리 이하여야 합니다.")
        private String nickname;
        @NotBlank(message = "이메일은 공백이 아니어야 합니다.")
        @Email(message = "이메일형식이 아닙니다.")
        private String email;
        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        @Size(min = 8,max = 15,message = "비밀번호는 8자리 이상 15자리 이하여야 합니다.")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,15}$",message = "하나 이상의 문자, 숫자, 특수문자를 포함해야 합니다.")
        private String password;
    }

    @AllArgsConstructor
    @Getter
    public static class Patch {

        private long memberId;
        @Pattern(regexp = "^[가-힣a-zA-Z0-9]+$",message = "닉네임은 한글, 영문만 사용가능 합니다.")
        @Size(min = 2,max = 10,message = "닉네임은 2자리 이상 10자리 이하여야 합니다.")
        private String nickname;
        private String address;

        private String imageUrl;

        public void setMemberId(long memberId) {
            this.memberId= memberId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long memberId;
        private String nickname;
        private String email;
        private String address;
        private Integer cash;

        private String imageUrl;
    }
}
