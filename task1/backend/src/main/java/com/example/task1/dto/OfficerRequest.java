package com.example.task1.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OfficerRequest {

    @NotBlank
    private String serviceNumber;

    @NotBlank
    private String name;

    @Email
    private String email;

    @NotNull
    private Long departmentId;
}