package com.tasukuru.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CharacterController {
	
	@GetMapping("/api/mypage")
	public String skin() {
		
		return "skin";
	}
	
	
}
