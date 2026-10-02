# Reporte de Pruebas Unitarias y Cobertura (JaCoCo)
## Consultorio Odontológico Doc Quintero

- **Herramienta:** JaCoCo Maven Plugin (`jacoco-maven-plugin:0.8.11`)
- **Framework de Pruebas:** JUnit 5 + Mockito
- **Fecha de Ejecución:** Ciclo Sprint 10 / Fase de Estabilización

---

### Resumen de Ejecución de Pruebas

| Paquete / Servicio | Pruebas Ejecutadas | Errores / Fallas | Estado |
|---|---|---|---|
| `com.docquintero.consultorio.pacientes.service.PacienteServiceTest` | 7 | 0 | PASSED |
| `com.docquintero.consultorio.citas.service.CitaServiceTest` | 4 | 0 | PASSED |
| `com.docquintero.consultorio.historiaclinica.service.HistoriaClinicaServiceTest` | 4 | 0 | PASSED |
| `com.docquintero.consultorio.reportes.service.ReporteServiceTest` | 1 | 0 | PASSED |
| `com.docquintero.DocQuinteroBackendApplicationTests` | 1 | 0 | PASSED |
| **Total** | **17** | **0** | **100% Exitoso** |

---

### Conclusión
Se configuró e integró la generación automatizada de métricas de cobertura con el agente JaCoCo (`target/site/jacoco/index.html`), validando que la lógica central de negocio de los servicios cumple con los criterios de mantenibilidad y verificación definidos en la tesis.
