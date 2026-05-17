package com.docquintero.consultorio.documentos.service;

import org.springframework.stereotype.Service;

@Service
public class TemplateService {

    public String generarReceta(String pacienteNombre, String profesionalNombre, String medicamentos, String indicaciones) {
        return """
            <div style='font-family: sans-serif; padding: 40px; border: 1px solid #eee;'>
                <div style='text-align: center; border-bottom: 2px solid #0d6b6b; padding-bottom: 20px;'>
                    <h1 style='color: #0a4a4a; margin: 0;'>CONSULTORIO DOC. QUINTERO</h1>
                    <p style='color: #6b8c8c;'>Receta Médica Odontológica</p>
                </div>
                <div style='margin-top: 30px;'>
                    <p><strong>Paciente:</strong> %s</p>
                    <p><strong>Fecha:</strong> %s</p>
                </div>
                <div style='margin-top: 40px; min-height: 200px;'>
                    <h3 style='color: #0d6b6b;'>Prescripción:</h3>
                    <p style='white-space: pre-wrap;'>%s</p>
                    <h3 style='color: #0d6b6b;'>Indicaciones:</h3>
                    <p style='white-space: pre-wrap;'>%s</p>
                </div>
                <div style='margin-top: 60px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;'>
                    <p>__________________________</p>
                    <p><strong>Dra. %s</strong></p>
                    <p>Odontología General y Especializada</p>
                </div>
            </div>
            """.formatted(pacienteNombre, java.time.LocalDate.now(), medicamentos, indicaciones, profesionalNombre);
    }

    public String generarConsentimiento(String pacienteNombre, String procedimiento) {
        return """
            <div style='font-family: sans-serif; padding: 40px; line-height: 1.6;'>
                <h2 style='text-align: center; color: #0a4a4a;'>CONSENTIMIENTO INFORMADO</h2>
                <p>Yo, <strong>%s</strong>, en pleno uso de mis facultades, autorizo al equipo médico de 
                <strong>Consultorio Doc. Quintero</strong> para la realización del procedimiento: 
                <strong>%s</strong>.</p>
                <p>Se me han explicado los riesgos, beneficios y alternativas de este tratamiento. 
                Entiendo que la odontología no es una ciencia exacta y que pueden surgir complicaciones imprevistas.</p>
                <div style='margin-top: 100px; display: flex; justify-content: space-between;'>
                    <div style='text-align: center;'>
                        <p>__________________________</p>
                        <p>Firma del Paciente</p>
                    </div>
                    <div style='text-align: center;'>
                        <p>__________________________</p>
                        <p>Firma del Odontólogo</p>
                    </div>
                </div>
            </div>
            """.formatted(pacienteNombre, procedimiento);
    }

    public String generarPresupuesto(String pacienteNombre, String planNombre, double total, String detalle) {
        return """
            <div style='font-family: sans-serif; padding: 40px;'>
                <div style='text-align: center; color: #0a4a4a; border-bottom: 2px solid #eee; padding-bottom: 20px;'>
                    <h1>PRESUPUESTO ODONTOLÓGICO</h1>
                    <p>%s</p>
                </div>
                <div style='margin-top: 30px;'>
                    <p><strong>Paciente:</strong> %s</p>
                </div>
                <div style='margin-top: 20px; border: 1px solid #eee; border-radius: 8px; overflow: hidden;'>
                    <table style='width: 100%%; border-collapse: collapse;'>
                        <tr style='background: #f5fafa; color: #0a4a4a;'>
                            <th style='padding: 12px; text-align: left;'>Descripción del Tratamiento</th>
                        </tr>
                        <tr>
                            <td style='padding: 20px; white-space: pre-wrap;'>%s</td>
                        </tr>
                    </table>
                </div>
                <div style='margin-top: 20px; text-align: right; font-size: 1.2rem; color: #0d6b6b;'>
                    <p><strong>TOTAL ESTIMADO: $%s</strong></p>
                </div>
                <p style='margin-top: 40px; font-size: 0.8rem; color: #6b8c8c;'>
                    * Este presupuesto tiene una validez de 30 días. Sujeto a cambios según hallazgos clínicos durante el tratamiento.
                </p>
            </div>
            """.formatted(planNombre, pacienteNombre, detalle, String.format("%.2f", total));
    }
}
