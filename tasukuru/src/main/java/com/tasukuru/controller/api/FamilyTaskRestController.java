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
	private Iterable<Task> get(/*HttpServletRequest request*/){
		/*HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		if(loginUser != null) {		//ここから絞り込むコード
			//ログインしているユーザーのIDを取得
			int userId = loginUser.getId();
			//ユーザーIDに一致するタスクを取得して返す
			return repository.findByKidsId(userId);
		} else {
			//ログインしていない場合、空のリストを返す
			return List.of();
		}
		
		//System.out.println(session.getAttribute("KidsUser"));
		//return repository.findAll();
		 */
		 return repository.findByKidsId(1);
	}

	
	@PostMapping("/api/familyTask/add/")	
	private Task addTask(@RequestBody Task task){
		repository.save(task);
		System.out.println("taskは" + task);
		return task;
	}

	@PostMapping("/api/familyTask/mod/")
	private Task modApproval(@RequestBody Task task) {
		System.out.print(task);
			repository.save(task);
			return task;

	}
	
	@PostMapping("/api/familyTask/del/")
	private Task del(@RequestBody Task task) {
		repository.delete(task);
		return task;
	}
}
