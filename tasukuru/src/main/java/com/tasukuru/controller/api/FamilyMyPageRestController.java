package com.tasukuru.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @PostMapping("/api/kidsName/add/")
    public ResponseEntity<String> addName(@RequestBody KidsUser kidsUser) {
        KidsUser savedUser = repository.save(kidsUser);
        // 保存後に成功レスポンスを返す
        return ResponseEntity.ok("名前が追加されました: " + savedUser.getName());
    }
    
 // 名前削除
    @PostMapping("/api/kidsName/del/")
    public ResponseEntity<String> delName(@RequestBody KidsUser kidsUser, HttpServletRequest request) {
        HttpSession session = request.getSession();
        // セッションからログインしているFamilyUser情報を取得
        FamilyUser loginFamilyUser = (FamilyUser) session.getAttribute("FamilyUser");
        
        if (loginFamilyUser != null) {
            // セッションからFamilyIdを取得
            String familyId = loginFamilyUser.getFamilyId();
            
            // 名前とFamilyIdでKidsUserを検索
            KidsUser userToDelete = repository.findByFamilyIdAndName(familyId, kidsUser.getName());
            
            if (userToDelete != null) {
                // 検索結果が存在する場合は削除
                repository.delete(userToDelete);
                return ResponseEntity.ok("名前が削除されました: " + kidsUser.getName());
            } else {
                // 検索結果が存在しない場合のレスポンス
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("指定された名前のユーザーが見つかりませんでした。");
            }
        } else {
            // セッションにログイン情報がない場合のレスポンス
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ログイン情報がありません。");
        }
    }

}

