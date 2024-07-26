package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.repository.EnemiesRepository;

@RestController
public class GameRestController {

    @Autowired
    private EnemiesRepository enemiesRepository;

//    @Autowired
//    private KidsUserRepository kidsUserRepository;
//
//    // ゲームの敵キャラクター一覧を取得するエンドポイント
//    @GetMapping("/api/game/enemies")
//    public Enemie getEnemies(HttpServletRequest request) {
//        HttpSession session = request.getSession();
//        KidsUser loginUser = (KidsUser) session.getAttribute("KidsUser");
//
//        if (loginUser != null) {
//            // ユーザーIDに基づいた敵キャラクターの取得（仮定のフィルタリング）
//            // 実際にはログインしているユーザーに関連する敵キャラクターを取得する
//            return enemiesRepository.findByUserId(loginUser.getId());
//        } else {
//            return null;
//        }
//    }

//    // 敵にダメージを与えるエンドポイント
//    @PostMapping("/api/game/enemies/{id}/damage/{damage}")
//    public void attackEnemy(@PathVariable Integer id, @PathVariable Integer damage, HttpServletRequest request) {
//        HttpSession session = request.getSession();
//        KidsUser loginUser = (KidsUser) session.getAttribute("KidsUser");
//
//        if (loginUser != null) {
//            Enemie enemy = enemiesRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Enemy not found"));
//
//            // ダメージを適用し、HPを更新
//            int currentHp = enemy.getHp();
//            int updatedHp = currentHp - damage;
//            if (updatedHp < 0) {
//                updatedHp = 0; // HPが0未満にならないようにする
//            }
//            enemy.setHp(updatedHp);
//
//            // 更新したエネミーを保存
//            enemiesRepository.save(enemy);
//        }
//    }
}
