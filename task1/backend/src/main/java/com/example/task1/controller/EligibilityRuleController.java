package com.example.task1.controller;

import com.example.task1.dto.EligibilityRuleRequest;
import com.example.task1.entity.EligibilityRule;
import com.example.task1.entity.TrainingProgram;
import com.example.task1.repository.EligibilityRuleRepository;
import com.example.task1.repository.TrainingProgramRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eligibility-rules")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EligibilityRuleController {

    private final EligibilityRuleRepository ruleRepository;
    private final TrainingProgramRepository programRepository;

    // GET RULES FOR A PROGRAM
    @GetMapping("/program/{programId}")
    public List<EligibilityRule> getRules(
            @PathVariable Long programId) {

        return ruleRepository
                .findByProgramId(programId);
    }

    // CREATE ELIGIBILITY RULE
    @PostMapping
    public ResponseEntity<EligibilityRule>
    createRule(
            @Valid @RequestBody
            EligibilityRuleRequest request) {

        TrainingProgram program =
                programRepository
                        .findById(
                                request.getProgramId()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Training programme not found"
                                )
                        );

        EligibilityRule rule =
                new EligibilityRule();

        rule.setProgram(program);
        rule.setRuleType(
                request.getRuleType()
        );
        rule.setRuleValue(
                request.getRuleValue()
        );

        EligibilityRule saved =
                ruleRepository.save(rule);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    // DELETE RULE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRule(
            @PathVariable Long id) {

        if (!ruleRepository.existsById(id)) {

            throw new RuntimeException(
                    "Eligibility rule not found"
            );
        }

        ruleRepository.deleteById(id);

        return ResponseEntity.noContent()
                .build();
    }
}