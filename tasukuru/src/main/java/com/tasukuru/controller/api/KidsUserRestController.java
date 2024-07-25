package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.KidsUser;
import com.tasukuru.repository.KidesUserRepository;

@RestController
public class KidsUserRestController {
	
	@Autowired
	private KidesUserRepository kidsRepo;
	
	@GetMapping("/api/kids/")
	private Iterable<KidsUser> get() {
		return kidsRepo.findAll();
	}
	
	
}
