package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.FamilyUser;

public interface FamilyUserRepository extends JpaRepository<FamilyUser, String> {

}
