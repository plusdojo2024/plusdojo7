package com.tasukuru.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tasukuru.entity.FamilyUser;

@Repository
public interface FamilyUserRepository extends JpaRepository<FamilyUser, String> {

    // 家族IDとパスワードを基にユーザーを検索するメソッド
	FamilyUser findByFamilyIdAndPass(String familyID, String password);

}
