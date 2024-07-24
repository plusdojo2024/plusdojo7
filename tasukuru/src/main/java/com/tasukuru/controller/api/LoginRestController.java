package com.tasukuru.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class LoginRestController {
    @PostMapping("/login")
    public ResponseEntity<String> login(HttpServletRequest request) {
        String familyID = request.getParameter("familyID");
        String password = request.getParameter("password");
    }
}
