package com.tasukuru.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity              
@AllArgsConstructor  
@NoArgsConstructor   
@Data                
@Table(name="kids_users")

public class KidsUser {

	@Id //キー設定
	@GeneratedValue(strategy=GenerationType.IDENTITY) //auto increment
	private Integer id;
	private String familyId;
	private Integer characterId;
	private Integer enemieId;
	private Integer enemieHp;
	private Integer supportId;
	private String name;
	private Integer diceCount;
	private Integer money;
	private Integer currentMoney;
	
}
