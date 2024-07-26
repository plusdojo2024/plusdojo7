package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.tasukuru.entity.Enemie;

public interface EnemiesRepository extends JpaRepository<Enemie, Integer> {

    // ユーザーIDに基づいて敵キャラクターを取得するメソッド
    List<Enemie> findByUserId(Integer userId);
}
