package com.tasukuru.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.KidsUser;
import com.tasukuru.entity.Task;
import com.tasukuru.repository.TaskRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class KidTaskRestController {
	@Autowired
	private TaskRepository repository;
	
	//タスク表示
	@GetMapping("/api/task/")
	private List<Task> get(HttpServletRequest request){
		HttpSession session = request.getSession();
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		if(loginUser != null) {
			int userId = loginUser.getId();
			return repository.findByKidsId(userId);
		} else {
			return List.of();
		}
		
		//System.out.println(session.getAttribute("KidsUser"));
		//return repository.findAll();
	}
	
	//タスク追加
	@PostMapping("/api/task/add/")
	private Task addTask(@RequestBody Task task){
		repository.save(task);
		return task;
	}
	
	//タスク更新
	@PostMapping("/api/task/mod/")
	private Task modTask(@RequestBody Task task) {
		repository.save(task);
		return task;
	}
	
	//タスク削除
	@PostMapping("/api/task/del/")
	private Task delTask(@RequestBody Task task) {
		repository.delete(task);
		return task;
	}
	
//	//タスク提出
//	@PostMapping("/api/task/submit/")
//	private Task submitTask(@RequestBody Task task) {
//		task.setSubmitTime(LocalDateTime.now());	//提出時間を設定
//		task.setTaskCheck(true);	//タスクを提出済みにする
//		repository.save(task);
//		return task;
//	}
//	
//	//タスク再登録*要編集
//	@PostMapping("/api/task/regist/")
//	private Task registTask(@RequestBody Task task) {
//		
//		return task;
//	}
}
