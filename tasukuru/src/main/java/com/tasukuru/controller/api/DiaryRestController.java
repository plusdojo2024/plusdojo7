package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Diary;
import com.tasukuru.repository.DiaryRepository;

@RestController
@CrossOrigin
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

	@PostMapping("/api/diary/mod/")
	private Diary modDiary(@RequestBody Diary diary) {
		repository.save(diary);
		return diary;
	}
	
	@PostMapping("/api/diary/del/")
	private void delDiary(@RequestBody Integer id) {
		System.out.println(id.toString());
		
		repository.deleteById(id);
		
	}
	
	public static class searchId{
		public Integer id;
	}

}