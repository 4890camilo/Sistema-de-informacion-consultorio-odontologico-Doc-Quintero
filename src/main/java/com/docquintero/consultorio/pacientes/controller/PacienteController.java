package com.docquintero.consultorio.pacientes.controller;

import com.docquintero.consultorio.interfaces.IPacienteService;
import com.docquintero.consultorio.pacientes.dto.PacienteRequest;
import com.docquintero.consultorio.pacientes.dto.PacienteResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@Tag(name = "Pacientes", description = "Gestión de datos demográficos y médicos básicos de pacientes")
public class PacienteController {

    @Autowired
    private IPacienteService service;

    @GetMapping
    @Operation(summary = "Listar pacientes", description = "Lista todos los pacientes activos. Permite búsqueda por texto (?q=)")
    public ResponseEntity<List<PacienteResponse>> listar(@RequestParam(required = false) String q) {
        return ResponseEntity.ok(service.listar(q));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener paciente por ID")
    public ResponseEntity<PacienteResponse> obtenerPorId(@PathVariable String id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @GetMapping("/cedula/{num}")
    @Operation(summary = "Buscar paciente por cédula")
    public ResponseEntity<PacienteResponse> obtenerPorCedula(@PathVariable String num) {
        return ResponseEntity.ok(service.obtenerPorCedula(num));
    }

    @PostMapping
    @Operation(summary = "Crear paciente")
    public ResponseEntity<PacienteResponse> crear(@Valid @RequestBody PacienteRequest request) {
        return ResponseEntity.ok(service.crear(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar paciente")
    public ResponseEntity<PacienteResponse> actualizar(@PathVariable String id, @Valid @RequestBody PacienteRequest request) {
        return ResponseEntity.ok(service.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Desactivar paciente", description = "Realiza un borrado lógico (soft delete - Solo Administrador)")
    public ResponseEntity<Void> desactivar(@PathVariable String id) {
        service.desactivar(id);
        return ResponseEntity.noContent().build();
    }
}
