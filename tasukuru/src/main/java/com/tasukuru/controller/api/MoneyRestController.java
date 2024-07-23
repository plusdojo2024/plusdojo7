package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Allowance;
import com.tasukuru.repository.AllowanceRepository;
import com.tasukuru.repository.KidesUserRepository;

@RestController
public class MoneyRestController {
	
	@Autowired
	private AllowanceRepository repository;
	private KidesUserRepository KidsRepository;
	

	//利用記録処理
	@PostMapping("/api/money/regist")
	private Allowance regist(@RequestBody Allowance allowance) {
		//System.out.println(allowance.getUsed_type());
		repository.save(allowance);
		return allowance;
	}
	
	//削除処理
	@PostMapping("/api/money/del")
	private Allowance del(@RequestBody Allowance allowance) {
		repository.delete(allowance);
		return allowance;
	}
	
	//お小遣い追加処理
	@PostMapping("/api/money/add")
	private Allowance add(@RequestBody Allowance getMoney) {
		repository.save(getMoney);
		return getMoney;
	}
}
