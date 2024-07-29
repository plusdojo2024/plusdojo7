package com.tasukuru.controller.api;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Diary;
import com.tasukuru.repository.DiaryRepository;

@RestController
@CrossOrigin
public class DiaryRestController {
	
	@Autowired
	private DiaryRepository repository;
	
	@GetMapping("/api/diary/")
	private Iterable<Diary> get() {
			return repository.findAll();
	}
	/*
	@GetMapping("/api/diary/")	private Iterable<Diary> get(HttpServletRequest request) {
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		if(loginUser != null) {		//ここから絞り込むコード
			//ログインしているユーザーのIDを取得
			int userId = loginUser.getId();
			//ユーザーIDに一致する日記を取得して返す
			return repository.findByKidsId(userId);
		}else {
			return List.of();
		}
	}
	*/
	
	@PostMapping("/api/diary/diaryAdd/")
	private Diary addDiary(@RequestBody Diary diary) {
		diary.setDate(new Date());
		repository.save(diary);
		return diary;
	}

	@PostMapping("/api/diary/diaryMod/")
	private Diary modDiary(@RequestBody Diary diary) {
		System.out.println("Received data: " + diary); // デバッグ用のログ出力
        Optional<Diary> existingDiaryOpt = repository.findById(diary.getId());
        if (existingDiaryOpt.isPresent()) {
            Diary existingDiary = existingDiaryOpt.get();
            existingDiary.setTitle(diary.getTitle());
            existingDiary.setContent(diary.getContent());
            existingDiary.setReply(diary.getReply());
            existingDiary.setDate(diary.getDate());
            existingDiary.setParentCheck(diary.isParentCheck());
            existingDiary.setChildCheck(diary.isChildCheck());
            existingDiary.setDoSubmit(diary.isDoSubmit());
            repository.save(existingDiary);
            return existingDiary;
        } else {
            return null;
        }
    }
	
	@PostMapping("/api/diary/diaryDel/")
	private void delDiary(@RequestBody Integer id) {
		System.out.println(id.toString());
		
		repository.deleteById(id);
		
	}
	
	public static class searchId{
		public Integer id;
	}

}
