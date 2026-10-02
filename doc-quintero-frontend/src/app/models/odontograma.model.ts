export type CondicionDental =
  | 'SANO'
  | 'CARIES'
  | 'FRACTURA'
  | 'AUSENTE'
  | 'RESTAURACION'
  | 'RESTAURACION_MAL_ESTADO'
  | 'AMALGAMA'
  | 'AMALGAMA_MAL_ESTADO'
  | 'CORONA'
  | 'CORONA_PROVISORIA'
  | 'CORONA_PROVISORIA_MAL_ESTADO'
  | 'PERNO_MUNON'
  | 'PERNO_MUNON_MAL_ESTADO'
  | 'IMPLANTE'
  | 'IMPLANTE_MAL_ESTADO'
  | 'ENDODONCIA'
  | 'ENDODONCIA_MAL_ESTADO'
  | 'SELLANTE'
  | 'EXTRACCION_INDICADA'
  | 'LESION';

export interface PiezaDental {
  numeroPieza: number; // FDI (11-48, 51-85)
  condicion: CondicionDental;
  superficiesAfectadas?: string[];
  superficiesEstado?: Record<string, string>; // e.g. { vestibular: '#e74c3c' }
  codigoCie10?: string;
  descripcionCie10?: string;
  codigoCups?: string;
  descripcionCups?: string;
  estado?: string;
  notas?: string;
  anulada?: boolean;
}

export interface OdontogramaRequest {
  piezas: PiezaDental[];
  observaciones?: string;
  odontologoId?: string;
}

export interface OdontogramaResponse {
  id: string;
  historiaClinicaId: string;
  version: number;
  fechaRegistro: string;
  piezas: PiezaDental[];
  observaciones?: string;
  odontologoId?: string;
  activo: boolean;
}

export interface Cie10Item {
  codigo: string;
  descripcion: string;
  categoria: string;
}

export interface CupsItem {
  codigo: string;
  descripcion: string;
  categoria: string;
}

/** Catálogo Estándar CIE-10 Odontológico (Capítulo K00 - K14) */
export const CATALOGO_CIE10_DENTAL: Cie10Item[] = [
  { codigo: 'K00.0', descripcion: 'Anodoncia / Pieza ausente congénita', categoria: 'Desarrollo' },
  { codigo: 'K00.6', descripcion: 'Diente natal / neonatal o alteración en erupción', categoria: 'Desarrollo' },
  { codigo: 'K02.0', descripcion: 'Caries limitada al esmalte (Mancha blanca / Fosa y fisura)', categoria: 'Caries' },
  { codigo: 'K02.1', descripcion: 'Caries de la dentina (Cavitaria activa)', categoria: 'Caries' },
  { codigo: 'K02.2', descripcion: 'Caries del cemento / Radicular', categoria: 'Caries' },
  { codigo: 'K02.3', descripcion: 'Caries dentaria detenida / Inactiva', categoria: 'Caries' },
  { codigo: 'K02.8', descripcion: 'Otras caries dentales especificadas', categoria: 'Caries' },
  { codigo: 'K03.0', descripcion: 'Desgaste excesivo de los dientes (Atrición / Abrasión / Erosión)', categoria: 'Patología Dental' },
  { codigo: 'K03.1', descripcion: 'Abrasión de los dientes (Cepillado / Trauma mecánico)', categoria: 'Patología Dental' },
  { codigo: 'K03.2', descripcion: 'Erosión de los dientes (Ácida / Química)', categoria: 'Patología Dental' },
  { codigo: 'K03.81', descripcion: 'Fractura del diente / Traumatismo dental', categoria: 'Patología Dental' },
  { codigo: 'K04.0', descripcion: 'Pulpitis (Reversible / Irreversible)', categoria: 'Pulpa y Periapical' },
  { codigo: 'K04.1', descripcion: 'Necrosis de la pulpa', categoria: 'Pulpa y Periapical' },
  { codigo: 'K04.5', descripcion: 'Periodontitis apical crónica / Lesión periapical', categoria: 'Pulpa y Periapical' },
  { codigo: 'K04.6', descripcion: 'Absceso periapical con fístula', categoria: 'Pulpa y Periapical' },
  { codigo: 'K04.7', descripcion: 'Absceso periapical sin fístula', categoria: 'Pulpa y Periapical' },
  { codigo: 'K05.0', descripcion: 'Gingivitis aguda', categoria: 'Periodonto' },
  { codigo: 'K05.1', descripcion: 'Gingivitis crónica (Placa bacteriana)', categoria: 'Periodonto' },
  { codigo: 'K05.2', descripcion: 'Periodontitis aguda', categoria: 'Periodonto' },
  { codigo: 'K05.3', descripcion: 'Periodontitis crónica (Leve / Moderada / Severa)', categoria: 'Periodonto' },
  { codigo: 'K06.0', descripcion: 'Recesión gingival (Marginal / Lesión en encía)', categoria: 'Periodonto' },
  { codigo: 'K08.0', descripcion: 'Pérdida de dientes por traumatismo / accidente', categoria: 'Pérdida de Piezas' },
  { codigo: 'K08.1', descripcion: 'Pérdida de dientes por enfermedad periodontal o caries', categoria: 'Pérdida de Piezas' },
  { codigo: 'K08.3', descripcion: 'Raíz dental retenida / Resto radicular', categoria: 'Restos Radiculares' },
  { codigo: 'Z01.2', descripcion: 'Examen de rutina / Evaluación odontológica preventiva', categoria: 'Preventivo' }
];

