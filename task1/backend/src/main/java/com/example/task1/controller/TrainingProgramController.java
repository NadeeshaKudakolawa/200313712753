package com.example.task1.controller;

import com.example.task1.entity.TrainingProgram;
import com.example.task1.repository.TrainingProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TrainingProgramController {

    private final TrainingProgramRepository programRepository;

    @GetMapping
    public List<TrainingProgram> getAllPrograms() {
        return programRepository.findAll();
    }
}