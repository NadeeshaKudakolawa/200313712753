package com.example.task1.controller;

import com.example.task1.dto.NominationRequest;
import com.example.task1.dto.NominationResponse;
import com.example.task1.service.NominationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/nominations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class NominationController {

    private final NominationService nominationService;

    @PostMapping
    public ResponseEntity<NominationResponse> createNomination(
            @Valid @RequestBody NominationRequest request) {

        NominationResponse response =
                nominationService.createNomination(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}