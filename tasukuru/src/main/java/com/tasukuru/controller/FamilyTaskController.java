package com.tasukuru.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.tasukuru.entity.Task;
import com.tasukuru.repository.FamilyTaskRepository;

@Controller
public class FamilyTaskController {
	@Autowired
	private FamilyTaskRepository repository;
	
	@GetMapping("/family")
	public String index(Model model) {
		Iterable<Task>tasks = repository.findAll();
		model.addAttribute("tasks", tasks);
		return "approval";
	}
}
