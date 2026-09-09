package com.example.task1.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class OfficerRequest {

    @NotBlank
    private String serviceNumber;

    @NotBlank
    private String name;

    @Email
    private String email;

    @NotBlank
    private String grade;

    @NotNull
    private LocalDate dateOfJoining;

    @NotNull
    private Long departmentId;
}