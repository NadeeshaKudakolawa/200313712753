package com.example.task1.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TrainingProgramRequest {

    @NotBlank
    private String title;

    @NotNull
    private LocalDate trainingDate;

    @NotBlank
    private String venue;

    @NotNull
    @Min(1)
    private Integer maximumParticipants;
}