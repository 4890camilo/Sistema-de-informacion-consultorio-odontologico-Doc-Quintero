package com.docquintero.consultorio.documentos.controller;

import com.docquintero.consultorio.documentos.model.DocumentoClinico;
import com.docquintero.consultorio.documentos.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/documentos-clinicos")
public class DocumentoClinicoController {

    @Autowired
    private TemplateService templateService;

    @PostMapping("/generar-receta")
    public DocumentoClinico generarReceta(@RequestBody RecetaRequest request) {
        String html = templateService.generarReceta(request.pacienteNombre(), request.profesionalNombre(), 
                                                   request.medicamentos(), request.indicaciones());
        return DocumentoClinico.builder()
                .pacienteId(request.pacienteId())
                .tipo("RECETA")
                .titulo("Receta Médica - " + request.pacienteNombre())
                .contenidoHtml(html)
                .estado("ACTIVO")
                .createdAt(LocalDateTime.now())
                .build();
    }

    public record RecetaRequest(String pacienteId, String pacienteNombre, String profesionalNombre, 
                               String medicamentos, String indicaciones) {}
}
