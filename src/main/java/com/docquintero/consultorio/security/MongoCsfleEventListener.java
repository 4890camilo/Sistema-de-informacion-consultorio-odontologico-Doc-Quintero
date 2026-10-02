package com.docquintero.consultorio.security;

import com.docquintero.consultorio.historiaclinica.model.HistoriaClinica;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.AfterConvertEvent;
import org.springframework.data.mongodb.core.mapping.event.BeforeSaveEvent;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;

/**
 * Listener de ciclo de vida de MongoDB que implementa Client-Side Field Level Encryption (CSFLE)
 * de forma transparente y automática:
 * - Antes de persistir el documento en MongoDB (BeforeSave), cifra en cliente los campos con @EncryptedField.
 * - Al recuperar y convertir el documento desde MongoDB (AfterConvert), descifra los campos automáticamente.
 *
 * De esta manera, el desarrollador NO escribe lógica manual de cifrado/descifrado en los servicios.
 */
@Component
public class MongoCsfleEventListener extends AbstractMongoEventListener<Object> {

    @Autowired
    private EncryptionService encryptionService;

    @Override
    public void onBeforeSave(BeforeSaveEvent<Object> event) {
        Document document = event.getDocument();
        Object source = event.getSource();

        if (source instanceof HistoriaClinica hc && document != null) {
            Document anamnesisDoc = (Document) document.get("anamnesis");
            if (anamnesisDoc != null && hc.getAnamnesis() != null) {
                Field[] fields = hc.getAnamnesis().getClass().getDeclaredFields();
                for (Field field : fields) {
                    if (field.isAnnotationPresent(EncryptedField.class)) {
                        String fieldName = field.getName();
                        Object val = anamnesisDoc.get(fieldName);
                        if (val instanceof String strVal) {
                            anamnesisDoc.put(fieldName, encryptionService.encrypt(strVal));
                        }
                    }
                }
            }
        }
    }

    @Override
    public void onAfterConvert(AfterConvertEvent<Object> event) {
        Object source = event.getSource();
        if (source instanceof HistoriaClinica hc && hc.getAnamnesis() != null) {
            Field[] fields = hc.getAnamnesis().getClass().getDeclaredFields();
            for (Field field : fields) {
                if (field.isAnnotationPresent(EncryptedField.class)) {
                    field.setAccessible(true);
                    try {
                        Object val = field.get(hc.getAnamnesis());
                        if (val instanceof String strVal) {
                            field.set(hc.getAnamnesis(), encryptionService.decrypt(strVal));
                        }
                    } catch (IllegalAccessException ignored) {
                    }
                }
            }
        }
    }
}
