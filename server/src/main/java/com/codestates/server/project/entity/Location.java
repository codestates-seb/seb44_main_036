package com.codestates.server.project.entity;

import lombok.Getter;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;


@Embeddable
@Getter
public class Location{
    private String address;
    private String x;
    private String y;

    @SuppressWarnings("unused")
    Location(){

    }

    public Location(@NotNull String address,@NotNull String x,@NotNull String y){
        this.x = x;
        this.y = y;
        this.address = address;
    }

}
