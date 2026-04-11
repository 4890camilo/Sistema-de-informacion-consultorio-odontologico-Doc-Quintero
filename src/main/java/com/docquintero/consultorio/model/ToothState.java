package com.docquintero.consultorio.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ToothState {
    private String toothNumber; // FDI number
    private String oclusal;
    private String vestibular;
    private String lingual;
    private String mesial;
    private String distal;
}