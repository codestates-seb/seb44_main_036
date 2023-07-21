package com.codestates.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "member not found"),
    MEMBER_EXIST(409, "member exists"),

    PROJECT_NOT_FOUND(404,"project not found"),

    PROJECT_LIKE_EXIST(409, "projectLike exist"),

    PROJECT_LIKE_NOT_FOUND(404, "projectLike not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
