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
import com.tasukuru.entity.Task;
import com.tasukuru.repository.CharactersRepository;
import com.tasukuru.repository.TaskRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class CharacterRestController {

	@Autowired
	private CharactersRepository charactersrepository;
	
	@Autowired
	private TaskRepository taskrepository;
	
	@GetMapping("/api/mypage/")
	private Optional<Character> get(HttpServletRequest request){
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		if(loginUser != null) {		//ここから絞り込むコード
			//ログインしているユーザーのIDを取得
			int characterId = loginUser.getCharacterId();
			//ユーザーIDに一致するタスクを取得して返す
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
	private Character modCharacter(@RequestBody Character character) {
		charactersrepository.save(character);
		return character;	
	}
	//実績一覧表示
	@GetMapping("/api/mypage/task")
	private List<Task> getAll(){
		return taskrepository.findAll();
		
	}
	
}