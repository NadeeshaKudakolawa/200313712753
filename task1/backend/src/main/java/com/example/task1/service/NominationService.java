package com.example.task1.service;

import com.example.task1.dto.NominationRequest;
import com.example.task1.dto.NominationResponse;
import com.example.task1.entity.Department;
import com.example.task1.entity.Nomination;
import com.example.task1.entity.Officer;
import com.example.task1.entity.TrainingProgram;
import com.example.task1.exception.DuplicateNominationException;
import com.example.task1.repository.DepartmentRepository;
import com.example.task1.repository.NominationRepository;
import com.example.task1.repository.OfficerRepository;
import com.example.task1.repository.TrainingProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NominationService {

        private final NominationRepository nominationRepository;
        private final OfficerRepository officerRepository;
        private final TrainingProgramRepository programRepository;
        private final DepartmentRepository departmentRepository;

        // CREATE NOMINATION
        @Transactional
        public NominationResponse createNomination(
                NominationRequest request) {

                Officer officer =
                        officerRepository.findById(
                                request.getOfficerId()
                        ).orElseThrow(() ->
                                new RuntimeException(
                                        "Officer not found"
                                )
                        );

                TrainingProgram program =
                        programRepository.findById(
                                request.getProgramId()
                        ).orElseThrow(() ->
                                new RuntimeException(
                                        "Training programme not found"
                                )
                        );

                Department department =
                        departmentRepository.findById(
                                request.getDepartmentId()
                        ).orElseThrow(() ->
                                new RuntimeException(
                                        "Department not found"
                                )
                        );

                // DUPLICATE CHECK
                boolean exists =
                        nominationRepository
                                .existsByProgramIdAndOfficerId(
                                        request.getProgramId(),
                                        request.getOfficerId()
                                );

                if (exists) {

                        throw new DuplicateNominationException(
                                officer.getName()
                                        + " is already nominated for this training programme"
                        );
                }

                // COUNT CONFIRMED PARTICIPANTS
                long confirmedCount =
                        nominationRepository
                                .countByProgramIdAndStatus(
                                        program.getId(),
                                        "CONFIRMED"
                                );

                String status;

                // CAPACITY CHECK
                if (confirmedCount <
                        program.getMaximumParticipants()) {

                        status = "CONFIRMED";

                } else {

                        status = "WAITING";
                }

                // CREATE NOMINATION
                Nomination nomination =
                        new Nomination();

                nomination.setRegistrationNumber(
                        generateRegistrationNumber()
                );

                nomination.setProgram(program);

                nomination.setOfficer(officer);

                nomination.setDepartment(department);

                nomination.setStatus(status);

                nomination.setNominatedAt(
                        LocalDateTime.now()
                );

                Nomination saved =
                        nominationRepository.save(
                                nomination
                        );

                return convertToResponse(saved);
        }

        // GET ALL NOMINATIONS
        public List<NominationResponse> getAllNominations() {

                return nominationRepository
                        .findAll()
                        .stream()
                        .sorted(
                                (a, b) -> {

                                        if (a.getNominatedAt()
                                                .equals(b.getNominatedAt())) {

                                                return a.getId()
                                                        .compareTo(b.getId());
                                        }

                                        return a.getNominatedAt()
                                                .compareTo(
                                                        b.getNominatedAt()
                                                );
                                }
                        )
                        .map(this::convertToResponse)
                        .toList();
        }

        // CANCEL NOMINATION
        @Transactional
        public NominationResponse cancelNomination(
                Long nominationId) {

                Nomination nomination =
                        nominationRepository
                                .findById(nominationId)
                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Nomination not found"
                                        )
                                );

                if ("CANCELLED".equals(
                        nomination.getStatus())) {

                        throw new RuntimeException(
                                "Nomination is already cancelled"
                        );
                }

                TrainingProgram program =
                        nomination.getProgram();

                boolean wasConfirmed =
                        "CONFIRMED".equals(
                                nomination.getStatus()
                        );

                nomination.setStatus(
                        "CANCELLED"
                );

                Nomination cancelled =
                        nominationRepository.save(
                                nomination
                        );

                // PROMOTE FIRST WAITING PERSON
                if (wasConfirmed) {

                        promoteNextWaitingPerson(
                                program
                        );
                }

                return convertToResponse(
                        cancelled
                );
        }

        // FIFO WAITING LIST
        private void promoteNextWaitingPerson(
                TrainingProgram program) {

                List<Nomination> waitingList =
                        nominationRepository
                                .findByProgramIdAndStatusOrderByNominatedAtAscIdAsc(
                                        program.getId(),
                                        "WAITING"
                                );

                if (!waitingList.isEmpty()) {

                        Nomination nextPerson =
                                waitingList.get(0);

                        nextPerson.setStatus(
                                "CONFIRMED"
                        );

                        nominationRepository.save(
                                nextPerson
                        );
                }
        }

        // ENTITY -> DTO
        private NominationResponse convertToResponse(
                Nomination nomination) {

                return new NominationResponse(
                        nomination.getId(),
                        nomination.getRegistrationNumber(),
                        nomination.getOfficer().getName(),
                        nomination.getOfficer().getServiceNumber(),
                        nomination.getProgram().getTitle(),
                        nomination.getDepartment().getName(),
                        nomination.getStatus(),
                        nomination.getNominatedAt()
                );
        }

        // REGISTRATION NUMBER
        private String generateRegistrationNumber() {

                long count =
                        nominationRepository.count() + 1;

                return String.format(
                        "REG-2026-%05d",
                        count
                );
        }
}