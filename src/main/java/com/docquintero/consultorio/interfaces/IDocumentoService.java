package com.docquintero.consultorio.interfaces;

import com.docquintero.consultorio.documentos.model.Documento;
import com.docquintero.consultorio.documentos.model.TipoDocumento;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface IDocumentoService {
    List<Documento> listarPorPaciente(String pacienteId);
    Documento subir(String pacienteId, String hcId, TipoDocumento tipo, MultipartFile file);
    byte[] descargar(String id);
    void eliminar(String id);
}
