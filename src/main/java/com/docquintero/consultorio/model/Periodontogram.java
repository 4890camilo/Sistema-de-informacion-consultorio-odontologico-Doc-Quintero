package com.docquintero.consultorio.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "periodontograms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Periodontogram {

    @Id
    private String id;
    @DBRef
    private Patient patient;
    @DBRef
    private User dentist;
    private List<PeriodontalTooth> teeth;
    private LocalDateTime createdAt;

    // Calculated fields
    private double ssPercentage;
    private double ps4Percentage;
    private double ps6Percentage;
    private double nicAverage;
    private String periodontalClassification;
}