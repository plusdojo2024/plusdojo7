package com.tasukuru.controller.api;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.KidsUser;
import com.tasukuru.repository.KidsUserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class KidsUserRestController {
	
	@Autowired
	private KidsUserRepository kidsRepo;
	
	@GetMapping("/api/kids/currentUser/")
	private Optional<KidsUser> get(HttpServletRequest request){
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		if(loginUser != null) {		//ここから絞り込むコード
			//ログインしているユーザーのIDを取得
			int userId = loginUser.getId();
			//ユーザーIDに一致するタスクを取得して返す
			return Optional.of(kidsRepo.findById(userId));
		} else {
			//ログインしていない場合、空のリストを返す
			return null;
		}
		
		//System.out.println(session.getAttribute("KidsUser"));
		//return repository.findAll();
	}
	
		
	@GetMapping("/api/kids/")
	private Iterable<KidsUser> get() {
		return kidsRepo.findAll();
	}
	
	//攻撃した後、残るサイコロ数をデータベースに保存する
	@PostMapping("/api/kids/currentUser/updateDiceCount")
    public ResponseEntity<KidsUser> updateDiceCount(@RequestBody Map<String, Integer> requestBody, HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession();
        KidsUser loginUser = (KidsUser) session.getAttribute("KidsUser");

        if (loginUser != null) {
            KidsUser user = kidsRepo.findById(loginUser.getId()).orElse(null);
            if (user != null) {
                Integer newDiceCount = requestBody.get("newDiceCount");
                if (newDiceCount != null) {
                    user.setDiceCount(newDiceCount);
                    kidsRepo.save(user);
                    return ResponseEntity.ok(user);
                } else {
                    return ResponseEntity.badRequest().body(null);
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
	
	// サイコロを1増やす
    @PostMapping("/api/kids/currentUser/incrementDiceCount")
    public ResponseEntity<KidsUser> incrementDiceCount(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession();
        KidsUser loginUser = (KidsUser) session.getAttribute("KidsUser");

        if (loginUser != null) {
            KidsUser user = kidsRepo.findById(loginUser.getId()).orElse(null);
            if (user != null) {
                user.setDiceCount(user.getDiceCount() + 1);
                kidsRepo.save(user);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
	
	



//	 @GetMapping("/api/kids/{id}/")
//	    public ResponseEntity<KidsUser> getKidsUser(@PathVariable int id) {
//	        KidsUser user = kidsRepo.findById(id);
//	        if (user != null) {
//	            return ResponseEntity.ok(user);
//	        } else {
//	            return ResponseEntity.status(404).body(null); // Or any other appropriate error response
//	        }
//	    }
	 
//	 @PutMapping("/api/kids/currentUser/dice/")
//		public ResponseEntity<KidsUser> updateDiceCount(@PathVariable int id, @RequestBody int newDiceCount) {
//			KidsUser user = kidsRepo.findById(id);
//			if (user != null) {
//				user.setDiceCount(newDiceCount);
//				kidsRepo.save(user);
//				return ResponseEntity.ok(user);
//			} else {
//				return ResponseEntity.status(404).body(null);
//			}
//	
}
