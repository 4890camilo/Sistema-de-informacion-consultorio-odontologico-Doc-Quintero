package com.docquintero.consultorio.documentos.controller;

import com.docquintero.consultorio.documentos.model.Documento;
import com.docquintero.consultorio.documentos.model.TipoDocumento;
import com.docquintero.consultorio.interfaces.IDocumentoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documentos")
@Tag(name = "Documentos", description = "Gestión de archivos adjuntos (radiografías, consentimientos, etc.)")
public class DocumentoController {

    @Autowired
    private IDocumentoService service;

    @GetMapping("/paciente/{pid}")
    @Operation(summary = "Listar documentos de un paciente")
    public ResponseEntity<List<Documento>> listarPorPaciente(@PathVariable String pid) {
        return ResponseEntity.ok(service.listarPorPaciente(pid));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Subir un documento")
    public ResponseEntity<Documento> subir(
            @RequestParam String pacienteId,
            @RequestParam(required = false) String historiaClinicaId,
            @RequestParam TipoDocumento tipo,
            @RequestPart MultipartFile file) {
        return ResponseEntity.ok(service.subir(pacienteId, historiaClinicaId, tipo, file));
    }

    @GetMapping("/{id}/download")
    @Operation(summary = "Descargar un documento")
    public ResponseEntity<byte[]> descargar(@PathVariable String id) {
        return ResponseEntity.ok(service.descargar(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un documento")
    public ResponseEntity<Void> eliminar(@PathVariable String id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
