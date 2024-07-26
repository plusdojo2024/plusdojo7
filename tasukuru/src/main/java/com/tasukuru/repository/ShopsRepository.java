package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Shop;


public interface ShopsRepository extends JpaRepository<Shop, Integer> {
//	List<Shop> findByNameContaining(String keyword);
}