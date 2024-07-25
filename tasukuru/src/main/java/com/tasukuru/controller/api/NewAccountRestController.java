package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.FamilyUser;
import com.tasukuru.repository.FamilyUserRepository;

@RestController
@CrossOrigin
public class NewAccountRestController {
    
    @Autowired
    private FamilyUserRepository repository;

    @PostMapping("/api/NewAccount/accountAdd/")
    public ResponseEntity<?> addAccount(@RequestBody FamilyUser familyUser) {
        FamilyUser savedUser = repository.save(familyUser);
        // 保存後に成功レスポンスを返す
        return ResponseEntity.ok("OK"); // or any success response you prefer
    }
}