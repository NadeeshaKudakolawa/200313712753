package com.example.task1;

import com.example.task1.entity.Department;
import com.example.task1.entity.Officer;
import com.example.task1.entity.TrainingProgram;
import com.example.task1.repository.DepartmentRepository;
import com.example.task1.repository.OfficerRepository;
import com.example.task1.repository.TrainingProgramRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner loadData(
            DepartmentRepository departmentRepository,
            OfficerRepository officerRepository,
            TrainingProgramRepository trainingProgramRepository) {

        return args -> {

            if (departmentRepository.count() == 0) {

                Department finance = new Department();
                finance.setName("Finance");

                Department administration = new Department();
                administration.setName("Administration");

                Department humanResources = new Department();
                humanResources.setName("Human Resources");

                departmentRepository.save(finance);
                departmentRepository.save(administration);
                departmentRepository.save(humanResources);

                Officer officer1 = new Officer();
                officer1.setServiceNumber("OFF001");
                officer1.setName("A. Perera");
                officer1.setEmail("aperera@gov.lk");
                officer1.setDepartment(finance);
                officer1.setGrade("Senior Officer");
                officer1.setDateOfJoining(LocalDate.of(2018, 1, 10));

                Officer officer2 = new Officer();
                officer2.setServiceNumber("OFF002");
                officer2.setName("B. Silva");
                officer2.setEmail("bsilva@gov.lk");
                officer2.setDepartment(finance);
                officer2.setGrade("Officer");
                officer2.setDateOfJoining(LocalDate.of(2020, 5, 15));

                Officer officer3 = new Officer();
                officer3.setServiceNumber("OFF003");
                officer3.setName("C. Fernando");
                officer3.setEmail("cfernando@gov.lk");
                officer3.setDepartment(administration);
                officer3.setGrade("Senior Officer");
                officer3.setDateOfJoining(LocalDate.of(2017, 3, 20));

                Officer officer4 = new Officer();
                officer4.setServiceNumber("OFF004");
                officer4.setName("D. Perera");
                officer4.setEmail("dperera@gov.lk");
                officer4.setDepartment(humanResources);
                officer4.setGrade("Officer");
                officer4.setDateOfJoining(LocalDate.of(2022, 7, 1));

                officerRepository.save(officer1);
                officerRepository.save(officer2);
                officerRepository.save(officer3);
                officerRepository.save(officer4);

                TrainingProgram program = new TrainingProgram();
                program.setTitle("Cybersecurity Awareness Programme");
                program.setTrainingDate(LocalDate.of(2026, 10, 10));
                program.setVenue("Colombo Training Centre");
                program.setMaximumParticipants(40);

                trainingProgramRepository.save(program);
            }
        };
    }
}