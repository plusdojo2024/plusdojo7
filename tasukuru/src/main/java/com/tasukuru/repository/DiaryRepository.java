package com.tasukuru.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Integer> {
	//kids_idに基づいてタスクを取得するメソッド
	List<Diary> findByKidsId(int kidsId);
	public void  deleteById(Integer id);
}
