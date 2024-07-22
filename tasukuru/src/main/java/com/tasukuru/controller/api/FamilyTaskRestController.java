package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Task;
import com.tasukuru.repository.TaskRepository;

@RestController
public class FamilyTaskRestController {
	@Autowired
	private TaskRepository repository;
	
	@GetMapping("/api/familyTask/")
	private Iterable<Task> get(){
		return repository.findAll();
	}
	
	@GetMapping("/api/familyTask/familyTaskAdd/")	
	private Task addTask(@RequestBody Task task){
		repository.save(task);
		return task;
	}

	@PostMapping("/api/familyTask/familyTaskMod/")
	private Task mod(@RequestBody Task task) {
		repository.save(task);
		return task;
	}
	
	@PostMapping("/api/familyTask/familyTaskDel/")
	private Task del(@RequestBody Task task) {
		repository.delete(task);
		return task;
	}
}
