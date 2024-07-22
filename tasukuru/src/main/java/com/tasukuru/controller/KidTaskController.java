package com.tasukuru.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.tasukuru.entity.Task;
import com.tasukuru.repository.TaskRepository;

@Controller
public class KidTaskController {
	@Autowired
	private TaskRepository repository;
	
	@GetMapping("/task/")
	public String index(Model model) {
		Iterable<Task>tasks = repository.findAll();
		model.addAttribute("tasks", tasks);
		return "task";
	}
	
	//タスク追加
	@PostMapping("/task/add")
	public String add(@ModelAttribute Task task, RedirectAttributes redirectAttributes) {
		repository.save(task);
		//フラッシュメッセージを設定
		redirectAttributes.addFlashAttribute("message", task.getName() + "を追加しました。");
		
		return "redirect:/";
	}
	
	//タスクソート
	/*@PostMapping("/task/sort/")
	public String sortTasks(Model model) {
		Iterable<Task> tasks = repository.findAllByOrderByRegtimeAscTasklimitAsc();
		model.addAttribute("tasks", tasks);
		return "task";
	}*/
}
