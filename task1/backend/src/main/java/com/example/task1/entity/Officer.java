package com.example.task1.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}