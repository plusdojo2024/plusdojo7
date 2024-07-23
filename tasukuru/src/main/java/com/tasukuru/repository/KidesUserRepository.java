package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.KidsUser;

public interface KidesUserRepository extends JpaRepository<KidsUser, Integer> {

	void save(int currentMoney);

}
