//package com.tasukuru.controller.api;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.tasukuru.entity.Task;
//import com.tasukuru.repository.TaskRepository;
//
//@RestController
//public class FamilyTaskRestController {
//	@Autowired
//	private TaskRepository repository;
//	
//	@GetMapping("/api/task/")
//	private Iterable<Task> get(){
//		return repository.findAll();
//	}
//	
//	@GetMapping("/api/task/add/")
//	private Task addTask(@RequestBody Task task){
//		repository.save(task);
//		return task;
//	}
//}
