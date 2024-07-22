package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Task;

public interface FamilyTaskRepository extends JpaRepository<Task, Integer> {

}
