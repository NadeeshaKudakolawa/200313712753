package com.example.task1.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class NominationResponse {

    private Long id;

    private String registrationNumber;

    private String officerName;

    private String serviceNumber;

    private String programTitle;

    private String departmentName;

    private String status;

    private LocalDateTime nominatedAt;
}