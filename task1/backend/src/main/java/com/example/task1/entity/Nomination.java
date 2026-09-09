package com.example.task1.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "nominations",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_program_officer",
                        columnNames = {"program_id", "officer_id"}
                )
        }
)
@Getter
@Setter
public class Nomination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String registrationNumber;

    @ManyToOne
    @JoinColumn(name = "program_id", nullable = false)
    private TrainingProgram program;

    @ManyToOne
    @JoinColumn(name = "officer_id", nullable = false)
    private Officer officer;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime nominatedAt;
}