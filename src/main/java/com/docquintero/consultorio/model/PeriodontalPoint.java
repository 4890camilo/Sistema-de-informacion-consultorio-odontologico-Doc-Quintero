package com.docquintero.consultorio.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PeriodontalPoint {
    private String position; // VM, VC, VD, LM, LC, LD
    private int ps; // 0-15
    private int nic;
    private int rec;
    private boolean ss;
    private boolean sup;
}