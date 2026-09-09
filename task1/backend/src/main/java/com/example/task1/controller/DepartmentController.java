package com.example.task1.controller;

import com.example.task1.entity.Department;
import com.example.task1.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DepartmentController {

    private final DepartmentRepository departmentRepository;

    // GET ALL DEPARTMENTS
    @GetMapping
    public List<Department> getAllDepartments() {

        return departmentRepository.findAll();
    }
}
