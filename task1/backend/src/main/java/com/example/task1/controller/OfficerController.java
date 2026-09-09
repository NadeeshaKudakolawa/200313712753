package com.example.task1.controller;

import com.example.task1.dto.OfficerRequest;
import com.example.task1.entity.Department;
import com.example.task1.entity.Officer;
import com.example.task1.repository.DepartmentRepository;
import com.example.task1.repository.OfficerRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/officers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OfficerController {

    private final OfficerRepository officerRepository;
    private final DepartmentRepository departmentRepository;

    // GET /api/officers
    @GetMapping
    public ResponseEntity<List<Officer>> getAllOfficers() {

        return ResponseEntity.ok(
                officerRepository.findAll()
        );
    }

    // POST /api/officers
    @PostMapping
    public ResponseEntity<Officer> createOfficer(
            @Valid @RequestBody OfficerRequest request) {

        Department department =
                departmentRepository.findById(
                        request.getDepartmentId()
                ).orElseThrow(() ->
                        new RuntimeException(
                                "Department not found"
                        )
                );

        Officer officer = new Officer();

        officer.setServiceNumber(
                request.getServiceNumber()
        );

        officer.setName(
                request.getName()
        );

        officer.setEmail(
                request.getEmail()
        );

        officer.setDepartment(department);

        Officer saved =
                officerRepository.save(officer);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }
}