package com.example.task1.service;

import com.example.task1.dto.NominationRequest;
import com.example.task1.dto.NominationResponse;
import com.example.task1.entity.Department;
import com.example.task1.entity.Nomination;
import com.example.task1.entity.Officer;
import com.example.task1.entity.TrainingProgram;
import com.example.task1.repository.DepartmentRepository;
import com.example.task1.repository.NominationRepository;
import com.example.task1.repository.OfficerRepository;
import com.example.task1.repository.TrainingProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NominationService {

    private final NominationRepository nominationRepository;
    private final OfficerRepository officerRepository;
    private final TrainingProgramRepository programRepository;
    private final DepartmentRepository departmentRepository;

    public NominationResponse createNomination(NominationRequest request) {

        // 1. Check officer
        Officer officer = officerRepository.findById(request.getOfficerId())
                .orElseThrow(() ->
                        new RuntimeException("Officer not found"));

        // 2. Check programme
        TrainingProgram program = programRepository.findById(request.getProgramId())
                .orElseThrow(() ->
                        new RuntimeException("Training programme not found"));

        // 3. Check department
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() ->
                        new RuntimeException("Department not found"));

        // 4. Check duplicate
        boolean exists = nominationRepository
                .existsByProgramIdAndOfficerId(
                        request.getProgramId(),
                        request.getOfficerId()
                );

        if (exists) {
            throw new RuntimeException(
                    officer.getName()
                            + " is already nominated for this training programme"
            );
        }

        // 5. Create nomination
        Nomination nomination = new Nomination();

        nomination.setRegistrationNumber(
                generateRegistrationNumber()
        );

        nomination.setOfficer(officer);
        nomination.setProgram(program);
        nomination.setDepartment(department);
        nomination.setStatus("NOMINATED");
        nomination.setNominatedAt(LocalDateTime.now());

        Nomination saved = nominationRepository.save(nomination);

        // 6. Return response
        return new NominationResponse(
                saved.getRegistrationNumber(),
                officer.getName(),
                officer.getServiceNumber(),
                program.getTitle(),
                department.getName(),
                saved.getStatus()
        );
    }

    private String generateRegistrationNumber() {

        long count = nominationRepository.count() + 1;

        return String.format(
                "REG-2026-%05d",
                count
        );
    }
}