package com.codestates.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "member not found"),
    MEMBER_EXIST(409, "member exists"),
    PROJECT_NOT_FOUND(404,"project not found"),
    PROJECT_LIKE_NOT_FOUND(404, "projectLike not found"),
    PROJECT_CANT_MODIFY(409,"project currentAmount exist, can't modify"),
    PROJECT_CANT_DELETE(409,"project currentAmount exist, can't delete"),
    FUNDING_NOT_FOUND(404,"funding not found"),
    MEMBER_CASH_INSUFFICIENT(403,"cash is insufficient");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
