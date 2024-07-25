package com.tasukuru.controller.api;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Diary;
import com.tasukuru.repository.FamilyUserRepository;

@RestController
@CrossOrigin
public class NewAccountRestController {
    
    @Autowired
    private FamilyUserRepository repository;

    @PostMapping("/api/NewAccount/accountAdd")
	private Diary addDiary(@RequestBody Diary diary) {
		diary.setDate(new Date());
		repository.save(diary);
		return diary;
	}
}
