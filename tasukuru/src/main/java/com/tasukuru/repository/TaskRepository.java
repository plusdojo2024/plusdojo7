package com.tasukuru.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {
	//kids_idに基づいてタスクを取得するメソッド
	List<Task> findByKidsId(int kidsId);
	//レコードを登録日時とタスク期限で並び替え
	//Iterable<Task> findAllByOrderByRegtimeAscTasklimitAsc();
}

