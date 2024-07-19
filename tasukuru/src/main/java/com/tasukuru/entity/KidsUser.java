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
	private String family_id;
	private Integer character_id;
	private Integer enemie_id;
	private Integer enemie_hp;
	private Integer support_id;
	private String name;
	private Integer dice_count;
	private Integer money;
	private Integer current_money;
	
}
