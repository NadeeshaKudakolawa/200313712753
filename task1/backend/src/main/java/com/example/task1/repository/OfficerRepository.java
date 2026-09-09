package com.example.task1.repository;

import com.example.task1.entity.Officer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OfficerRepository extends JpaRepository<Officer, Long> {

    Optional<Officer> findByServiceNumber(String serviceNumber);
}