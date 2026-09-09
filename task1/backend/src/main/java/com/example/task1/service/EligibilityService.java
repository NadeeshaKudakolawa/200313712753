package com.example.task1.service;

import com.example.task1.entity.EligibilityRule;
import com.example.task1.entity.Officer;
import com.example.task1.entity.TrainingProgram;
import com.example.task1.repository.EligibilityRuleRepository;
import com.example.task1.repository.NominationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EligibilityService {

    private final EligibilityRuleRepository eligibilityRuleRepository;
    private final NominationRepository nominationRepository;

    public void checkEligibility(
            Officer officer,
            TrainingProgram program) {

        List<EligibilityRule> rules =
                eligibilityRuleRepository
                        .findByProgramId(program.getId());

        for (EligibilityRule rule : rules) {

            checkRule(
                    rule,
                    officer,
                    program
            );
        }
    }

    private void checkRule(
            EligibilityRule rule,
            Officer officer,
            TrainingProgram program) {

        String ruleType =
                rule.getRuleType();

        String ruleValue =
                rule.getRuleValue();

        // Department eligibility
        if ("PROGRAM_DEPARTMENT".equals(ruleType)) {

            String officerDepartment =
                    officer.getDepartment().getName();

            if (!officerDepartment.equalsIgnoreCase(
                    ruleValue)) {

                throw new RuntimeException(
                        "Officer is not eligible. "
                                + "This programme is only available "
                                + "to the " + ruleValue
                                + " department."
                );
            }
        }

        // Grade eligibility
        else if ("REQUIRED_GRADE".equals(ruleType)) {

            if (!officer.getGrade()
                    .equalsIgnoreCase(ruleValue)) {

                throw new RuntimeException(
                        "Officer is not eligible. "
                                + "Required grade: "
                                + ruleValue
                );
            }
        }

        // Minimum years of service
        else if ("MIN_SERVICE_YEARS".equals(ruleType)) {

            int requiredYears =
                    Integer.parseInt(ruleValue);

            int serviceYears =
                    Period.between(
                            officer.getDateOfJoining(),
                            LocalDate.now()
                    ).getYears();

            if (serviceYears < requiredYears) {

                throw new RuntimeException(
                        "Officer is not eligible. "
                                + "Minimum service required: "
                                + requiredYears
                                + " years."
                );
            }
        }

        // Prevent repeat participation
        else if ("PREVENT_REPEAT".equals(ruleType)) {

            int months =
                    Integer.parseInt(ruleValue);

            LocalDateTime cutoff =
                    LocalDateTime.now()
                            .minusMonths(months);

            boolean participated =
                    nominationRepository
                            .existsByOfficerIdAndProgramIdAndStatusAndNominatedAtAfter(
                                    officer.getId(),
                                    program.getId(),
                                    "CONFIRMED",
                                    cutoff
                            );

            if (participated) {

                throw new RuntimeException(
                        "Officer has already participated "
                                + "in this training programme "
                                + "within the previous "
                                + months + " months."
                );
            }
        }
    }
}