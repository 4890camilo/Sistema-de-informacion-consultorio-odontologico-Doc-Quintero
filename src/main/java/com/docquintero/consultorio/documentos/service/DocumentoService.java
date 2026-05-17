package com.docquintero.consultorio.documentos.service;

import com.docquintero.consultorio.documentos.model.Documento;
import com.docquintero.consultorio.documentos.model.TipoDocumento;
import com.docquintero.consultorio.documentos.repo.DocumentoRepository;
import com.docquintero.consultorio.interfaces.IDocumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DocumentoService implements IDocumentoService {

    @Autowired
    private DocumentoRepository repo;

    @Override
    public List<Documento> listarPorPaciente(String pacienteId) {
        return repo.findByPacienteId(pacienteId);
    }

    @Override
    public Documento subir(String pacienteId, String hcId, TipoDocumento tipo, MultipartFile file) {
        // En una implementación real, aquí se subiría a S3 o se guardaría en disco
        String mockUrl = "https://storage.docquintero.com/" + file.getOriginalFilename();
        
        Documento doc = Documento.builder()
                .pacienteId(pacienteId)
                .historiaClinicaId(hcId)
                .nombre(file.getOriginalFilename())
                .tipo(tipo)
                .url(mockUrl)
                .tamanioBytes(file.getSize())
                .mimeType(file.getContentType())
                .uploadedAt(LocalDateTime.now())
                .build();
        
        return repo.save(doc);
    }

    @Override
    public byte[] descargar(String id) {
        // Implementación real: obtener de S3 o disco
        return new byte[0];
    }

    @Override
    public void eliminar(String id) {
        repo.deleteById(id);
    }
}
