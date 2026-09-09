package com.example.task1.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "officers")
@Getter
@Setter
public class Officer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String serviceNumber;

    @Column(nullable = false)
    private String name;

    private String email;

    @Column(nullable = false)
    private String grade;

    @Column(nullable = false)
    private LocalDate dateOfJoining;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
}