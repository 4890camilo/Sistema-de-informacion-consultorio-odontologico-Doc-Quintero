package com.docquintero.consultorio.citas.controller;

import com.docquintero.consultorio.citas.dto.CitaEstadoRequest;
import com.docquintero.consultorio.citas.dto.CitaRequest;
import com.docquintero.consultorio.citas.dto.CitaResponse;
import com.docquintero.consultorio.interfaces.ICitaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/citas")
@Tag(name = "Citas", description = "Gestión de agenda y estados de citas odontológicas")
public class CitaController {

    @Autowired
    private ICitaService service;

    @GetMapping
    @Operation(summary = "Listar todas las citas")
    public ResponseEntity<List<CitaResponse>> listarTodas() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener cita por ID")
    public ResponseEntity<CitaResponse> obtenerPorId(@PathVariable String id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @GetMapping("/paciente/{pacienteId}")
    @Operation(summary = "Listar citas de un paciente")
    public ResponseEntity<List<CitaResponse>> listarPorPaciente(@PathVariable String pacienteId) {
        return ResponseEntity.ok(service.listarPorPaciente(pacienteId));
    }

    @GetMapping("/rango")
    @Operation(summary = "Filtrar citas por rango de fechas")
    public ResponseEntity<List<CitaResponse>> listarPorRango(
            @RequestParam(required = false) String desde,
            @RequestParam(required = false) String hasta) {
        LocalDateTime desdeLdt = (desde != null && !desde.isBlank()) 
                ? (desde.contains("T") ? LocalDateTime.parse(desde) : LocalDateTime.parse(desde + "T00:00:00")) 
                : LocalDateTime.now().minusMonths(1);
        LocalDateTime hastaLdt = (hasta != null && !hasta.isBlank()) 
                ? (hasta.contains("T") ? LocalDateTime.parse(hasta) : LocalDateTime.parse(hasta + "T23:59:59")) 
                : LocalDateTime.now().plusMonths(1);
        return ResponseEntity.ok(service.listarPorRango(desdeLdt, hastaLdt));
    }

    @PostMapping
    @Operation(summary = "Crear cita")
    public ResponseEntity<CitaResponse> crear(@Valid @RequestBody CitaRequest request) {
        return ResponseEntity.ok(service.crear(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar cita")
    public ResponseEntity<CitaResponse> actualizar(@PathVariable String id, @Valid @RequestBody CitaRequest request) {
        return ResponseEntity.ok(service.actualizar(id, request));
    }

    @PutMapping("/{id}/reschedule")
    @Operation(summary = "Reprogramar fecha y hora de la cita")
    public ResponseEntity<CitaResponse> reprogramar(
            @PathVariable String id,
            @RequestParam String newDateTime) {
        LocalDateTime fechaHora = newDateTime.contains("T") 
                ? LocalDateTime.parse(newDateTime.substring(0, 16)) 
                : LocalDateTime.parse(newDateTime + "T00:00:00");
        return ResponseEntity.ok(service.reprogramar(id, fechaHora));
    }

    @PatchMapping("/{id}/estado")
    @Operation(summary = "Cambiar estado de la cita")
    public ResponseEntity<CitaResponse> cambiarEstado(@PathVariable String id, @Valid @RequestBody CitaEstadoRequest request) {
        return ResponseEntity.ok(service.cambiarEstado(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancelar cita")
    public ResponseEntity<Void> cancelar(@PathVariable String id) {
        service.cancelar(id);
        return ResponseEntity.noContent().build();
    }
}
