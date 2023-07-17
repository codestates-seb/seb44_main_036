package com.codestates.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SignupPostDto {
    @NotBlank(message = "이름은 공백이 아니어야 합니다.")
    private String nickname;
    @NotBlank(message = "이메일은 공백이 아니어야 합니다.")
    @Email(message = "이메일형식이 아닙니다.")
    private String email;
    @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
    private String password;
}
