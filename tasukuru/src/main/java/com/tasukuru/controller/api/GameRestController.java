package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Enemie;
import com.tasukuru.repository.EnemiesRepository;

@RestController
public class GameRestController {
    @Autowired
    private EnemiesRepository repository;
    
    // ゲームの敵キャラクター一覧を取得するエンドポイント
    @GetMapping("/api/game/enemies")
    private Iterable<Enemie> getEnemies() {
        return repository.findAll();
    }
}
