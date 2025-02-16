package com.tasukuru.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tasukuru.entity.KidsUser;

public interface KidsUserRepository extends JpaRepository<KidsUser, Integer> {

	//IDを指定し、KidsUserEntityの情報を取得する
	public KidsUser findById(int Id);
	
	public List<KidsUser> findByFamilyId(String familyId);
		
    // 家族IDとなまえを基にユーザーを検索するメソッド
	KidsUser findByFamilyIdAndName(String familyID, String kidsName);


}
