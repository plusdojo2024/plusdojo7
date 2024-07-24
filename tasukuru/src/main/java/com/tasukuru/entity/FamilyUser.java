package com.tasukuru.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity																//データベースの1行と対になっていることを示す
@AllArgsConstructor													//全ての項目を引数として持つコンストラクタを自動定義する
@NoArgsConstructor													//引数なしコンストラクタを自動定義する
@Data																//getter、setter、toStringなどの基本的メソッドを自動定義する
@Table(name="familyUser")												//マッピングされるテーブルを指定する
public class FamilyUser {
	@Id
	//ID列であることを示す
	private String familyId;
	private String mail;
	private String pass;

}
