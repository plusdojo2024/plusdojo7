package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
}