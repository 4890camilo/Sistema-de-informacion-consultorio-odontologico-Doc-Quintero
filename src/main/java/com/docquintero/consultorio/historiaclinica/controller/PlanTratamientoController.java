package com.docquintero.consultorio.historiaclinica.controller;

import com.docquintero.consultorio.historiaclinica.model.PlanTratamiento;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/planes-tratamiento")
public class PlanTratamientoController {

    private final List<PlanTratamiento> db = new ArrayList<>(); // Mock persistence for demo

    @PostMapping
    public PlanTratamiento crear(@RequestBody PlanTratamiento plan) {
        plan.setId(java.util.UUID.randomUUID().toString());
        plan.setCreatedAt(LocalDateTime.now());
        db.add(plan);
        return plan;
    }

    @GetMapping("/paciente/{pacienteId}")
    public List<PlanTratamiento> listarPorPaciente(@PathVariable String pacienteId) {
        return db.stream().filter(p -> p.getPacienteId().equals(pacienteId)).toList();
    }
}
