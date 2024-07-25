package com.tasukuru.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.tasukuru.entity.Enemie;
import com.tasukuru.repository.EnemiesRepository;


@Controller
public class GameController {
	@Autowired
	private EnemiesRepository repository;
	
	@GetMapping("/game/")
	public String index(Model model) {
		Iterable<Enemie>enemies = repository.findAll();
		model.addAttribute("enemies", enemies);
		return "game";
	}

}
