package com.tasukuru.entity;

import java.sql.Date;

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
@Table(name="allowances")

public class Allowance {

	@Id //キー設定
	@GeneratedValue(strategy=GenerationType.IDENTITY) //auto increment
	private Integer id;
	private Integer kids_id;
	private Integer get_money;
	private String used_type;
	private Integer used_money;
	private Date money_time;
	
}
