package com.tasukuru.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Character;
import com.tasukuru.entity.Task;
import com.tasukuru.repository.CharactersRepository;
import com.tasukuru.repository.TaskRepository;

@RestController
public class CharacterRestController {

	@Autowired
	private CharactersRepository charactersrepository;
	
	@Autowired
	private TaskRepository taskrepository;
	
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