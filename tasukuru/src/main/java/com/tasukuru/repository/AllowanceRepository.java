package com.tasukuru.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Allowance;

public interface AllowanceRepository extends JpaRepository<Allowance, Integer> {

	//IDを指定し、AllowanceEntityの情報を取得する
		public List<Allowance> findByKidsId(int Id);
		
	//IDを指定し、AllowanceEntityの情報を取得する
		public Allowance findById(int Id);
}
