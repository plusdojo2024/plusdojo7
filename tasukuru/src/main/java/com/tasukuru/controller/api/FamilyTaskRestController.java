package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Task;
import com.tasukuru.repository.FamilyTaskRepository;


@RestController
public class FamilyTaskRestController {
	@Autowired
	private FamilyTaskRepository repository;
	
	@GetMapping("/api/familyTask/")
	private Iterable<Task> get(){
		return repository.findAll();
	}
	
	@PostMapping("/api/familyTask/add/")	
	private Task addTask(@RequestBody Task task){
		repository.save(task);
		return task;
	}

	@PostMapping("/api/familyTask/mod/")
	private Task mod(@RequestBody Task task) {
		repository.save(task);
		return task;
	}
	
	@PostMapping("/api/familyTask/del/")
	private Task del(@RequestBody Task task) {
		repository.delete(task);
		return task;
	}
}
