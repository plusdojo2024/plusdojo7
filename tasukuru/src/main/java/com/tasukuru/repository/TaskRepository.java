package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tasukuru.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
	//レコードを登録日時とタスク期限で並び替え
	Iterable<Task> findAllByOrderByRegtimeAscTasklimitAsc();
}

