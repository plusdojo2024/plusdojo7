package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.FamilyUser;
import com.tasukuru.repository.FamilyUserRepository; // FamilyUserRepositoryを利用すると仮定します

@RestController
public class LoginRestController {

    @Autowired
    private FamilyUserRepository userRepository; // FamilyUserRepositoryを注入する

    @PostMapping("/api/login/family")
    public ResponseEntity<String> login(@RequestBody FamilyUser loginUser) {
        String familyID = loginUser.getFamilyID();
        String password = loginUser.getPassword();

        // ログイン処理を行う
        User foundUser = userRepository.findByFamilyIDAndPassword(familyID, password);

        if (foundUser != null) {
            // ログイン成功の場合、セッションスコープにloginUserインスタンスを格納
            // HttpSession session = request.getSession(); // HttpSessionは不要
            // session.setAttribute("loginUser", foundUser);
            return ResponseEntity.ok("ログイン成功");
        } else {
            // ログイン失敗の場合、適切なエラーメッセージを設定して返す
            return ResponseEntity.badRequest().body("ログインに失敗しました。");
        }
    }
}