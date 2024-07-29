package com.tasukuru.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tasukuru.entity.Shop;

@Repository
public interface ShopsRepository extends JpaRepository<Shop, Integer> {
    List<Shop> findByConditionAndKidId(Boolean condition, Integer kidId);
}
