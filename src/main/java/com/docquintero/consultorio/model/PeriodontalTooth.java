package com.docquintero.consultorio.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PeriodontalTooth {
    private String toothNumber;
    private List<PeriodontalPoint> points;
    private int mov; // 0-3
    private String furca; // 0-III
    private int iho; // 0-3
}