package com.example.task1.controller;

import com.example.task1.dto.TrainingProgramRequest;
import com.example.task1.entity.TrainingProgram;
import com.example.task1.repository.TrainingProgramRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TrainingProgramController {

    private final TrainingProgramRepository programRepository;

    // GET ALL PROGRAMS
    @GetMapping
    public List<TrainingProgram> getAllPrograms() {

        return programRepository.findAll();
    }

    // CREATE PROGRAM
    @PostMapping
    public ResponseEntity<TrainingProgram> createProgram(
            @Valid @RequestBody TrainingProgramRequest request) {

        TrainingProgram program = new TrainingProgram();
        program.setTitle(request.getTitle());
        program.setTrainingDate(request.getTrainingDate());
        program.setVenue(request.getVenue());
        program.setMaximumParticipants(request.getMaximumParticipants());

        TrainingProgram saved = programRepository.save(program);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }
}