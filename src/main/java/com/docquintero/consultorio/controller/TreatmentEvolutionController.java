package com.docquintero.consultorio.controller;

import com.docquintero.consultorio.model.TreatmentEvolution;
import com.docquintero.consultorio.service.TreatmentEvolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/treatment-evolutions")
public class TreatmentEvolutionController {

    @Autowired
    private TreatmentEvolutionService treatmentEvolutionService;

    @PostMapping("/{patientId}")
    public ResponseEntity<TreatmentEvolution> createTreatmentEvolution(@PathVariable String patientId, @RequestBody String description) {
        try {
            TreatmentEvolution evolution = treatmentEvolutionService.createTreatmentEvolution(patientId, description);
            return ResponseEntity.ok(evolution);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<List<TreatmentEvolution>> getTreatmentEvolutions(@PathVariable String patientId) {
        List<TreatmentEvolution> evolutions = treatmentEvolutionService.getTreatmentEvolutions(patientId);
        return ResponseEntity.ok(evolutions);
    }
}