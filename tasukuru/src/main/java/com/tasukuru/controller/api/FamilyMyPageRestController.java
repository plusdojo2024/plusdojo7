package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.KidsUser;
import com.tasukuru.repository.KidsUserRepository;

@RestController
public class FamilyMyPageRestController {

    @Autowired
    private KidsUserRepository repository;


	
    // 名前追加
    @PostMapping("/api/kidsUser/add/")
    public ResponseEntity<String> addName(@RequestBody KidsUser kidsUser) {
        KidsUser savedUser = repository.save(kidsUser);
        // 保存後に成功レスポンスを返す
        return ResponseEntity.ok("名前が追加されました: " + savedUser.getName());
    }

    // 名前削除
    @PostMapping("/api/kidsUser/delete/")
    public ResponseEntity<String> deleteName(@RequestParam Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok("名前が削除されました");
        } else {
            return ResponseEntity.status(404).body("指定されたIDの名前は存在しません");
        }
    }
}