/** Catálogo Completo CUPS RIPS Odontológico (Clasificación Única de Procedimientos en Salud - Colombia) */
export const CATALOGO_CUPS_ODONTOLOGICO: CupsItem[] = [
  // ── ENDODONCIA ──
  { codigo: '237101', descripcion: 'PULPOTOMÍA NCOC', categoria: 'Endodoncia' },
  { codigo: '237102', descripcion: 'PULPOTOMÍA CON PULPECTOMIA', categoria: 'Endodoncia' },
  { codigo: '237200', descripcion: 'APEXIFICACIÓN O APEXOGENESIS', categoria: 'Endodoncia' },
  { codigo: '237301', descripcion: 'TERAPIA DE CONDUCTO RADICULAR EN DIENTES UNIRRADICULARES PERMANENTES', categoria: 'Endodoncia' },
  { codigo: '237302', descripcion: 'TERAPIA DE CONDUCTO RADICULAR EN DIENTES BIRRADICULARES PERMANENTES', categoria: 'Endodoncia' },
  { codigo: '237303', descripcion: 'TERAPIA DE CONDUCTO RADICULAR EN DIENTES MULTIRRADICULARES PERMANENTES', categoria: 'Endodoncia' },
  { codigo: '237304', descripcion: 'TERAPIA DE CONDUCTO RADICULAR EN DIENTES TEMPORALES, UNIRRADICULARES', categoria: 'Endodoncia' },
  { codigo: '237305', descripcion: 'TERAPIA DE CONDUCTO RADICULAR EN DIENTES TEMPORALES, MULTIRRADICULARES', categoria: 'Endodoncia' },
  { codigo: '237501', descripcion: 'PROCEDIMIENTO CORRECTIVO EN RESORCION RADICULAR (INTERNA Y EXTERNA)', categoria: 'Endodoncia' },
  { codigo: '237503', descripcion: 'RECUBRIMIENTO PULPAR DIRECTO', categoria: 'Endodoncia' },
  { codigo: '237504', descripcion: 'RECUBRIMIENTO PULPAR INDIRECTO', categoria: 'Endodoncia' },
  { codigo: '237505', descripcion: 'PRUEBAS DE VITALIDAD PULPAR', categoria: 'Endodoncia' },

  // ── OPERATORIA ──
  { codigo: '232100', descripcion: 'OBTURACION DENTAL SOD', categoria: 'Operatoria' },
  { codigo: '232101', descripcion: 'OBTURACION DENTAL CON AMALGAMA', categoria: 'Operatoria' },
  { codigo: '232102', descripcion: 'OBTURACION DENTAL CON RESINA DE FOTOCURADO', categoria: 'Operatoria' },
  { codigo: '232103', descripcion: 'OBTURACION DENTAL CON IONOMERO DE VIDRIO', categoria: 'Operatoria' },
  { codigo: '232200', descripcion: 'OBTURACION TEMPORAL POR DIENTE SOD', categoria: 'Operatoria' },
  { codigo: '232300', descripcion: 'COLOCACION DE PIN MILIMETRICO SOD', categoria: 'Operatoria' },
  { codigo: '232400', descripcion: 'RECONSTRUCCION DENTAL SOD', categoria: 'Operatoria' },
  { codigo: '232401', descripcion: 'RECONSTRUCCION DE ANGULO INCISAL, CON RESINA DE FOTOCURADO', categoria: 'Operatoria' },
  { codigo: '232402', descripcion: 'RECONSTRUCCION TERCIO INCISAL, CON RESINA DE FOTOCURADO', categoria: 'Operatoria' },
  { codigo: '233100', descripcion: 'RESTAURACION DE DIENTES MEDIANTE INCRUSTACION METALICA SOD', categoria: 'Operatoria' },
  { codigo: '233200', descripcion: 'RESTAURACION DE DIENTES MEDIANTE INCRUSTACION NO METALICA SOD', categoria: 'Operatoria' },
  { codigo: '234100', descripcion: 'COLOCACION O APLICACION DE CORONA SOD', categoria: 'Operatoria' },
  { codigo: '234101', descripcion: 'COLOCACION O APLICACION DE CORONA EN ACERO INOXIDABLE (PARA DIENTES TEMPORALES)', categoria: 'Operatoria' },
  { codigo: '234102', descripcion: 'COLOCACION O APLICACION DE CORONA EN POLICARBOXILATO (PARA DIENTES TEMPORALES)', categoria: 'Operatoria' },
  { codigo: '234103', descripcion: 'COLOCACION O APLICACION DE CORONA EN FORMA PLASTICA', categoria: 'Operatoria' },
  { codigo: '234104', descripcion: 'COLOCACION O APLICACION DE CORONA ACRILICA TERMOCURADA', categoria: 'Operatoria' },
  { codigo: '237901', descripcion: 'BLANQUEAMIENTO DENTAL [INTRINSECO] POR CAUSAS ENDODONTICAS (POR DIENTE)', categoria: 'Operatoria' },

  // ── ORTOPEDIA, ORTODONCIA Y OTROS ──
  { codigo: '247100', descripcion: 'COLOCACION DE APARATOLOGIA FIJA PARA ORTODONCIA (ARCADA) SOD', categoria: 'Ortodoncia' },
  { codigo: '247201', descripcion: 'COLOCACION DE APARATOLOGIA REMOVIBLE INTRAORAL PARA ORTODONCIA (ARCADA)', categoria: 'Ortodoncia' },
  { codigo: '247202', descripcion: 'COLOCACION DE APARATOLOGIA REMOVIBLE EXTRAORAL PARA ORTODONCIA (ARCADA)', categoria: 'Ortodoncia' },
  { codigo: '247300', descripcion: 'COLOCACION DE APARATOS DE RETENCION SOD', categoria: 'Ortodoncia' },
  { codigo: '248100', descripcion: 'CIERRE DE DIASTEMA (ALVEOLAR, DENTAL)', categoria: 'Ortodoncia' },
  { codigo: '248200', descripcion: 'AJUSTAMIENTO OCLUSAL', categoria: 'Ortodoncia' },
  { codigo: '248400', descripcion: 'REPARACIÓN DE APARATOLOGIA FIJA O REMOVIBLE', categoria: 'Ortodoncia' },
  { codigo: '248800', descripcion: 'MASCARA FACIAL TERAPEUTICA NCOC', categoria: 'Ortodoncia' },
  { codigo: '893106', descripcion: 'CONTROL DE ORTODONCIA FIJA, REMOVIBLE O TRATAMIENTO ORTOPÉDICO FUNCIONAL Y MECANICO', categoria: 'Ortodoncia' },
  { codigo: '893107', descripcion: 'ELABORACIÓN Y ADAPTACIÓN DE APARATO ORTOPEDICO', categoria: 'Ortodoncia' },
  { codigo: '893108', descripcion: 'SESION DE CONTROL DE CRECIMIENTO Y DESARROLLO DENTO-MAXILOFACIAL', categoria: 'Ortodoncia' },
  { codigo: '935500', descripcion: 'APLICACIÓN DE ALAMBRE DENTAL', categoria: 'Ortodoncia' },
  { codigo: '973400', descripcion: 'EXTRACCION DE APARATOLOGIA ORTODONTICA FIJA', categoria: 'Ortodoncia' },

  // ── PERIODONCIA, CIRUGÍA ORAL Y MAXILOFACIAL ──
  { codigo: '230101', descripcion: 'EXODONCIA DE DIENTES PERMANENTES UNIRRADICULARES', categoria: 'Cirugía Oral' },
  { codigo: '230102', descripcion: 'EXODONCIA DE DIENTES PERMANENTES MULTIRRADICULARES', categoria: 'Cirugía Oral' },
  { codigo: '230201', descripcion: 'EXODONCIA DE DIENTES TEMPORALES UNIRRADICULARES', categoria: 'Cirugía Oral' },
  { codigo: '230202', descripcion: 'EXODONCIA DE DIENTES TEMPORALES MULTIRRADICULARES', categoria: 'Cirugía Oral' },
  { codigo: '231100', descripcion: 'EXODONCIA QUIRURGICA UNIRRADICULAR', categoria: 'Cirugía Oral' },
  { codigo: '231200', descripcion: 'EXODONCIA QUIRURGICA MULTIRRADICULAR', categoria: 'Cirugía Oral' },
  { codigo: '231301', descripcion: 'EXODONCIA DE DIENTE INCLUIDO', categoria: 'Cirugía Oral' },
  { codigo: '231302', descripcion: 'EXODONCIA DE INCLUIDOS EN POSICIÓN ECTÓPICA CON ABORDAJE INTRAORAL (POR DIENTE)', categoria: 'Cirugía Oral' },
  { codigo: '231303', descripcion: 'EXODONCIA DE INCLUIDOS EN POSICIÓN ECTÓPICA CON ABORDAJE EXTRAORAL (POR DIENTE)', categoria: 'Cirugía Oral' },
  { codigo: '231400', descripcion: 'EXODONCIAS MÚLTIPLES CON ALVEOLOPLASTIA, POR CUADRANTE', categoria: 'Cirugía Oral' },
  { codigo: '231500', descripcion: 'COLGAJO DESPLAZADO PARA ABORDAJE DE DIENTE RETENIDO (VENTANA QUIRURGICA)', categoria: 'Cirugía Oral' },
  { codigo: '236300', descripcion: 'IMPLANTE DENTAL ALOPLASTICO (OSEOINTEGRACION)', categoria: 'Implantología' },
  { codigo: '237401', descripcion: 'CURETAJE APICAL CON APICECTOMIA Y OBTURACION RETROGADA [CIRUGIA PERIRRADICULAR]', categoria: 'Cirugía Oral' },
  { codigo: '237601', descripcion: 'FISTULIZACION QUIRURGICA POR TREPANACION Y DRENAJE', categoria: 'Cirugía Oral' },
  { codigo: '237602', descripcion: 'FISTULIZACION QUIRURGICA POR INCISION', categoria: 'Cirugía Oral' },
  { codigo: '242204', descripcion: 'AUMENTO DE REBORDE PARCIALMENTE EDENTULO (SIN MATERIAL)', categoria: 'Periodoncia' },
  { codigo: '242205', descripcion: 'AUMENTO DE REBORDE PARCIALMENTE EDENTULO (CON MATERIAL)', categoria: 'Periodoncia' },
  { codigo: '242300', descripcion: 'PLASTIAS PREPROTESICAS (AUMENTO DE CORONA CLINICA)', categoria: 'Periodoncia' },
  { codigo: '242400', descripcion: 'REPARACION O PLASTIA PERIODONTAL REGENERATIVA (INJERTOS, MEMBRANAS)', categoria: 'Periodoncia' },
  { codigo: '243101', descripcion: 'EXTIRPACIÓN DE LESIÓN BENIGNA ENCAPSULADA EN ENCÍA HASTA DE TRES CENTÍMETROS', categoria: 'Cirugía Oral' },
  { codigo: '243400', descripcion: 'GINGIVECTOMIA', categoria: 'Periodoncia' },
  { codigo: '244101', descripcion: 'ENUCLEACIÓN DE QUISTE (ODONTOGÉNICO O NO ODONTOGÉNICO) HASTA DE TRES CENTÍMETROS DE DIÁMETRO', categoria: 'Cirugía Oral' },
  { codigo: '244102', descripcion: 'ENUCLEACIÓN DE QUISTE (ODONTOGÉNICO O NO ODONTOGÉNICO) DE MÁS DE TRES CENTÍMETROS DE DIÁMETRO', categoria: 'Cirugía Oral' },
  { codigo: '244103', descripcion: 'RESECCIÓN DE TUMOR BENIGNO O MALIGNO ODONTOGÉNICO', categoria: 'Cirugía Oral' },
  { codigo: '245100', descripcion: 'REGULARIZACIÓN DE REBORDES POR CUADRANTE', categoria: 'Cirugía Oral' },
  { codigo: '245200', descripcion: 'ALVEOLECTOMÍA (INTERRADICULAR, INTRASEPTAL, RADICAL, SIMPLE, CON INJERTO O IMPLANTE) NCOC', categoria: 'Cirugía Oral' },
  { codigo: '247401', descripcion: 'FERULIZACION RIGIDA (SUPERIOR Y/O INFERIOR)', categoria: 'Cirugía Oral' },
  { codigo: '247402', descripcion: 'FERULIZACION SEMIRIGIDA (SUPERIOR Y/O INFERIOR)', categoria: 'Cirugía Oral' },
  { codigo: '249101', descripcion: 'CONTROL DE HEMORRAGIA DENTAL POS QUIRURGICA', categoria: 'Cirugía Oral' },
  { codigo: '250201', descripcion: 'BIOPSIA EN CUÑA O POR TRUCUT DE LENGUA', categoria: 'Cirugía Oral' },
  { codigo: '251000', descripcion: 'RESECCIÓN DE LESIÓN SUPERFICIAL EN LA LENGUA', categoria: 'Cirugía Oral' },
  { codigo: '255100', descripcion: 'SUTURA DE LACERACIÓN DE LENGUA (GLOSORRAFIA)', categoria: 'Cirugía Oral' },
  { codigo: '261201', descripcion: 'BIOPSIA ESCISIONAL DE GLANDULA SALIVAR MENOR (CON CONDUCTO SALIVAL)', categoria: 'Cirugía Oral' },
  { codigo: '262901', descripcion: 'RESECCIÓN DE MUCOCELE DE GLANDULA SALIVAL', categoria: 'Cirugía Oral' },
  { codigo: '272301', descripcion: 'BIOPSIA INCISIONAL DE LABIO', categoria: 'Cirugía Oral' },
  { codigo: '272302', descripcion: 'BIOPSIA ESCISIONAL DE LABIO', categoria: 'Cirugía Oral' },
  { codigo: '274100', descripcion: 'FRENILLECTOMIA LABIAL NCOC', categoria: 'Cirugía Oral' },
  { codigo: '274301', descripcion: 'RESECCIÓN DE LESIÓN BENIGNA DE LA MUCOSA ORAL, HASTA DE DOS CENTIMETROS DE DIAMETRO', categoria: 'Cirugía Oral' },
  { codigo: '274302', descripcion: 'RESECCIÓN DE LESIÓN BENIGNA DE LA MUCOSA ORAL, MAYOR DE DOS CENTIMETROS DE DIAMETRO', categoria: 'Cirugía Oral' },
  { codigo: '274901', descripcion: 'REMOCIÓN DE CUERPO EXTRAÑO EN TEJIDOS BLANDOS DE LA BOCA', categoria: 'Cirugía Oral' },
  { codigo: '274902', descripcion: 'RESECCION DE BRIDAS INTRAORALES', categoria: 'Cirugía Oral' },
  { codigo: '275101', descripcion: 'SUTURA O REPARACIÓN DE HERIDA HASTA DE CINCO CENTÍMETROS EN LABIOS', categoria: 'Cirugía Oral' },
  { codigo: '275102', descripcion: 'SUTURA O REPARACIÓN DE HERIDA DE MÁS DE CINCO CENTÍMETROS EN LABIOS', categoria: 'Cirugía Oral' },
  { codigo: '275801', descripcion: 'PROFUNDIZACION O DESCENSO DE PISO DE BOCA CON DESINSERCION DE MILOHIODEO Y/O GENIHIODEO', categoria: 'Cirugía Oral' },
  { codigo: '275901', descripcion: 'PROFUNDIZACION DE SURCO VESTIBULAR CON INJERTO MUCOSO', categoria: 'Cirugía Oral' },
  { codigo: '767705', descripcion: 'REDUCCION Y FIJACION DE LUXACION DENTOALVEOLAR QUE COMPROMETE HASTA TRES DIENTES', categoria: 'Cirugía Oral' },
  { codigo: '767706', descripcion: 'REDUCCION Y FIJACION DE LUXACION DENTO ALVEOLAR QUE COMPROMETE MAS DE TRES DIENTES', categoria: 'Cirugía Oral' },
  { codigo: '240200', descripcion: 'DETARTRAJE SUBGINGIVAL (POR CUADRANTE)', categoria: 'Periodoncia' },
  { codigo: '240300', descripcion: 'ALISADO RADICULAR, CAMPO CERRADO (POR SEXTANTE)', categoria: 'Periodoncia' },
  { codigo: '242201', descripcion: 'CURETAJE A CAMPO ABIERTO POR SEXTANTE', categoria: 'Periodoncia' },
  { codigo: '227101', descripcion: 'REPARACION DE FISTULA OROANTRAL Y/U ORONASAL', categoria: 'Cirugía Oral' },
  { codigo: '227200', descripcion: 'ELEVACION DEL PISO DEL SENO MAXILAR', categoria: 'Cirugía Oral' },
  { codigo: '235100', descripcion: 'REIMPLANTE DE DIENTE', categoria: 'Cirugía Oral' },
  { codigo: '235200', descripcion: 'TRANSPLANTE DE DIENTE (INTENCIONAL)', categoria: 'Cirugía Oral' },
  { codigo: '237701', descripcion: 'RADECTOMIA (AMPUTACIÓN RADICULAR) UNICA', categoria: 'Cirugía Oral' },
  { codigo: '237702', descripcion: 'RADECTOMIA (AMPUTACIÓN RADICULAR) MULTIPLE', categoria: 'Cirugía Oral' },
  { codigo: '237800', descripcion: 'HEMISECCION DEL DIENTE', categoria: 'Cirugía Oral' },
  { codigo: '237902', descripcion: 'EXPLORACION Y MOVILIZACION DE NERVIO DENTARIO INFERIOR', categoria: 'Cirugía Oral' },
  { codigo: '240100', descripcion: 'OPERCULECTOMÍA NCOC', categoria: 'Periodoncia' },
  { codigo: '240600', descripcion: 'DRENAJE DE ABSCESOS PERIODONTALES', categoria: 'Periodoncia' },
  { codigo: '241101', descripcion: 'BIOPSIA INCISIONAL DE ENCÍA', categoria: 'Cirugía Oral' },
  { codigo: '241102', descripcion: 'BIOPSIA ESCISIONAL DE ENCÍA CON CIERRE PRIMARIO', categoria: 'Cirugía Oral' },
  { codigo: '241103', descripcion: 'BIOPSIA ESCISIONAL DE ENCÍA Y RECUBRIMIENTO CON COLGAJO O INJERTO', categoria: 'Cirugía Oral' },
  { codigo: '241200', descripcion: 'BIOPSIA DE ALVEÓLO', categoria: 'Cirugía Oral' },
  { codigo: '242101', descripcion: 'PLASTIA MUCOGINGIVAL CON INJERTOS PEDICULADOS (COLGAJOS PEDICULADOS)', categoria: 'Periodoncia' },
  { codigo: '242102', descripcion: 'PLASTIA MUCOGINGIVAL CON INJERTO GINGIVAL LIBRE (CADA DIENTE)', categoria: 'Periodoncia' },
  { codigo: '242202', descripcion: 'CIRUGIA A COLGAJO CON RESECCION RADICULAR (AMPUTACION, HEMISECCION)', categoria: 'Periodoncia' },
  { codigo: '243102', descripcion: 'EXTIRPACIÓN DE LESIÓN BENIGNA ENCAPSULADA EN ENCÍA DE MÁS DE TRES CENTÍMETROS', categoria: 'Cirugía Oral' },
  { codigo: '243103', descripcion: 'EXTIRPACIÓN DE LESIÓN BENIGNA NO ENCAPSULADA EN ENCÍA HASTA DE TRES CENTÍMETROS', categoria: 'Cirugía Oral' },
  { codigo: '243104', descripcion: 'EXTIRPACIÓN DE LESIÓN BENIGNA NO ENCAPSULADA EN ENCÍA DE MÁS DE TRES CENTÍMETROS', categoria: 'Cirugía Oral' },
  { codigo: '243201', descripcion: 'SUTURA DE LACERACIÓN DE ENCÍA, MENOR DE TRES CENTIMETROS', categoria: 'Cirugía Oral' },
  { codigo: '243202', descripcion: 'SUTURA DE LACERACIÓN DE ENCÍA, MAYOR DE TRES CENTIMETROS', categoria: 'Cirugía Oral' },
  { codigo: '243301', descripcion: 'ENUCLEACIÓN DE QUISTE EPIDERMOIDE, VÍA INTRAORAL', categoria: 'Cirugía Oral' },
  { codigo: '244108', descripcion: 'MARSUPIALIZACION DE QUISTE ODONTOGÉNICO O NO ODONTOGENICO', categoria: 'Cirugía Oral' },
  { codigo: '250100', descripcion: 'BIOPSIA CERRADA [PUNCION] [ASPIRACION CON AGUJA FINA] DE LENGUA', categoria: 'Cirugía Oral' },
  { codigo: '250202', descripcion: 'BIOPSIA INCISIONAL DE LENGUA', categoria: 'Cirugía Oral' },
  { codigo: '250203', descripcion: 'BIOPSIA ESCISIONAL DE LENGUA', categoria: 'Cirugía Oral' },
  { codigo: '251100', descripcion: 'RESECCIÓN DE LESIÓN PROFUNDA EN LA LENGUA', categoria: 'Cirugía Oral' },
  { codigo: '256100', descripcion: 'FRENILLECTOMÍA LINGUAL NCOC', categoria: 'Cirugía Oral' },
  { codigo: '260100', descripcion: 'SIALOLITOTOMÍA', categoria: 'Cirugía Oral' },
  { codigo: '260300', descripcion: 'DRENAJE DE GLÁNDULA SALIVAL', categoria: 'Cirugía Oral' },
  { codigo: '262101', descripcion: 'MARSUPIALIZACIÓN DE LA RÁNULA', categoria: 'Cirugía Oral' },
  { codigo: '263206', descripcion: 'SIALOADENECTOMIA DE GLANDULAS SALIVALES MENORES', categoria: 'Cirugía Oral' },
  { codigo: '270101', descripcion: 'INCISIÓN Y DRENAJE INTRAORAL EN CAVIDAD BUCAL', categoria: 'Cirugía Oral' },
  { codigo: '270102', descripcion: 'INCISIÓN Y DRENAJE EXTRAORAL EN CAVIDAD BUCAL', categoria: 'Cirugía Oral' },
  { codigo: '272101', descripcion: 'BIOPSIA DE UVULA', categoria: 'Cirugía Oral' },
  { codigo: '272102', descripcion: 'BIOPSIA INCISIONAL DE PALADAR', categoria: 'Cirugía Oral' },
  { codigo: '272103', descripcion: 'BIOPSIA ESCISIONAL DE PALADAR', categoria: 'Cirugía Oral' },
  { codigo: '272401', descripcion: 'BIOPSIA DE PARED DE CAVIDAD BUCAL, INCISIONAL O ESCISIONAL', categoria: 'Cirugía Oral' },
  { codigo: '272402', descripcion: 'BIOPSIA POR ASPIRACION CON AGUJA FINA EN CAVIDAD ORAL [BACAF]', categoria: 'Cirugía Oral' },
  { codigo: '273101', descripcion: 'EXTIRPACIÓN DE LESIÓN SUPERFICIAL DE PALADAR', categoria: 'Cirugía Oral' },
  { codigo: '273201', descripcion: 'EXTIRPACIÓN DE LESIÓN PROFUNDA DE PALADAR', categoria: 'Cirugía Oral' },
  { codigo: '275201', descripcion: 'ESTOMATORRAFIA (SUTURA DE HERIDA EN MUCOSA ORAL) DE MENOS DE CINCO CENTIMETROS', categoria: 'Cirugía Oral' },
  { codigo: '275202', descripcion: 'ESTOMATORRAFIA (SUTURA DE HERIDA EN MUCOSA ORAL) DE MAS DE CINCO CENTIMETROS', categoria: 'Cirugía Oral' },
  { codigo: '275301', descripcion: 'RESECCIÓN INTRAORAL DE FÍSTULA DE BOCA', categoria: 'Cirugía Oral' },
  { codigo: '275302', descripcion: 'RESECCIÓN EXTRAORAL DE FÍSTULA DE BOCA', categoria: 'Cirugía Oral' },
  { codigo: '275303', descripcion: 'CIERRE DE FÍSTULA OROSINUSAL U ORONASAL, CON COLGAJO PALATINO, LINGUAL O BUCAL', categoria: 'Cirugía Oral' },
  { codigo: '275304', descripcion: 'CIERRE DE FÍSTULA OROSINUSAL CON SINUSOTOMIA, CON O SIN REMOCIÓN DE CUERPO EXTRAÑO O COLGAJO PALATINO, LINGUAL O BUCAL', categoria: 'Cirugía Oral' },
  { codigo: '276201', descripcion: 'CORRECCION DE HENDIDURA ALVEOLOPALATINA', categoria: 'Cirugía Oral' },
  { codigo: '276202', descripcion: 'CIERRE DE HENDIDURA ALVEOLAR CON INJERTO', categoria: 'Cirugía Oral' },
  { codigo: '276203', descripcion: 'CIERRE DE HENDIDURA ALVEOLAR SIN INJERTO', categoria: 'Cirugía Oral' },
  { codigo: '276300', descripcion: 'REVISIÓN DE REPARACIÓN DE PALADAR FISURADO NCOC', categoria: 'Cirugía Oral' },
  { codigo: '278200', descripcion: 'INCISIÓN DE CAVIDAD BUCAL, ESTRUCTURA NO ESPECIFICADA', categoria: 'Cirugía Oral' },
  { codigo: '768110', descripcion: 'INJERTO ÓSEO AUTÓLOGO POR REBORDE ALVEOLAR', categoria: 'Cirugía Oral' },
  { codigo: '768111', descripcion: 'INJERTO ÓSEO HETEROLOGO POR REBORDE ALVEOLAR', categoria: 'Cirugía Oral' },
  { codigo: '768301', descripcion: 'REDUCCION CERRADA LUXACION ARTICULACION TEMPORO MANDIBULAR', categoria: 'Cirugía Oral' },
  { codigo: '768302', descripcion: 'REDUCCION CERRADA LUXACION ARTICULACION TEMPORO MANDIBULAR CON FIJACION INTERMAXILAR', categoria: 'Cirugía Oral' },
  { codigo: '768702', descripcion: 'RETIRO DE CERCLAJE INTER O INTRA MAXILAR', categoria: 'Cirugía Oral' },
  { codigo: '973300', descripcion: 'EXTRACCION DE FERULAS DENTALES', categoria: 'Cirugía Oral' },
  { codigo: '973600', descripcion: 'EXTRACCION DE OTRO DISPOSITIVO', categoria: 'Cirugía Oral' },
  { codigo: '243105', descripcion: 'EXTIRPACIÓN DE LESIÓN MALIGNA DE ENCÍA SIN VACIAMIENTO GANGLIONAR NI RESECCION DE ESTRUCTURAS VECINAS U OSEAS', categoria: 'Cirugía Oral' },
  { codigo: '243302', descripcion: 'ENUCLEACIÓN DE QUISTE EPIDERMOIDE, VÍA EXTRAORAL', categoria: 'Cirugía Oral' },
  { codigo: '244104', descripcion: 'RESECCIÓN DE TUMOR BENIGNO O MALIGNO ODONTOGÉNICO Y RECONSTRUCCIÓN INMEDIATA CON INJERTO ÓSEO LIBRE', categoria: 'Cirugía Oral' },
  { codigo: '244105', descripcion: 'RESECCIÓN DE TUMOR BENIGNO O MALIGNO ODONTOGÉNICO Y RECONSTRUCCION CON COLGAJO ÓSEO PEDICULADO', categoria: 'Cirugía Oral' },
  { codigo: '244106', descripcion: 'RESECCIÓN DE TUMOR BENIGNO O MALIGNO ODONTOGÉNICO Y RECONSTRUCCION CON COLGAJO ÓSEO LIBRE', categoria: 'Cirugía Oral' },
  { codigo: '244107', descripcion: 'RESECCIÓN DE TUMOR BENIGNO O MALIGNO ODONTOGÉNICO Y RECONSTRUCCION CON PLACA', categoria: 'Cirugía Oral' },
  { codigo: '255902', descripcion: 'GLOSOPEXIA', categoria: 'Cirugía Oral' },
  { codigo: '256301', descripcion: 'DRENAJE DE ABSCESO EN LENGUA', categoria: 'Cirugía Oral' },
  { codigo: '261100', descripcion: 'BIOPSIA CERRADA [PUNCION] [ASPIRACION CON AGUJA FINA] DE GLÁNDULA O CONDUCTO SALIVAL', categoria: 'Cirugía Oral' },
  { codigo: '264901', descripcion: 'SIALOPLASTIA (REPARACIÓN DEL CONDUCTO) SIN INJERTO', categoria: 'Cirugía Oral' },
  { codigo: '264902', descripcion: 'SIALOPLASTIA (REPARACIÓN DEL CONDUCTO) CON INJERTO', categoria: 'Cirugía Oral' },

  // ── PROMOCIÓN Y PREVENCIÓN ──
  { codigo: '990103', descripcion: 'SESION EDUCATIVA GRUPAL POR ODONTOLOGIA', categoria: 'Prevención' },
  { codigo: '990203', descripcion: 'SESION EDUCATIVA INDIVIDUAL POR ODONTOLOGIA', categoria: 'Prevención' },
  { codigo: '990212', descripcion: 'SESION EDUCATIVA INDIVIDUAL, POR HIGIENE ORAL', categoria: 'Prevención' },
  { codigo: '997101', descripcion: 'APLICACIÓN DE SELLANTES DE AUTOCURADO', categoria: 'Prevención' },
  { codigo: '997102', descripcion: 'APLICACIÓN DE SELLANTES DE FOTOCURADO', categoria: 'Prevención' },
  { codigo: '997103', descripcion: 'TOPICACION DE FLUOR EN GEL', categoria: 'Prevención' },
  { codigo: '997104', descripcion: 'TOPICACION DE FLUOR EN SOLUCION', categoria: 'Prevención' },
  { codigo: '997105', descripcion: 'APLICACIÓN DE RESINA PREVENTIVA', categoria: 'Prevención' },
  { codigo: '997106', descripcion: 'APLICACIÓN DE RESINA PREVENTIVA MÁS SELLANTE', categoria: 'Prevención' },
  { codigo: '997300', descripcion: 'CONTROL DE PLACA DENTAL NCOC', categoria: 'Prevención' },
  { codigo: '997301', descripcion: 'DETARTRAJE SUPRAGINGIVAL', categoria: 'Prevención' },
  { codigo: '997500', descripcion: 'PROFILAXIS DENTAL', categoria: 'Prevención' },

  // ── PRÓTESIS Y REHABILITACIÓN ──
  { codigo: '234201', descripcion: 'COLOCACION O INSERCIÓN DE PRÓTESIS FIJA CADA UNIDAD (PILAR Y PÓNTICOS)', categoria: 'Prótesis' },
  { codigo: '234202', descripcion: 'RECONSTRUCCIÓN DE MUÑONES', categoria: 'Prótesis' },
  { codigo: '234203', descripcion: 'PERNO O PATRÓN DE NÚCLEO', categoria: 'Prótesis' },
  { codigo: '234204', descripcion: 'REPARACION DE PROTESIS FIJA', categoria: 'Prótesis' },
  { codigo: '234301', descripcion: 'COLOCACION O INSERCIÓN DE PRÓTESIS REMOVIBLE (SUPERIOR O INFERIOR) MUCOSOPORTADA', categoria: 'Prótesis' },
  { codigo: '234302', descripcion: 'COLOCACION O INSERCIÓN DE PRÓTESIS REMOVIBLE (SUPERIOR O INFERIOR) DENTOMUCOSOPORTADA', categoria: 'Prótesis' },
  { codigo: '234303', descripcion: 'REPARACION DE PROTESIS REMOVIBLE', categoria: 'Prótesis' },
  { codigo: '234401', descripcion: 'COLOCACION O INSERCION DE PROTESIS TOTAL MEDIO CASO (SUPERIOR O INFERIOR)', categoria: 'Prótesis' },
  { codigo: '234402', descripcion: 'COLOCACION O INSERCIÓN DE PRÓTESIS TOTAL (SUPERIOR E INFERIOR)', categoria: 'Prótesis' },
  { codigo: '973500', descripcion: 'EXTRACCION DE PROTESIS DENTAL', categoria: 'Prótesis' },

  // ── RADIOLOGÍA Y DIAGNÓSTICO ──
  { codigo: '870001', descripcion: 'RADIOGRAFIA DE CRANEO SIMPLE', categoria: 'Radiología' },
  { codigo: '870002', descripcion: 'PERFILOGRAMA PARA CEFALOMETRIA', categoria: 'Radiología' },
  { codigo: '870003', descripcion: 'RADIOGRAFIA DE BASE DE CRANEO', categoria: 'Radiología' },
  { codigo: '870101', descripcion: 'RADIOGRAFIA DE CARA', categoria: 'Radiología' },
  { codigo: '870102', descripcion: 'RADIOGRAFIA DE ORBITAS', categoria: 'Radiología' },
  { codigo: '870104', descripcion: 'RADIOGRAFIA DE MALAR', categoria: 'Radiología' },
  { codigo: '870112', descripcion: 'RADIOGRAFIA DE MAXILAR SUPERIOR', categoria: 'Radiología' },
  { codigo: '870113', descripcion: 'RADIOGRAFIA DE MAXILAR INFERIOR', categoria: 'Radiología' },
  { codigo: '870114', descripcion: 'RADIOGRAFIA PANORAMICA DE MAXILARES, SUPERIOR E INFERIOR (ORTOPANTOMOGRAFIA)', categoria: 'Radiología' },
  { codigo: '870120', descripcion: 'RADIOGRAFIA SUBMENTONIANA-VERTICAL', categoria: 'Radiología' },
  { codigo: '870130', descripcion: 'RADIOGRAFIA DE PERFIL DE CARA', categoria: 'Radiología' },
  { codigo: '870131', descripcion: 'RADIOGRAFIA DE ARTICULACION TEMPOROMAXILAR (ATM)', categoria: 'Radiología' },
  { codigo: '870440', descripcion: 'RADIOGRAFIAS INTRAORALES OCLUSALES', categoria: 'Radiología' },
  { codigo: '870450', descripcion: 'RADIOGRAFIAS INTRAORALES PERIAPICALES MILIMETRADAS', categoria: 'Radiología' },
  { codigo: '870451', descripcion: 'RADIOGRAFIAS INTRAORALES PERIAPICALES DIENTES ANTERIORES SUPERIORES', categoria: 'Radiología' },
  { codigo: '870452', descripcion: 'RADIOGRAFIAS INTRAORALES PERIAPICALES DIENTES ANTERIORES INFERIORES', categoria: 'Radiología' },
  { codigo: '870453', descripcion: 'RADIOGRAFIAS INTRAORALES PERIAPICALES ZONA DE CANINOS', categoria: 'Radiología' },
  { codigo: '870454', descripcion: 'RADIOGRAFIAS INTRAORALES PERIAPICALES PREMOLARES', categoria: 'Radiología' },
  { codigo: '870455', descripcion: 'RADIOGRAFIAS INTRAORALES PERIAPICALES MOLARES', categoria: 'Radiología' },
  { codigo: '870456', descripcion: 'RADIOGRAFIAS INTRAORALES PERIAPICALES JUEGO COMPLETO', categoria: 'Radiología' },
  { codigo: '870460', descripcion: 'RADIOGRAFIAS INTRAORALES CORONALES', categoria: 'Radiología' },

  // ── CONSULTAS E HISTORIA CLÍNICA ──
  { codigo: '890203', descripcion: 'CONSULTA DE PRIMERA VEZ POR ODONTOLOGIA GENERAL', categoria: 'Consultas' },
  { codigo: '890204', descripcion: 'CONSULTA DE PRIMERA VEZ ODONTOLOGIA ESPECIALIZADA', categoria: 'Consultas' },
  { codigo: '890303', descripcion: 'CONSULTA DE CONTROL O DE SEGUIMIENTO DE PROGRAMA POR ODONTOLOGIA GENERAL', categoria: 'Consultas' },
  { codigo: '890304', descripcion: 'CONSULTA DE CONTROL O SEGUIMIENTO DE PROGRAMA POR ODONTOLOGIA ESPECIALIZADA', categoria: 'Consultas' },
  { codigo: '890401', descripcion: 'INTERCONSULTA AMBULATORIA', categoria: 'Consultas' },
  { codigo: '890402', descripcion: 'INTERCONSULTA INTRAHOSPITALARIA', categoria: 'Consultas' },
  { codigo: '890503', descripcion: 'PARTICIPACION EN JUNTA MEDICA, POR OTRO PROFESIONAL DE LA SALUD', categoria: 'Consultas' },
  { codigo: '893100', descripcion: 'EXAMEN O RECONOCIMIENTO DE MUCOSA ORAL Y PERIODONTAL', categoria: 'Consultas' },
  { codigo: '893101', descripcion: 'IMPRESION DE ARCO DENTARIO SUPERIOR O INFERIOR, CON MODELO DE ESTUDIO Y CONCEPTO', categoria: 'Consultas' },
  { codigo: '893102', descripcion: 'FOTOGRAFIA CLINICA EXTRAORAL, INTRAORAL, FRONTAL O LATERAL', categoria: 'Consultas' },
  { codigo: '893103', descripcion: 'EVALUACIÓN Y MEDICION ORTODONTICA Y ORTOPEDICA ORAL', categoria: 'Consultas' },
  { codigo: '893104', descripcion: 'ESTUDIO DE OCLUSION Y ARTICULACION TEMPOROMANDIBULAR', categoria: 'Consultas' },
  { codigo: '893105', descripcion: 'MASCARA FACIAL DIAGNOSTICA', categoria: 'Consultas' },
  { codigo: '893109', descripcion: 'ANESTESIA LOCAL NO ASOCIADA CON OTROS PROCEDIMIENTOS', categoria: 'Consultas' },

  // ── LABORATORIOS, EXÁMENES Y ANÁLISIS ──
  { codigo: '269301', descripcion: 'CATETERIZACIÓN Y SIALOMETRÍA', categoria: 'Laboratorio' },
  { codigo: '899001', descripcion: 'BIOPSIA CON COLORACION BASICA (RUTINA)', categoria: 'Laboratorio' },
  { codigo: '899204', descripcion: 'CITOLOGIA ORAL', categoria: 'Laboratorio' },
  { codigo: '901001', descripcion: 'ANTIBIOGRAMA (DISCO)', categoria: 'Laboratorio' },
  { codigo: '901004', descripcion: 'HONGOS, PRUEBAS DE SENSIBILIDAD', categoria: 'Laboratorio' },
  { codigo: '901005', descripcion: 'Mycobacterium, PRUEBAS DE SENSIBILIDAD', categoria: 'Laboratorio' },
  { codigo: '901006', descripcion: 'Neisseria gonorrhoeae, PRUEBA DE SUSCEPTIBILIDAD', categoria: 'Laboratorio' },
  { codigo: '901101', descripcion: 'COLORACIÓN ÁCIDO ALCOHOL RESISTENTE MODIFICADA Y LECTURA', categoria: 'Laboratorio' },
  { codigo: '901102', descripcion: 'COLORACIÓN DE ALBERT [LOEFFLER] Y LECTURA', categoria: 'Laboratorio' },
  { codigo: '901103', descripcion: 'COLORACIÓN DE AZUL DE METILENO Y LECTURA PARA CUALQUIER MUESTRA', categoria: 'Laboratorio' },
  { codigo: '901104', descripcion: 'COLORACIÓN DE GRAM Y LECTURA PARA CUALQUIER MUESTRA', categoria: 'Laboratorio' },
  { codigo: '901105', descripcion: 'COLORACIÓN PARA ACIDO ALCOHOL RESISTENTE [ZIELH-NIELSEN] Y LECTURA O BACILOSCOPIA', categoria: 'Laboratorio' },
  { codigo: '901111', descripcion: 'COLORACION GOMORRY PARA RETICULO', categoria: 'Laboratorio' },
  { codigo: '901112', descripcion: 'COLORACION TRICOMICO DE MASON', categoria: 'Laboratorio' },
  { codigo: '901113', descripcion: 'COLORACION DE MUCINA', categoria: 'Laboratorio' },
  { codigo: '901201', descripcion: 'Actinomyces, CULTIVO HONGOS', categoria: 'Laboratorio' },
  { codigo: '901207', descripcion: 'Corynebacterium difteriae, CULTIVO', categoria: 'Laboratorio' },
  { codigo: '901209', descripcion: 'CULTIVO DE LÍQUIDOS CORPORALES: BILIS, L.C.R, PERITONEAL, PLEURAL, ASCÍTICO, SINOVIAL, OTROS DIFERENTE A ORINA', categoria: 'Laboratorio' },
  { codigo: '901214', descripcion: 'CULTIVO PARA MICROORGANISMOS EN CUALQUIER MUESTRA DIFERENTE A MEDULA OSEA, ORINA Y HECES', categoria: 'Laboratorio' },
  { codigo: '901215', descripcion: 'CULTIVO DE ANAEROBIOS DE CUALQUIER MUESTRA DIFERENTE A MEDULA OSEA', categoria: 'Laboratorio' },
  { codigo: '901216', descripcion: 'CULTIVO ESPECIALES PARA OTROS MICROORGANISMOS', categoria: 'Laboratorio' },
  { codigo: '901217', descripcion: 'CULTIVO DE HONGOS MICOSIS PROFUNDA', categoria: 'Laboratorio' },
  { codigo: '901218', descripcion: 'CULTIVO DE HONGOS MICOSIS SUPERFICIAL', categoria: 'Laboratorio' },
  { codigo: '901219', descripcion: 'CULTIVO DE PATOGENOS FACULTATIVOS DE LESIONES ORALES', categoria: 'Laboratorio' },
  { codigo: '901220', descripcion: 'CULTIVO DE PATOGENOS DE BOLSAS PERIODONTALES', categoria: 'Laboratorio' },
  { codigo: '905730', descripcion: 'MERCURIO EN CABELLO Y SANGRE', categoria: 'Laboratorio' },
  { codigo: '905731', descripcion: 'MERCURIO EN ORINA DE 24H', categoria: 'Laboratorio' },
  { codigo: '905732', descripcion: 'PRUEBA DE SNYDER EN SALIVA', categoria: 'Laboratorio' },
  { codigo: '905733', descripcion: 'ESTUDIO SALIVAR COMPLETO', categoria: 'Laboratorio' },
  { codigo: '905734', descripcion: 'DETERMINACION DEL PH SALIVAR', categoria: 'Laboratorio' },
  { codigo: '905735', descripcion: 'DETERMINACION DE LA CAPACIDAD AMORTIGUADORA SALIVAR', categoria: 'Laboratorio' },
  { codigo: '905736', descripcion: 'TASA DE SECRECION SALIVAR', categoria: 'Laboratorio' },
  { codigo: '905737', descripcion: 'RECUENTO DE S. DEL GRUPO "MUTANS"', categoria: 'Laboratorio' },
  { codigo: '905738', descripcion: 'RECUENTO DE LACTOBACILLUS SP', categoria: 'Laboratorio' },
  { codigo: '905739', descripcion: 'RECUENTO DE CANDIDA SP', categoria: 'Laboratorio' },
  { codigo: '905740', descripcion: 'ESTUDIO DE MICROORGANISMOS CARIOGENICOS EN PLACA DENTAL', categoria: 'Laboratorio' },
  { codigo: '905741', descripcion: 'RECUENTO DE S. DEL GRUPO "MUTANS" EN PLACA DENTAL', categoria: 'Laboratorio' },
  { codigo: '905742', descripcion: 'RECUENTO DE LACTOBACILLUS SP EN PLACA DENTAL', categoria: 'Laboratorio' },
  { codigo: '905743', descripcion: 'CAPACIDAD ACIDOGENICA DE LA PLACA DENTAL', categoria: 'Laboratorio' },

  // ── URGENCIAS Y OTROS ──
  { codigo: '237502', descripcion: 'PROCEDIMIENTOS CORRECTIVOS EN FRACTURAS RADICULARES', categoria: 'Urgencias' },
  { codigo: '890703', descripcion: 'CONSULTA DE URGENCIAS, POR ODONTOLOGIA GENERAL', categoria: 'Urgencias' },
  { codigo: '890704', descripcion: 'CONSULTA DE URGENCIAS, POR ODONTOLOGIA ESPECIALIZADA', categoria: 'Urgencias' },
  { codigo: '271100', descripcion: 'DRENAJE DE ABSCESO DE PALADAR', categoria: 'Urgencias' },
  { codigo: '999991', descripcion: 'CITA NO CUMPLIDA', categoria: 'Otros' }
];
