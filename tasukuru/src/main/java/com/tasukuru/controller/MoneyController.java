package com.tasukuru.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Allowance;
import com.tasukuru.repository.AllowanceRepository;

@RestController
public class MoneyController {
	
	@Autowired
	private AllowanceRepository repository;

	@PostMapping("/api/money/regist")
	private Allowance add(@RequestBody Allowance allowance) {
		System.out.println(allowance.getUsed_type());
		//repository.save(allowance);
		return allowance;
	}
}
