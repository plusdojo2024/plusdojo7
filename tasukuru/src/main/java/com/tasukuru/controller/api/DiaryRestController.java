package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Diary;
import com.tasukuru.repository.DiaryRepository;

@RestController
public class DiaryRestController {
	
	@Autowired
	private DiaryRepository repository;
	
	@GetMapping("/api/diary/")
	private Iterable<Diary> get() {
		return repository.findAll();
	}
	
	@GetMapping("/api/diary/add/")
	private Diary addDiary(@RequestBody Diary diary) {
		repository.save(diary);
		return diary;
	}

}
