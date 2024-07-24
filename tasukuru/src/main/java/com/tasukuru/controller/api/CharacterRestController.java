package com.tasukuru.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Character;
import com.tasukuru.repository.CharactersRepository;

@RestController
public class CharacterRestController {

	@Autowired
	private CharactersRepository repository;
	
	//スキン表示
	@GetMapping("/api/mypage/skin")
	private List<Character> get(){
		return repository.findAll();
	}
	
	//スキン変更
	@PostMapping("/api/mypage/skin/mod")
	private Character modCharacter(@RequestBody Character character) {
		repository.save(character);
		return character;	
	}
	//実績一覧表示
	
	
}