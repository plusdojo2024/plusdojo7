package com.tasukuru.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.KidsUser;
import com.tasukuru.repository.KidsUserRepository;

@RestController
public class KidsUserRestController {
	
	@Autowired
	private KidsUserRepository kidsRepo;
	
	@GetMapping("/api/kids/")
	private Iterable<KidsUser> get() {
		return kidsRepo.findAll();
	}
	
	 @GetMapping("/api/kids/{id}/")
	    public ResponseEntity<KidsUser> getKidsUser(@PathVariable int id) {
	        KidsUser user = kidsRepo.findById(id);
	        if (user != null) {
	            return ResponseEntity.ok(user);
	        } else {
	            return ResponseEntity.status(404).body(null); // Or any other appropriate error response
	        }
	    }
	 
	 @PutMapping("/api/kids/{id}/dice")
		public ResponseEntity<KidsUser> updateDiceCount(@PathVariable int id, @RequestBody int newDiceCount) {
			KidsUser user = kidsRepo.findById(id);
			if (user != null) {
				user.setDiceCount(newDiceCount);
				kidsRepo.save(user);
				return ResponseEntity.ok(user);
			} else {
				return ResponseEntity.status(404).body(null);
			}
		}
	
	
}
