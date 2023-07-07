package com.codestates.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "user not found"),
    USER_EXIST(409, "user exists"),
    QUESTION_NOT_FOUND(404, "question not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
