package com.example.task1.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EligibilityRuleRequest {

    @NotNull
    private Long programId;

    @NotBlank
    private String ruleType;

    @NotBlank
    private String ruleValue;
}