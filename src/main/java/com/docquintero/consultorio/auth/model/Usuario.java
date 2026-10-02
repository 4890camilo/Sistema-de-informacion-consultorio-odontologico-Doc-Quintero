package com.docquintero.consultorio.auth.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.annotation.TypeAlias;

@Document(collection = "users")
@TypeAlias("com.docquintero.consultorio.model.User")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    private String id;
    private String email;

    @JsonIgnore
    private String password;

    private String nombre;
    private Set<Rol> roles;
    private boolean active = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
