package com.tasukuru.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.tasukuru.entity.Shop;
import com.tasukuru.repository.ShopsRepository;
/*
@Controller
public class ShopController {
	
	@Autowired
	private ShopsRepository repository;
	
	//全てのショップの商品を取得
	@GetMapping("/shop")
	public Iterable<Shop> getAllshops() {
		return ShopsRepository.findAll();
	}
	//ショップアイテムを追加
	@GetMapping
	public Shop createshop() {
		return ShopsRepository.save(shop);
	}
	
	
}



*/