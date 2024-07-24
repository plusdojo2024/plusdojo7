package com.tasukuru.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

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
@Table(name="diaries")
public class Diary {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private Integer kidsId;
	private String title;
	private String content;
	private String reply;
	private Date date;
	private boolean parentCheck;
	private boolean childCheck;
	private boolean doSubmit;
	
	public String dateString() {
		SimpleDateFormat dformat = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");
		return dformat.format(this.date);
	}
	
}
