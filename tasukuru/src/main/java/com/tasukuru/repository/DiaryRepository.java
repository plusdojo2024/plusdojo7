package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Integer> {

}
