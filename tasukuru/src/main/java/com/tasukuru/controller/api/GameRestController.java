package com.tasukuru.controller.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ReplayEnemiesAndCurrentEnemyId getEnemies() {
    	ReplayEnemiesAndCurrentEnemyId replay = new ReplayEnemiesAndCurrentEnemyId();
    	replay.enemies = enemiesRepository.findAll();
    	replay.currentEnemyId = kidsUserRepository.findById(1).getEnemieId() - 1;
    	
        return replay;
    }
    
 
    public static class ReplayEnemiesAndCurrentEnemyId{
    	public List<Enemie> enemies;
    	
    	public Integer currentEnemyId;
    }
    
 
    @GetMapping("/api/enemies/currentUser/")
	private Optional<KidsUser> get(HttpServletRequest request){
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		if(loginUser != null) {		//ここから絞り込むコード
			//ログインしているユーザーのIDを取得
			int userId = loginUser.getId();
			//ユーザーIDに一致するタスクを取得して返す
			return Optional.of(kidsUserRepository.findById(userId));
		} else {
			//ログインしていない場合、空のリストを返す
			return null;
		}
		
		//System.out.println(session.getAttribute("KidsUser"));
		//return repository.findAll();
	}


    // 敵にダメージを与えるエンドポイント（@PostMapping を使用）
    @PostMapping("/api/enemies/{id}/damage/{damage}")
    public ResponseEntity<Void> attackEnemy(@PathVariable Integer id, @PathVariable Integer damage) {
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

        System.out.println("Enemy HP updated: ID = " + id + ", New HP = " + updatedHp);
        return ResponseEntity.ok().build();
    }

    // ログインしているユーザーの情報を取得するエンドポイント
    @GetMapping("/api/kids/currentUser")
    public KidsUser getCurrentUser(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return (KidsUser) session.getAttribute("KidsUser");
    }

//    // ログインしているユーザーのサイコロ数を更新するエンドポイント
//    @PostMapping("/api/kids/currentUser/dice")
//    public void updateDiceCount(HttpServletRequest request, @RequestBody Integer diceCount) {
//        KidsUser currentUser = getCurrentUser(request);
//        if (currentUser != null) {
//            currentUser.setDiceCount(diceCount);
//            kidsUserRepository.save(currentUser);
//        }
//    }
}
