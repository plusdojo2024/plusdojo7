package com.tasukuru.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.FamilyUser;
import com.tasukuru.entity.KidsUser;
import com.tasukuru.repository.KidsUserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class FamilyMyPageRestController {

    @Autowired
    private KidsUserRepository repository;

    // なまえ表示
    @GetMapping("/api/familymypage/")
    public List<KidsUser> get(HttpServletRequest request) {
        HttpSession session = request.getSession();
        // セッションからログインしているFamilyUser情報を取得
        FamilyUser loginFamilyUser = (FamilyUser) session.getAttribute("FamilyUser");
        
        if (loginFamilyUser != null) {
            // ログインしているユーザーのIDを取得
            String familyId = loginFamilyUser.getFamilyId();
            // ユーザーIDに一致するKidsUserを取得して返す
            return repository.findByFamilyId(familyId);
        } else {
            // ログインしていない場合、空のリストを返す
            return List.of();
        }
    }

    // 名前追加
    @PostMapping("/api/kidsUser/add/")
    public ResponseEntity<String> addName(@RequestBody KidsUser kidsUser) {
        KidsUser savedUser = repository.save(kidsUser);
        // 保存後に成功レスポンスを返す
        return ResponseEntity.ok("名前が追加されました: " + savedUser.getName());
    }
}

