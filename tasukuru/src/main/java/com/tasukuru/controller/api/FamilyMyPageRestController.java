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
import com.tasukuru.repository.FamilyUserRepository;
import com.tasukuru.repository.KidsUserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class FamilyMyPageRestController {

    @Autowired
    private KidsUserRepository repository;
    @Autowired
    private FamilyUserRepository familyrepository;

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
    
    // 子供選択
    @PostMapping("/api/kidsName/selection/")
    public ResponseEntity<String> selectionName(@RequestBody FamilyUser updatedFamilyUser, HttpServletRequest request) {
        HttpSession session = request.getSession();
        // セッションからログインしているFamilyUser情報を取得
        FamilyUser loginFamilyUser = (FamilyUser) session.getAttribute("FamilyUser");
        
        if (loginFamilyUser != null) {
            // ログインしているユーザーのIDを取得
            String familyId = loginFamilyUser.getFamilyId();
            
            // familyIdを使ってデータベースからFamilyUserを取得
            FamilyUser userToUpdate = familyrepository.findByFamilyId(familyId);
            
            if (userToUpdate != null) {
                // リクエストで送られてきた情報でユーザーを更新
                // ここで具体的に更新したいフィールドを指定する
                userToUpdate.setSelectedKidId(updatedFamilyUser.getSelectedKidId()); // 例えば、名前を更新する場合
                
                // 更新内容を保存
                familyrepository.save(userToUpdate);
                return ResponseEntity.ok("名前が選択されました");
            } else {
                // ユーザーが見つからない場合のレスポンス
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("指定された名前のユーザーが見つかりませんでした。");
            }
        } else {
            // セッションにログイン情報がない場合のレスポンス
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ログイン情報がありません。");
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

    // 家族アカウント削除
    @PostMapping("/api/family/familydel/")
    public ResponseEntity<String> delFamily(@RequestBody FamilyUser familyUser, HttpServletRequest request) {
        HttpSession session = request.getSession();
        // セッションからログインしているFamilyUser情報を取得
        FamilyUser loginFamilyUser = (FamilyUser) session.getAttribute("FamilyUser");
        
        if (loginFamilyUser != null) {
            // セッションからFamilyIdを取得
            String familyId = loginFamilyUser.getFamilyId();
            
            // 名前とFamilyIdでKidsUserを検索
            FamilyUser familyToDelete = familyrepository.findByFamilyId(familyId);
            
            if (familyToDelete != null) {
                // 検索結果が存在する場合は削除
                familyrepository.delete(familyToDelete);
                return ResponseEntity.ok("削除成功");
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

