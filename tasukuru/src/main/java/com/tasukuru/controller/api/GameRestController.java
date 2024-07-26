package com.tasukuru.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public List<Enemie> getEnemies() {
        return enemiesRepository.findAll();
    }

//    // ログインしているユーザーに関連する敵キャラクター一覧を取得するエンドポイント
//    @GetMapping("/api/game/enemies/user/{userId}")
//    public List<Enemie> getEnemiesByUserId(@PathVariable Integer userId) {
//        return enemiesRepository.findByUserId(userId);
//    }

    // 敵にダメージを与えるエンドポイント（@PostMapping を使用）
    @PostMapping("/api/game/enemies/{id}/damage/{damage}")
    public void attackEnemy(@PathVariable Integer id, @PathVariable Integer damage) {
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

    // ログインしているユーザーの情報を取得するエンドポイント
    @GetMapping("/api/kids/currentUser")
    public KidsUser getCurrentUser(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return (KidsUser) session.getAttribute("KidsUser");
    }

    // ログインしているユーザーのサイコロ数を更新するエンドポイント
    @PostMapping("/api/kids/currentUser/dice")
    public void updateDiceCount(HttpServletRequest request, @RequestBody Integer diceCount) {
        KidsUser currentUser = getCurrentUser(request);
        if (currentUser != null) {
            currentUser.setDiceCount(diceCount);
            kidsUserRepository.save(currentUser);
        }
    }
}
