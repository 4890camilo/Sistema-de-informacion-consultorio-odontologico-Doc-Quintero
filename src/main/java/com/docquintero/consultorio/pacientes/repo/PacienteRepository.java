package com.docquintero.consultorio.pacientes.repo;

import com.docquintero.consultorio.pacientes.model.Paciente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;
import java.util.Optional;

public interface PacienteRepository extends MongoRepository<Paciente, String> {
    
    Optional<Paciente> findByIdentificationNumber(String identificationNumber);
    
    @Query("{ '$or': [ { 'firstName': { '$regex': ?0, '$options': 'i' } }, { 'lastName': { '$regex': ?0, '$options': 'i' } }, { 'identificationNumber': { '$regex': ?0, '$options': 'i' } } ], 'active': { '$ne': false } }")
    List<Paciente> searchActive(String text);
    
    List<Paciente> findAll();
}
