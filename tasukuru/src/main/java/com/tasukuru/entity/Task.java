package com.tasukuru.entity;

import java.time.LocalDateTime;

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
@Table(name = "tasks")
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private Integer kids_id;
	private String name;
	private String content;
	private LocalDateTime regtime;
	private String categories_name;
	private LocalDateTime tasklimit;
	private LocalDateTime submitTime;
	private String taskImage;
	private String comment;
	private Boolean review_one;
	private Boolean review_two;
	private Boolean review_three;
	private Boolean taskcheck;
	private Boolean no_complete;
	private Boolean complete;
	private Boolean miss;
}
