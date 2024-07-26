package com.tasukuru.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Task;

public interface FamilyTaskRepository extends JpaRepository<Task, Integer> {
	//kids_idに基づいてタスクを取得するメソッド
	List<Task> findByKidsId(int kidsId);
}
