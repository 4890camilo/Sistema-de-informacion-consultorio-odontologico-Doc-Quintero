package com.docquintero.consultorio.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Base64;

@Component
public class EncryptionService {

    private final SecretKeySpec secretKey;
    private static final String ALGORITHM = "AES";

    public EncryptionService(@Value("${app.security.encryption.key:DocQuinteroSecretEncryptionKey2026!}") String secret) {
        this.secretKey = prepareKey(secret);
    }

    private SecretKeySpec prepareKey(String myKey) {
        try {
            byte[] key = myKey.getBytes(StandardCharsets.UTF_8);
            MessageDigest sha = MessageDigest.getInstance("SHA-256");
            key = sha.digest(key);
            key = Arrays.copyOf(key, 16); // 128 bit AES key
            return new SecretKeySpec(key, ALGORITHM);
        } catch (Exception e) {
            throw new RuntimeException("Error preparando clave de cifrado", e);
        }
    }

    public String encrypt(String strToEncrypt) {
        if (strToEncrypt == null || strToEncrypt.isBlank()) {
            return strToEncrypt;
        }
        try {
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            return "ENC:" + Base64.getEncoder().encodeToString(cipher.doFinal(strToEncrypt.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            return strToEncrypt;
        }
    }

    public String decrypt(String strToDecrypt) {
        if (strToDecrypt == null || !strToDecrypt.startsWith("ENC:")) {
            return strToDecrypt;
        }
        try {
            String cleanStr = strToDecrypt.substring(4);
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            return new String(cipher.doFinal(Base64.getDecoder().decode(cleanStr)), StandardCharsets.UTF_8);
        } catch (Exception e) {
            return strToDecrypt;
        }
    }
}
