package com.project01.tms.controller;

import com.project01.tms.model.User;
import com.project01.tms.service.UserService;
import com.project01.tms.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "api/user")
@CrossOrigin
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        ResponseEntity<?> responseEntity = userService.save(user);
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            // User created successfully
            logger.info("User created successfully: {}", responseEntity.getBody());
        } else {
            logger.error("Error occurred while registering user: {}", responseEntity.getBody());
        }
        return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            logger.error("Error occurred while authenticating user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "Incorrect username or password"));
        }

        // No need to fetch the user details again, use the authentication principal
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final String jwt = jwtUtil.generateToken(userDetails);

        // Add role to the response
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(Object::toString)
                .orElse("");

        Map<String, String> response = new HashMap<>();
        response.put("token", jwt);
        response.put("role", role);
        response.put("message", "User authenticated successfully");

        logger.info("User authenticated successfully: {}", user.getUsername());

        return ResponseEntity.ok(response);
    }
}
