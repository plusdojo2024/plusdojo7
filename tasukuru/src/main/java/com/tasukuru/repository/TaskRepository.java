package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {
	//レコードを登録日時とタスク期限で並び替え
	//Iterable<Task> findAllByOrderByRegtimeAscTasklimitAsc();
}

