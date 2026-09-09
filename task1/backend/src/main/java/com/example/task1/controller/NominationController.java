package com.example.task1.controller;

import com.example.task1.dto.NominationRequest;
import com.example.task1.dto.NominationResponse;
import com.example.task1.service.NominationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nominations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class NominationController {

    private final NominationService nominationService;

    // POST /api/nominations
    @PostMapping
    public ResponseEntity<NominationResponse> createNomination(
            @Valid @RequestBody NominationRequest request) {

        NominationResponse response =
                nominationService.createNomination(
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // GET /api/nominations
    @GetMapping
    public ResponseEntity<List<NominationResponse>>
    getAllNominations() {

        return ResponseEntity.ok(
                nominationService.getAllNominations()
        );
    }

    // PUT /api/nominations/{id}/cancel
    @PutMapping("/{id}/cancel")
    public ResponseEntity<NominationResponse>
    cancelNomination(
            @PathVariable Long id) {

        NominationResponse response =
                nominationService.cancelNomination(
                        id
                );

        return ResponseEntity.ok(
                response
        );
    }
}