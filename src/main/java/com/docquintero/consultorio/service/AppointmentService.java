package com.docquintero.consultorio.service;

import com.docquintero.consultorio.dto.AppointmentRequest;
import com.docquintero.consultorio.dto.AppointmentResponse;
import com.docquintero.consultorio.dto.AvailabilitySlot;
import com.docquintero.consultorio.dto.PatientResponse;
import com.docquintero.consultorio.model.Appointment;
import com.docquintero.consultorio.model.Patient;
import com.docquintero.consultorio.repository.AppointmentRepository;
import com.docquintero.consultorio.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @PreAuthorize("hasRole('AUXILIAR')")
    public AppointmentResponse createAppointment(AppointmentRequest request) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new IllegalArgumentException("Paciente no encontrado"));

        if (appointmentRepository.existsByDateTime(request.getDateTime())) {
            throw new IllegalArgumentException("Horario ocupado");
        }

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDateTime(request.getDateTime());
        appointment.setType(request.getType());
        appointment.setStatus("Programada");
        appointment.setNotes(request.getNotes());
        appointment.setCreatedAt(LocalDateTime.now());
        appointment.setUpdatedAt(LocalDateTime.now());

        Appointment saved = appointmentRepository.save(appointment);
        return mapToResponse(saved);
    }

    @PreAuthorize("hasRole('AUXILIAR')")
    public AppointmentResponse rescheduleAppointment(String id, LocalDateTime newDateTime) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cita no encontrada"));

        if (appointmentRepository.existsByDateTime(newDateTime)) {
            throw new IllegalArgumentException("Nuevo horario ocupado");
        }

        appointment.setDateTime(newDateTime);
        appointment.setUpdatedAt(LocalDateTime.now());

        Appointment saved = appointmentRepository.save(appointment);
        return mapToResponse(saved);
    }

    public List<AppointmentResponse> getAppointmentsByDateRange(LocalDateTime start, LocalDateTime end) {
        return appointmentRepository.findByDateTimeBetween(start, end).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('AUXILIAR')")
    public List<AvailabilitySlot> getAvailableSlots(LocalDate date) {
        List<AvailabilitySlot> slots = new ArrayList<>();
        LocalDateTime start = date.atTime(8, 0); // 8:00 AM
        LocalDateTime end = date.atTime(18, 0); // 6:00 PM

        LocalDateTime current = start;
        while (current.isBefore(end)) {
            boolean available = !appointmentRepository.existsByDateTime(current);
            slots.add(new AvailabilitySlot(current, available));
            current = current.plusMinutes(30); // 30 min slots
        }

        return slots;
    }

    private AppointmentResponse mapToResponse(Appointment appointment) {
        PatientResponse patient = new PatientResponse(
                appointment.getPatient().getId(),
                appointment.getPatient().getIdentificationNumber(),
                appointment.getPatient().getFirstName(),
                appointment.getPatient().getLastName(),
                appointment.getPatient().getBirthDate(),
                appointment.getPatient().getPhone(),
                appointment.getPatient().getEmail(),
                appointment.getPatient().getAddress(),
                appointment.getPatient().getEmergencyContactName(),
                appointment.getPatient().getEmergencyContactPhone(),
                appointment.getPatient().getCreatedAt(),
                appointment.getPatient().getUpdatedAt()
        );

        return new AppointmentResponse(
                appointment.getId(),
                patient,
                appointment.getDateTime(),
                appointment.getType(),
                appointment.getStatus(),
                appointment.getNotes(),
                appointment.getCreatedAt(),
                appointment.getUpdatedAt()
        );
    }
}