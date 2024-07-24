package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.FamilyUser;
import com.tasukuru.repository.FamilyUserRepository;

@RestController
public class LoginRestController {

    @Autowired
    private FamilyUserRepository userRepository;

    @PostMapping("/api/login/loginDate/")
    public ResponseEntity<String> login(
            @RequestParam("family_id") String familyID,
            @RequestParam("pass") String password) {

        // ログイン処理を行う
        FamilyUser foundUser = userRepository.findByFamilyIdAndPass(familyID, password);


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