package com.docquintero.consultorio.documentos.repo;

import com.docquintero.consultorio.documentos.model.Documento;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DocumentoRepository extends MongoRepository<Documento, String> {
    List<Documento> findByPacienteId(String pacienteId);
}
