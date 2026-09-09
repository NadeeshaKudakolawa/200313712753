package com.example.task1.controller;

import com.example.task1.entity.Officer;
import com.example.task1.repository.OfficerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/officers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OfficerController {

    private final OfficerRepository officerRepository;

    @GetMapping
    public List<Officer> getAllOfficers() {
        return officerRepository.findAll();
    }
}