package com.tasukuru.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.KidsUser;

public interface KidesUserRepository extends JpaRepository<KidsUser, Integer> {

	//IDを指定し、KidsUserEntityの情報を取得する
	public KidsUser findById(int Id);
	
	void save(Optional<KidsUser> kidsUser);
	
    // 家族IDとパスワードを基にユーザーを検索するメソッド
	KidsUser findByFamilyIdAndName(String familyID, String kidsName);

}
