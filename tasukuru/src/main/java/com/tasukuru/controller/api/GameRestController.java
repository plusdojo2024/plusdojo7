package com.tasukuru.controller.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ReplayEnemiesAndCurrentEnemyId getEnemies(HttpServletRequest request) {
    	
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		int loginUser_id = loginUser.getId();
		
    	
    	ReplayEnemiesAndCurrentEnemyId replay = new ReplayEnemiesAndCurrentEnemyId();
    	replay.enemies = enemiesRepository.findAll();
    	KidsUser user = kidsUserRepository.findById(loginUser_id);
    	replay.currentEnemyId = user.getEnemieId() - 1;
    	replay.currentEnemyHp = user.getEnemieHp();
    	
        return replay;
    }
    
 
    public static class ReplayEnemiesAndCurrentEnemyId{
    	public List<Enemie> enemies;
    	
    	public Integer currentEnemyId;
    	public Integer currentEnemyHp;
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
    public ResponseEntity<KidsUser> attackEnemy(@PathVariable Integer id, @PathVariable Integer damage,
    		HttpServletRequest request) {
//        Enemie enemy = enemiesRepository.findById(id)
//                                        .orElseThrow(() -> new IllegalArgumentException("Enemy not found"));
//
//        int currentHp = enemy.getHp();
//        int updatedHp = currentHp - damage;
//        if (updatedHp < 0) {
//            updatedHp = 0; // HPが0未満にならないようにする
//        }
//        enemy.setHp(updatedHp);
//
//        // 更新したエネミーを保存
//        enemiesRepository.save(enemy);
//
        

		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		int loginUser_id = loginUser.getId();
		
        // ダメージを適用し、「kids_users」テーブルの持つHPを更新する。
    	//	enemyテーブルは、共通のテーブルなので変更しない
		KidsUser kidsUser = kidsUserRepository.findById(loginUser_id);
		//画面から渡されたdamegeを敵のhpから引く
		int hp = kidsUser.getEnemieHp() - damage;
		
		if (hp <= 0) {
			//0又は0より小さい場合は、enemeyを倒したことになる。
			//次のenemy_id、enemy_hpを保存する
			int enemy_id = id + 1;	//次の敵
			if(enemy_id > 5) {
				enemy_id = 0;		//enemy_idが5より大きくなると、1に戻る。
			}
			
			kidsUser.setEnemieId(enemy_id);
	        Enemie enemy = enemiesRepository.findById(enemy_id)
	        			.orElseThrow(() -> new IllegalArgumentException("Enemy not found"));
			
			kidsUser.setEnemieHp(enemy.getHp());
			
			Enemie dropEnemy = enemiesRepository.findById(enemy_id-1)
        			.orElseThrow(() -> new IllegalArgumentException("Enemy not found"));
			int currentMoney = kidsUser.getMoney();
			int plusMoney = currentMoney + dropEnemy.getDrop();
			kidsUser.setMoney(plusMoney);
			
		} else {
			//敵を倒していない
			//enempy_idは更新しない、hpは更新する
			kidsUser.setEnemieHp(hp);
			
		}
		kidsUserRepository.save(kidsUser);
		
		
        //System.out.println("Enemy HP updated: ID = " + id + ", New HP = " + updatedHp);
        
        return new ResponseEntity<>(kidsUser, HttpStatus.OK);
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
