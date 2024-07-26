package com.tasukuru.controller.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tasukuru.entity.KidsUser;
import com.tasukuru.entity.Request;
import com.tasukuru.entity.Shop;
import com.tasukuru.repository.KidsUserRepository;
import com.tasukuru.repository.RequestsRepository;
import com.tasukuru.repository.ShopsRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;


@RestController
public class ShopRestController {

    @Autowired
    private ShopsRepository shopsRepository;
    
    @Autowired
    private RequestsRepository requestsRepository;
    
    @Autowired
    private KidsUserRepository kidsUserRepository;
    
    //ログイン処理
	@GetMapping("/api/shopchild/")
	private Optional<KidsUser> get(HttpServletRequest request){
		HttpSession session = request.getSession();
		//セッションからログインしているKidsUser情報を取得
		KidsUser loginUser = (KidsUser)session.getAttribute("KidsUser");
		
		if(loginUser != null) {		//ここから絞り込むコード
			//ログインしているユーザーのIDを取得
			int userId = loginUser.getId();
			//ユーザーIDに一致するタスクを取得して返す
			return Optional.of(kidsUserRepository.findById(userId));
		} else {
			//ログインしていない場合、空のリストを返す
			return null;
		}
		
		//System.out.println(session.getAttribute("KidsUser"));
		//return repository.findAll();
	}

    // 商品リストの取得
    @GetMapping("/api/shop")
    public List<Shop> getAllShops() {
        return shopsRepository.findAll();
    }

    // 商品の追加
    @PostMapping("/api/shop/add")
    public Shop add(@RequestBody Shop shop) {
        return shopsRepository.save(shop);
    }

    // 商品の更新
    @PutMapping("/api/shop/{id}")
    public Shop update(@PathVariable int id, @RequestBody Shop shop) {
        Optional<Shop> optionalShop = shopsRepository.findById(id);
        if (optionalShop.isPresent()) {
            Shop existingShop = optionalShop.get();
            existingShop.setName(shop.getName());
            existingShop.setPrice(shop.getPrice());
            return shopsRepository.save(existingShop);
        } else {
            throw new RuntimeException("Shop not found with id " + id);
        }
    }

    // 商品の削除
    @DeleteMapping("/api/shop/{id}")
    public void delete(@PathVariable int id) {
        shopsRepository.deleteById(id);
    }
    
    // リクエストリストの取得
    @GetMapping("/api/requests")
    public List<Request> getAllRequests() {
        return requestsRepository.findAll();
    }
   
    // リクエストの追加
    @PostMapping("/api/requests/add")
    public Request addRequest(@RequestBody Request request) {
        return requestsRepository.save(request);
    }
    
    // リクエストの削除
    @DeleteMapping("/api/requests/{id}")
    public void deleteRequest(@PathVariable int id) {
        requestsRepository.deleteById(id);
    }
    
    // 商品の購入
    @PostMapping("/api/shop/{shopId}/buy/{kidId}")
    public Shop buyItem(@PathVariable int shopId, @PathVariable int kidId) {
        Optional<Shop> optionalShop = shopsRepository.findById(shopId);
        KidsUser kidsUser = kidsUserRepository.findById(kidId);

        if (optionalShop.isPresent() && kidsUser != null) {
            Shop shop = optionalShop.get();

            // 子どもの通貨が足りるか確認
            if (kidsUser.getMoney() >= shop.getPrice()) {
                // 通貨を引く
                kidsUser.setMoney(kidsUser.getMoney() - shop.getPrice());
                // 商品の状態を更新（販売済みにするなど）
                shop.setCondition(false);
                // 更新を保存
                kidsUserRepository.save(kidsUser);
                return shopsRepository.save(shop);
            } else {
                throw new RuntimeException("残高が不足しています");
            }
        } else {
            throw new RuntimeException("商品またはユーザーが見つかりません");
        }
    }
}
