package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.Request;


public interface RequestsRepository extends JpaRepository<Request, Integer> {

}