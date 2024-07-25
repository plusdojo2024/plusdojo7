package com.tasukuru.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.tasukuru.repository.RequestsRepository;
import com.tasukuru.repository.ShopsRepository;


@Controller
public class ShopController {

    @Autowired
    private ShopsRepository shopRepository;
    
    @Autowired
    private RequestsRepository requestsRepository;

    @GetMapping("/shops")
    public String shops(Model model) {
        model.addAttribute("shops", shopRepository.findAll());
        model.addAttribute("requests", requestsRepository.findAll());
        return "shops";
    }

    

}