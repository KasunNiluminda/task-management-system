package com.project01.tms.service;

import com.project01.tms.dto.UserDTO;
import com.project01.tms.model.User;
import com.project01.tms.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public ResponseEntity<?> save(User user) {
        // Check if user already exists with the provided username
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "Username already exists. Please choose a different username."));
        }

        // Encode the password and save the user
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(Collections.singletonMap("message", "User created successfully."));
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public String findRoleByUsername(String username) {
        // Assuming your user repository has a method to find a user by username
        User user = userRepository.findByUsername(username);

        if (user != null) {

            return user.getRole(); // Return the role of the user
        } else {
            return null; // User not found
        }
    }
}
