package com.tasukuru.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.tasukuru.repository.ShopsRepository;


@Controller
public class ShopController {

    @Autowired
    private ShopsRepository shopRepository;

    @GetMapping("/shops")
    public String getShops(Model model) {
        model.addAttribute("shops", shopRepository.findAll());
        return "shops";
    }

    @GetMapping("/shop/add")
    public String addShopForm(Model model) {
        return "addShop";
    }

}