package com.docquintero.consultorio.security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Anotación para marcar campos sensibles del dominio clínico que deben ser cifrados
 * de manera automática en el nivel de campo (Client-Side Field Level Encryption - CSFLE).
 */
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface EncryptedField {
}
