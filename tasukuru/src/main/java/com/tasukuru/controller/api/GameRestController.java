package com.tasukuru.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Enemie;
import com.tasukuru.entity.KidsUser;
import com.tasukuru.repository.EnemiesRepository;
import com.tasukuru.repository.KidsUserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class GameRestController {

    @Autowired
    private EnemiesRepository enemiesRepository;

    @Autowired
    private KidsUserRepository kidsUserRepository;

    // ゲームの敵キャラクター一覧を取得するエンドポイント
    @GetMapping("/api/game/enemies")
<<<<<<< Updated upstream
    public List<Enemie> getEnemies(HttpServletRequest request) {
        HttpSession session = request.getSession();
        KidsUser loginUser = (KidsUser) session.getAttribute("KidsUser");

        if (loginUser != null) {
            // ユーザーIDに基づいた敵キャラクターの取得（仮定のフィルタリング）
            // 実際にはログインしているユーザーに関連する敵キャラクターを取得する
            return enemiesRepository.findByUserId(loginUser.getId());
        } else {
            return null;
        }
    }

    // 敵にダメージを与えるエンドポイント
    @PostMapping("/api/game/enemies/{id}/damage/{damage}")
    public void attackEnemy(@PathVariable Integer id, @PathVariable Integer damage, HttpServletRequest request) {
        HttpSession session = request.getSession();
        KidsUser loginUser = (KidsUser) session.getAttribute("KidsUser");

        if (loginUser != null) {
            Enemie enemy = enemiesRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Enemy not found"));

            // ダメージを適用し、HPを更新
            int currentHp = enemy.getHp();
            int updatedHp = currentHp - damage;
            if (updatedHp < 0) {
                updatedHp = 0; // HPが0未満にならないようにする
            }
            enemy.setHp(updatedHp);

            // 更新したエネミーを保存
            enemiesRepository.save(enemy);
        }
=======
    public Iterable<Enemie> getEnemies() {
        return repository.findAll();
>>>>>>> Stashed changes
    }
    
    // 敵にダメージを与えるエンドポイント（@PostMapping を使用）
    @PostMapping("/api/game/enemies/{id}/attack/{damage}")
    public void attackEnemy(@PathVariable Integer id, @PathVariable Integer damage) {
        Enemie enemy = repository.findById(id)
                                 .orElseThrow(() -> new IllegalArgumentException("Enemy not found"));

        // ダメージを適用し、HPを更新
        int currentHp = enemy.getHp();
        int updatedHp = currentHp - damage;
        if (updatedHp < 0) {
            updatedHp = 0; // HPが0未満にならないようにする
        }
        enemy.setHp(updatedHp);

        // 更新したエネミーを保存
        repository.save(enemy);
    }
}
