package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Enemie;


public interface EnemiesRepository extends JpaRepository<Enemie, Integer> {

}