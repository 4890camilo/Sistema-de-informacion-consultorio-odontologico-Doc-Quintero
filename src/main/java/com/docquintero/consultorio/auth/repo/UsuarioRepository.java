package com.docquintero.consultorio.auth.repo;

import com.docquintero.consultorio.auth.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByEmail(String email);
    Boolean existsByEmail(String email);
}
