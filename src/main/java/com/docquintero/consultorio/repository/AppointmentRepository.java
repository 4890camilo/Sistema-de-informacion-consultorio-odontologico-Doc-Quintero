package com.docquintero.consultorio.repository;

import com.docquintero.consultorio.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByPatientId(String patientId);
    List<Appointment> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);
    boolean existsByDateTime(LocalDateTime dateTime);
}