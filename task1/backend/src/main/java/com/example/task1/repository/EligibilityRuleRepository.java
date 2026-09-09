package com.example.task1.repository;

import com.example.task1.entity.EligibilityRule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EligibilityRuleRepository
        extends JpaRepository<EligibilityRule, Long> {

    List<EligibilityRule> findByProgramId(Long programId);

    List<EligibilityRule> findByProgramIdAndRuleType(
            Long programId,
            String ruleType
    );
}