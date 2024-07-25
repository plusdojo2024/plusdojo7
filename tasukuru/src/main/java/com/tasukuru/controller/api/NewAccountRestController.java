package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
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
    public FamilyUser addAccount(@RequestBody FamilyUser familyUser) {
        repository.save(familyUser);
        return familyUser;
    }
}