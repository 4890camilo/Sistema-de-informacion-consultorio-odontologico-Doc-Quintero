package com.docquintero.consultorio.service;

import com.docquintero.consultorio.model.Role;
import com.docquintero.consultorio.model.User;
import com.docquintero.consultorio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public User assignRole(String userId, Set<Role> roles) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        user.setRoles(roles);
        return userRepository.save(user);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public User blockUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        user.setActive(false);
        return userRepository.save(user);
    }
}