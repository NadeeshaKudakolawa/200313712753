package com.example.task1.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NominationRequest {

    @NotNull
    private Long programId;

    @NotNull
    private Long officerId;

    @NotNull
    private Long departmentId;
}