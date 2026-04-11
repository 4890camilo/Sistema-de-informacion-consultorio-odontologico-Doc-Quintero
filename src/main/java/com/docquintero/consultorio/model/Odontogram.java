package com.docquintero.consultorio.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "odontograms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Odontogram {

    @Id
    private String id;
    @DBRef
    private Patient patient;
    @DBRef
    private User dentist;
    private List<ToothState> teeth;
    private LocalDateTime createdAt;
}