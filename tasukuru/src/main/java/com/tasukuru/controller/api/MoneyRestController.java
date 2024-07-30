package com.tasukuru.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Allowance;
import com.tasukuru.entity.FamilyUser;
import com.tasukuru.entity.KidsUser;
import com.tasukuru.entity.Support;
import com.tasukuru.repository.AllowanceRepository;
import com.tasukuru.repository.KidsUserRepository;
import com.tasukuru.repository.SupportRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class MoneyRestController {
	
	@Autowired
	private AllowanceRepository repository;
	
	@Autowired
	private KidsUserRepository kidsRepository;
	
	@Autowired
	private SupportRepository supportRepository;

	//利用記録処理
	@PostMapping("/api/money/regist")
	private Allowance regist(@RequestBody Allowance allowance, HttpServletRequest request) {
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		int userId = loginUser.getId();
		
		allowance.setKidsId(userId);
		
		//リポジトリ.save(エンティティ);
		repository.save(allowance);
		
		//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
		KidsUser kidsUser = kidsRepository.findById(userId);
		
		//所持金の計算を行う。
		//kidsUser.setCurrent_money(kidsUser.getCurrent_money() - allowance.getUsed_money());
		
		int money = kidsUser.getCurrentMoney() - allowance.getUsedMoney();
		kidsUser.setCurrentMoney(money);
		
        //サポートid更新
		kidsUser.setSupportId(2);
		
		//リポジトリ.save(int);
		
		kidsRepository.save(kidsUser);

		return allowance;
	}
	
	//お小遣い追加処理
	@PostMapping("/api/money/add")
	private Allowance add(@RequestBody Allowance allowance, HttpServletRequest request) {
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		FamilyUser loginUser = (FamilyUser)session.getAttribute("FamilyUser");
		
		int userId = loginUser.getSelectedKidId();
		
		allowance.setKidsId(userId);
		
		//リポジトリ.save(エンティティ);
		repository.save(allowance);
		
		//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
		KidsUser kidsUser = kidsRepository.findById(userId);
		
		//所持金の計算を行う。
		kidsUser.setCurrentMoney(kidsUser.getCurrentMoney() + allowance.getGetMoney());
		
		
     // KidsUserエンティティを保存
		kidsRepository.save(kidsUser);

		return allowance;
	}
	
	//所持金データ取得
	@GetMapping("/api/money/current")
	private Integer get(HttpServletRequest request){
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		int userId = loginUser.getId();
		KidsUser kidsUser = kidsRepository.findById(userId);
		return kidsUser.getCurrentMoney();
		
		
	}
	
	//所持金データ取得(保護者)
	@GetMapping("/api/money/currentParent")
	private Integer getParent(HttpServletRequest request){
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		FamilyUser loginUser = (FamilyUser)session.getAttribute("FamilyUser");
		
		int userId = loginUser.getSelectedKidId();
		
		//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
		KidsUser kidsUser = kidsRepository.findById(userId);
		
	    return kidsUser.getCurrentMoney();
	}
	
	//一覧取得処理
		@GetMapping("/api/money/list")
		private List<Allowance> list(HttpServletRequest request){
			HttpSession session = request.getSession();
			//セッションからログインしているKidsUser情報を取得
			KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
			
			int userId = loginUser.getId();
			
			return repository.findByKidsId(userId);
		}
		
	//一覧取得処理(保護者)
		@GetMapping("/api/money/listParent")
		private List<Allowance> listParent(HttpServletRequest request){
			HttpSession session = request.getSession();
			//セッションからログインしているKidsUser情報を取得
			FamilyUser loginUser = (FamilyUser)session.getAttribute("FamilyUser");
					
			int userId = loginUser.getSelectedKidId();
					
			return repository.findByKidsId(userId);
		}
		
	//更新処理
	@PostMapping("/api/money/mod")
	private Allowance mod(@RequestBody Allowance allowance, HttpServletRequest request) {
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		int userId = loginUser.getId();
		
		allowance.setKidsId(userId);
		
		//postされたデータからIDを取得
		int Id = allowance.getId();
		
		//idを指定して、Allowanceエンティティを取得
		Allowance useMoney = repository.findById(Id);
		
		//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
		KidsUser kidsUser = kidsRepository.findById(userId);
		
		//所持金の修正を行う
		kidsUser.setCurrentMoney(kidsUser.getCurrentMoney() + useMoney.getUsedMoney());
		
		// 修正を保存する		
		kidsRepository.save(kidsUser);
		
		//更新
		repository.save(allowance);
	   
		//所持金の計算を行う。
		kidsUser.setCurrentMoney(kidsUser.getCurrentMoney() - allowance.getUsedMoney());
		
		// 更新を保存する		
		kidsRepository.save(kidsUser);
		
        // 更新されたAllowanceオブジェクトを返す
		return allowance;
	}
	
	//更新処理（保護者）
		@PostMapping("/api/money/modParent")
		private Allowance modParent(@RequestBody Allowance allowance, HttpServletRequest request) {
			HttpSession session = request.getSession();
			//セッションからログインしているKidsUser情報を取得
			FamilyUser loginUser = (FamilyUser)session.getAttribute("FamilyUser");
					
			int userId = loginUser.getSelectedKidId();
			
			allowance.setKidsId(userId);
			
			//postされたデータからIDを取得
			int Id = allowance.getId();
			
			//idを指定して、Allowanceエンティティを取得
			Allowance useMoney = repository.findById(Id);
			
			//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
			KidsUser kidsUser = kidsRepository.findById(userId);
			
			//所持金の修正を行う
			kidsUser.setCurrentMoney(kidsUser.getCurrentMoney() + useMoney.getUsedMoney());
			
			// 修正を保存する		
			kidsRepository.save(kidsUser);
			
			//更新
			repository.save(allowance);
		   
			//所持金の計算を行う。
			kidsUser.setCurrentMoney(kidsUser.getCurrentMoney() - allowance.getUsedMoney());
			
			// 更新を保存する		
			kidsRepository.save(kidsUser);
			
	        // 更新されたAllowanceオブジェクトを返す
			return allowance;
		}
	
	
	//削除処理
		@PostMapping("/api/money/del")
		private Allowance del(@RequestBody Allowance allowance, HttpServletRequest request) {
			HttpSession session = request.getSession();
			int userId = 0;
			
			//セッションからログインしているFamilyUser情報を取得
			FamilyUser loginUser = (FamilyUser)session.getAttribute("FamilyUser");
			if (loginUser != null) {
				userId = loginUser.getSelectedKidId();				
			}
			
			//セッションからログインしているKidsUser情報を取得
			KidsUser user = (KidsUser)session.getAttribute("KidsUser");
			if (user != null) {
				userId = user.getId();				
			}
			
			
			allowance.setKidsId(userId);
			
			//postされたデータからIDを取得
			int Id = allowance.getId();
			
			//idを指定して、Allowanceエンティティを取得
			Allowance useMoney = repository.findById(Id);
			
			//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
			KidsUser kidsUser = kidsRepository.findById(userId);
			
			//所持金の修正を行う。
			kidsUser.setCurrentMoney(kidsUser.getCurrentMoney() + useMoney.getUsedMoney());
							
			kidsRepository.save(kidsUser);
			
			repository.delete(allowance);
			
			return allowance;
		}
		
		//削除処理（保護者）
				@PostMapping("/api/money/delParent")
				private Allowance delParent(@RequestBody Allowance allowance, HttpServletRequest request) {
					HttpSession session = request.getSession();
					//セッションからログインしているKidsUser情報を取得
					KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
					
					int userId = loginUser.getId();
					
					allowance.setKidsId(userId);
					
					//postされたデータからIDを取得
					int Id = allowance.getId();
					
					//idを指定して、Allowanceエンティティを取得
					Allowance useMoney = repository.findById(Id);
					
					//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
					KidsUser kidsUser = kidsRepository.findById(userId);
					
					//所持金の修正を行う。
					kidsUser.setCurrentMoney(kidsUser.getCurrentMoney() + useMoney.getUsedMoney());
									
					kidsRepository.save(kidsUser);
					
					repository.delete(allowance);
					
					return allowance;
				}
	
	  //サポートキャラの表示処理
	 @GetMapping("/api/money/support")
	 private Support imageget(HttpServletRequest request) {
		 	HttpSession session = request.getSession();
			//セッションからログインしているKidsUser情報を取得
			KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
			
			int userId = loginUser.getId();
		 
	        //kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
	        KidsUser kidsUser = kidsRepository.findById(userId);	
	
	        // supportId を取得
            int supportId = kidsUser.getSupportId();
    
            // Supportエンティティを取得
            Support support = supportRepository.findById(supportId);
            
    		
            //画像を返す		
    		return  support;
	}	
	
}