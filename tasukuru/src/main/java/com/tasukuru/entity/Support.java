package com.tasukuru.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="support")

public class Support {

	
	@Id
	
	private Integer id;
	private Boolean condition;
	private Integer damage;
	private Boolean buff;
	private String image;
}
