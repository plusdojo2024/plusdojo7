package com.tasukuru.controller.api;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.FamilyUser;
import com.tasukuru.entity.KidsUser;
import com.tasukuru.repository.FamilyUserRepository;
import com.tasukuru.repository.KidsUserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class FamilyLoginRestController {

    @Autowired
    private FamilyUserRepository userRepository;
    @Autowired
    private KidsUserRepository repository;

    @PostMapping("/api/FamilyLogin/loginDate/")
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginRequest,HttpServletRequest request) {
        String familyID = loginRequest.get("family_id");
        String password = loginRequest.get("pass");

        // ログイン処理を行う
        FamilyUser foundUser = userRepository.findByFamilyIdAndPass(familyID, password);

        if (foundUser != null) {
            // ログイン成功の場合、セッションスコープにfoundUserを格納する
            HttpSession session = request.getSession();
            session.setAttribute("FamilyUser", foundUser); 

            return ResponseEntity.ok("ログイン成功");
        } else {
            // ログイン失敗の場合、適切なエラーメッセージを設定して返す
            return ResponseEntity.ok("ログインに失敗しました。");
        }
    }
    
    //ヘッダーの名前表示
    @GetMapping("/api/name")
	private KidsUser name(HttpServletRequest request){
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		FamilyUser loginUser = (FamilyUser)session.getAttribute("FamilyUser");
				
		int userId = loginUser.getSelectedKidId();
		
		return repository.findById(userId);
	}
}