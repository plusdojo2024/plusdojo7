package com.tasukuru.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.Allowance;
import com.tasukuru.entity.KidsUser;
import com.tasukuru.repository.AllowanceRepository;
import com.tasukuru.repository.KidsUserRepository;
import com.tasukuru.repository.SupportRepository;

@RestController
public class MoneyRestController {
	
	@Autowired
	private AllowanceRepository repository;
	
	@Autowired
	private KidsUserRepository kidsRepository;
	
	@Autowired
	private SupportRepository characterRepository;

	//利用記録処理
	@PostMapping("/api/money/regist")
	private Allowance regist(@RequestBody Allowance allowance) {
		//System.out.println(allowance.getUsed_type());
		
		//リポジトリ.save(エンティティ);
		repository.save(allowance);
		
		//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
		KidsUser kidsUser = kidsRepository.findById(1000);
		
		//所持金の計算を行う。
		//kidsUser.setCurrent_money(kidsUser.getCurrent_money() - allowance.getUsed_money());
		
		int money = kidsUser.getCurrentMoney() - allowance.getUsedMoney();
		kidsUser.setCurrentMoney(money);
		
		//リポジトリ.save(int);
		
		kidsRepository.save(kidsUser);

		return allowance;
	}
	
	//お小遣い追加処理
	@PostMapping("/api/money/add")
	private Allowance add(@RequestBody Allowance allowance) {
		//System.out.println(allowance.getGet_money());
		
		//リポジトリ.save(エンティティ);
		repository.save(allowance);
		
		//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
		KidsUser kidsUser = kidsRepository.findById(1000);
		
		//所持金の計算を行う。
		kidsUser.setCurrentMoney(kidsUser.getCurrentMoney() + allowance.getGetMoney());
		
		kidsRepository.save(kidsUser);

		return allowance;
	}
	
	//所持金データ取得
	@GetMapping("/api/money/current")
	private Integer get(){
		
		//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
		KidsUser kidsUser = kidsRepository.findById(1000);
		
	    return kidsUser.getCurrentMoney();
	}
	
	//一覧取得処理
		@GetMapping("/api/money/list")
		private List<Allowance> list(){
			
			return repository.findByKidsId(1);
		}
		
	//更新処理
	@PostMapping("/api/money/mod")
	private Allowance mod(@RequestBody Allowance allowance) {

		//postされたデータからIDを取得
		int Id = allowance.getId();
		
		//idを指定して、Allowanceエンティティを取得
		Allowance useMoney = repository.findById(Id);
		
		//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
		KidsUser kidsUser = kidsRepository.findById(1000);
		
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
		private Allowance del(@RequestBody Allowance allowance) {
			//postされたデータからIDを取得
			int Id = allowance.getId();
			
			//idを指定して、Allowanceエンティティを取得
			Allowance useMoney = repository.findById(Id);
			
			//kidsRepositoryをつかって、idを指定して、KidsUserエンティティを取得する。
			KidsUser kidsUser = kidsRepository.findById(1000);
			
			//所持金の修正を行う。
			kidsUser.setCurrentMoney(kidsUser.getCurrentMoney() + useMoney.getUsedMoney());
							
			kidsRepository.save(kidsUser);
			
			repository.delete(allowance);
			
			return allowance;
		}
	
	//サポートキャラの表示処理
	//@GetMapping("/api/money/support")
	
		
	
	
}