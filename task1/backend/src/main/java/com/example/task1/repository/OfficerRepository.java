package com.example.task1.repository;

import com.example.task1.entity.Officer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficerRepository
        extends JpaRepository<Officer, Long> {

    // Check if a service number already exists
    boolean existsByServiceNumber(String serviceNumber);
}