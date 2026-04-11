package com.docquintero.consultorio.controller;

import com.docquintero.consultorio.model.MedicalHistory;
import com.docquintero.consultorio.service.MedicalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medical-history")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    @PostMapping("/{patientId}")
    public ResponseEntity<MedicalHistory> createMedicalHistory(@PathVariable String patientId, @RequestBody MedicalHistory history) {
        try {
            MedicalHistory created = medicalHistoryService.createMedicalHistory(patientId, history);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<MedicalHistory> getMedicalHistory(@PathVariable String patientId) {
        try {
            MedicalHistory history = medicalHistoryService.getMedicalHistory(patientId);
            return ResponseEntity.ok(history);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}