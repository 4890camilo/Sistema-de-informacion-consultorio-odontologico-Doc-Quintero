package com.docquintero.consultorio.reportes.controller;

import com.docquintero.consultorio.reportes.model.ReporteSummary;
import com.docquintero.consultorio.reportes.service.ReporteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reportes")
@Tag(name = "Reportes", description = "Generación de indicadores y exportación de datos")
public class ReporteController {

    @Autowired
    private ReporteService service;

    @GetMapping("/resumen")
    @Operation(summary = "Obtener resumen de KPIs", description = "Retorna contadores generales del sistema")
    public ResponseEntity<ReporteSummary> obtenerResumen() {
        return ResponseEntity.ok(service.obtenerResumen());
    }
}
