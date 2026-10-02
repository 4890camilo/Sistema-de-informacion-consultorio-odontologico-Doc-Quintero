package com.docquintero.consultorio.historiaclinica.controller;

import com.docquintero.consultorio.historiaclinica.dto.OdontogramaRequest;
import com.docquintero.consultorio.historiaclinica.dto.OdontogramaResponse;
import com.docquintero.consultorio.interfaces.IOdontogramaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historia-clinica")
@Tag(name = "Odontograma", description = "Versionado y registro gráfico de odontogramas")
public class OdontogramaController {

    @Autowired
    private IOdontogramaService service;

    @PostMapping("/{hcId}/odontograma")
    @Operation(summary = "Crear nueva versión de odontograma")
    public ResponseEntity<OdontogramaResponse> guardarOdontograma(
            @PathVariable String hcId,
            @Valid @RequestBody OdontogramaRequest request) {
        return ResponseEntity.ok(service.crearNuevaVersion(hcId, request));
    }

    @GetMapping("/{hcId}/odontograma/actual")
    @Operation(summary = "Obtener odontograma actual activo")
    public ResponseEntity<OdontogramaResponse> obtenerActual(@PathVariable String hcId) {
        return ResponseEntity.ok(service.obtenerActual(hcId));
    }

    @GetMapping("/{hcId}/odontograma")
    @Operation(summary = "Historial de versiones de odontograma")
    public ResponseEntity<List<OdontogramaResponse>> obtenerHistorial(@PathVariable String hcId) {
        return ResponseEntity.ok(service.listarVersiones(hcId));
    }

    @PatchMapping("/odontograma/{id}/anular")
    @Operation(summary = "Anular versión de odontograma")
    public ResponseEntity<Void> anular(@PathVariable String id) {
        service.anularVersion(id);
        return ResponseEntity.noContent().build();
    }
}
