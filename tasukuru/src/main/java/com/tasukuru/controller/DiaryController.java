package com.tasukuru.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.tasukuru.entity.Diary;
import com.tasukuru.repository.DiaryRepository;
@Controller
public class DiaryController {
	
	@Autowired
	private DiaryRepository repository;
	
	@GetMapping("/diary")
	public String index(Model model) {
		Iterable<Diary> diary = repository.findAll();
		model.addAttribute("diary",diary);
		return "diary";
	}
}
