package com.tasukuru.controller.api;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.KidsUser;
import com.tasukuru.repository.KidesUserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class KidsUserRestController {
	
	@Autowired
	private KidesUserRepository kidsRepo;
	
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
