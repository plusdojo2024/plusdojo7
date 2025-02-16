package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Support;

public interface SupportRepository extends JpaRepository<Support, Integer> {

	//IDを指定し、SupportEntityの情報を取得する
	public Support findById(int Id);
}
