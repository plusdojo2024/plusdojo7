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
	private Integer kidsId;
	private String name;
	private String content;
	private LocalDateTime regTime;
	private String categoriesName;
	private LocalDateTime taskLimit;
	private LocalDateTime submitTime;
	private String taskImage;
	private String comment;
	private Boolean reviewOne;
	private Boolean reviewTwo;
	private Boolean reviewThree;
	private Boolean taskCheck;
	private Boolean noComplete;
	private Boolean complete;
	private Boolean miss;
}
