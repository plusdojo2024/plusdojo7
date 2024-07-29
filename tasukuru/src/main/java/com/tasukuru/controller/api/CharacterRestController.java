package com.tasukuru.controller.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Character;
import com.tasukuru.entity.KidsUser;
import com.tasukuru.repository.CharactersRepository;
import com.tasukuru.repository.KidsUserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class CharacterRestController {

	@Autowired
	private CharactersRepository charactersrepository;
	
	@Autowired
	private KidsUserRepository kidsuserrepository;
	
	@GetMapping("/api/mypage/")
	private Optional<Character> get(HttpServletRequest request){
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		if(loginUser != null) {		//ここから絞り込むコード
			int loginUser_id = loginUser.getId();	//ログインしているIDがとれた
			
			//KidsUserRepositoryを使って、今のデータベースの情報を取込しなおす。
			KidsUser nowKidsUser = kidsuserrepository.findById(loginUser_id); 
			//sessonから取り出したインスタンスではんく、KidsUserRepositoryで取得した値に書き換える
			int characterId = nowKidsUser.getCharacterId();
			
			return charactersrepository.findById(characterId);
		} else {
			//ログインしていない場合、空のリストを返す
			return null;
		}
		
		//System.out.println(session.getAttribute("KidsUser"));
		//return repository.findAll();
	}
	
	//スキン表示
	@GetMapping("/api/mypage/skin")
	private List<Character> get(){
		return charactersrepository.findAll();
	}
	
	//スキン変更
	@PostMapping("/api/mypage/skin/mod")
	private KidsUser modKidsUser(@RequestBody KidsUser kidsuser, HttpServletRequest request) {
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		//kidsuserのidを指定して、データベースから情報を取得する。
		int id = loginUser.getId();
		KidsUser orginal = kidsuserrepository.findById(id); 
		
		//画面からおくられたcharcter_idを上書きする。
		orginal.setCharacterId(kidsuser.getCharacterId());
		
		//kids_usersテーブルを更新する。
		kidsuserrepository.save(orginal);
		return kidsuser;	
	}
	
	//実績一覧表示
//	@GetMapping("/api/mypage/task")
//	private List<Task> getAll(){
//		return taskrepository.findAll();
//		
//	}
	
}