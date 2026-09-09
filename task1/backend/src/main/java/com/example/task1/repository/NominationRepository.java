package com.example.task1.repository;

import com.example.task1.entity.Nomination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface NominationRepository
        extends JpaRepository<Nomination, Long> {

    boolean existsByProgramIdAndOfficerId(
            Long programId,
            Long officerId
    );

    long countByProgramIdAndStatus(
            Long programId,
            String status
    );

    List<Nomination>
    findByProgramIdAndStatusOrderByNominatedAtAscIdAsc(
            Long programId,
            String status
    );

    boolean existsByOfficerIdAndProgramIdAndStatusAndNominatedAtAfter(
            Long officerId,
            Long programId,
            String status,
            LocalDateTime date
    );
}