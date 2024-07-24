package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Character;

public interface CharactersRepository extends JpaRepository<Character, Integer> {
//	@Query("SELECT COUNT(complete) FROM Tasks WHERE complete = TRUE ")
//	int countTaskComplete();
}

