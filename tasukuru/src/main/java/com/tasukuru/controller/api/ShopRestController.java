package com.tasukuru.controller.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Shop;
import com.tasukuru.repository.ShopsRepository;

@RestController
public class ShopRestController {

    @Autowired
    private ShopsRepository shopsRepository;

    // 商品リストの取得する
    @GetMapping("/api/shop")
    public List<Shop> getAllShops() {
        return shopsRepository.findAll();
    }

    // 商品の追加
    @PostMapping("/api/shop/add")
    public Shop add(@RequestBody Shop shop) {
        return shopsRepository.save(shop);
    }

    // 商品の更新
    @PutMapping("/api/shop/{id}")
    public Shop update(@PathVariable Long id, @RequestBody Shop shop) {
        Optional<Shop> optionalShop = shopsRepository.findById(id);
        if (optionalShop.isPresent()) {
            Shop existingShop = optionalShop.get();
            existingShop.setName(shop.getName());
            existingShop.setPrice(shop.getPrice());
            return shopsRepository.save(existingShop);
        } else {
            throw new RuntimeException("Shop not found with id " + id);
        }
    }

    // 商品の削除
    @DeleteMapping("/api/shop/{id}")
    public void delete(@PathVariable Long id) {
        shopsRepository.deleteById(id);
    }
}
