package com.tasukuru.controller.api;

import java.time.LocalDateTime;
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
	private List<Task> get(HttpServletRequest request) {
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser) session.getAttribute("KidsUser");

		if (loginUser != null) { //ここから絞り込むコード
			//ログインしているユーザーのIDを取得
			int userId = loginUser.getId();
			//ユーザーIDに一致するタスクを取得して返す
			return repository.findByKidsId(userId);
		} else {
			//ログインしていない場合、空のリストを返す
			return List.of();
		}
	}

	//タスク提出
	@PostMapping("/api/task/submit/")
	private Task submitTask(@RequestBody Task task) {
		Task existingTask = repository.findById(task.getId()).orElse(null);
		if (existingTask != null) {
			existingTask.setNoComplete(true);
			existingTask.setSubmitTime(LocalDateTime.now()); // 現在の日時を設定
			repository.save(existingTask);
			return existingTask;
		} else {
			return null;
		}
	}

	//タスク追加
	@PostMapping("/api/task/add/")
	private Task addTask(@RequestBody Task task, HttpServletRequest request) {
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser) session.getAttribute("KidsUser");

		if (loginUser != null) {
			int userId = loginUser.getId();
			//			System.out.println("ログインユーザーID：" + userId);
			task.setKidsId(userId);
		} else {
			//			System.out.println("ログインユーザーが見つかりません");
		}

		Task savedTask = repository.save(task);
		System.out.println("保存されたタスク" + savedTask);
		return task;
	}

	//タスク再登録
	@PostMapping("/api/task/rereg/")
	private Task reregTask(@RequestBody Task task, HttpServletRequest request) {
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser) session.getAttribute("KidsUser");

		if (loginUser != null) {
			int userId = loginUser.getId();
			//			System.out.println("ログインユーザーID：" + userId);
			task.setKidsId(userId);
		} else {
			System.out.println("ログインユーザーが見つかりません");
		}

		// 既存のタスクがデータベースにあるか確認
		Task existingTask = repository.findById(task.getId()).orElse(null);
		if (existingTask != null) {
			// 既存のタスクを新しい詳細で更新
			existingTask.setName(task.getName());
			existingTask.setCategoriesName(task.getCategoriesName());
			existingTask.setTaskLimit(task.getTaskLimit());
			existingTask.setContent(task.getContent());
			existingTask.setComment(task.getComment());
			existingTask.setTaskCheck(false);
			existingTask.setNoComplete(false);
			existingTask.setComplete(false);
			existingTask.setMiss(false);
			existingTask.setReviewOne(false);
			existingTask.setReviewTwo(false);
			existingTask.setReviewThree(false);
			existingTask.setRegTime(LocalDateTime.now());
			existingTask.setSubmitTime(null);
			// 更新されたタスクを保存
			repository.save(existingTask);
			return existingTask;
		} else {
			// タスクが存在しない場合の処理
			return null;
		}
	}

	//タスク削除
	@PostMapping("/api/task/del/")
	private Task delTask(@RequestBody Task task) {
		repository.delete(task);
		return task;
	}

}
