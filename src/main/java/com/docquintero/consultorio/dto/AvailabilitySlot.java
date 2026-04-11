package com.docquintero.consultorio.dto;

import java.time.LocalDateTime;

public class AvailabilitySlot {
    private LocalDateTime dateTime;
    private boolean available;

    public AvailabilitySlot() {}

    public AvailabilitySlot(LocalDateTime dateTime, boolean available) {
        this.dateTime = dateTime;
        this.available = available;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}