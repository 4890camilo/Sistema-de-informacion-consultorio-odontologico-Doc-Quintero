package com.docquintero.consultorio.controller;

import com.docquintero.consultorio.dto.AppointmentRequest;
import com.docquintero.consultorio.dto.AppointmentResponse;
import com.docquintero.consultorio.dto.AvailabilitySlot;
import com.docquintero.consultorio.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentResponse> createAppointment(@Valid @RequestBody AppointmentRequest request) {
        try {
            AppointmentResponse response = appointmentService.createAppointment(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/reschedule")
    public ResponseEntity<AppointmentResponse> rescheduleAppointment(@PathVariable String id,
                                                                     @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime newDateTime) {
        try {
            AppointmentResponse response = appointmentService.rescheduleAppointment(id, newDateTime);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/availability")
    public ResponseEntity<List<AvailabilitySlot>> getAvailableSlots(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<AvailabilitySlot> slots = appointmentService.getAvailableSlots(date);
        return ResponseEntity.ok(slots);
    }

    @GetMapping("/report")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<AppointmentResponse> appointments = appointmentService.getAppointmentsByDateRange(start, end);
        return ResponseEntity.ok(appointments);
    }
}