package com.tasukuru.entity;

import java.sql.Date;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.annotation.JsonProperty;

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
	private Integer kidsId;
	private Integer getMoney;
	private String usedType;
	private Integer usedMoney;
	private Date moneyTime;
	
	@JsonProperty("moneyDate")
	public String dateString() {
		SimpleDateFormat dformat = new SimpleDateFormat("MM/dd");
		return dformat.format(this.moneyTime);
	}
	
}
