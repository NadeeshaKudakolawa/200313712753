package com.example.task1;

import com.example.task1.entity.Department;
import com.example.task1.entity.Officer;
import com.example.task1.entity.TrainingProgram;
import com.example.task1.repository.DepartmentRepository;
import com.example.task1.repository.OfficerRepository;
import com.example.task1.repository.TrainingProgramRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner dataLoader(
            DepartmentRepository departmentRepository,
            OfficerRepository officerRepository,
            TrainingProgramRepository programRepository) {

        return args -> {

            if (departmentRepository.count() == 0) {

                Department finance = new Department();
                finance.setName("Finance");

                Department administration = new Department();
                administration.setName("Administration");

                departmentRepository.save(finance);
                departmentRepository.save(administration);

                Officer officer1 = new Officer();
                officer1.setServiceNumber("OFF001");
                officer1.setName("A. Perera");
                officer1.setEmail("aperera@gov.lk");
                officer1.setDepartment(finance);

                Officer officer2 = new Officer();
                officer2.setServiceNumber("OFF002");
                officer2.setName("K. Silva");
                officer2.setEmail("ksilva@gov.lk");
                officer2.setDepartment(finance);

                officerRepository.save(officer1);
                officerRepository.save(officer2);

                TrainingProgram program = new TrainingProgram();
                program.setTitle("Advanced Management");
                program.setTrainingDate(
                        LocalDate.of(2026, 10, 10)
                );
                program.setVenue("Colombo Training Centre");
                program.setMaximumParticipants(50);

                programRepository.save(program);
            }
        };
    }
}
