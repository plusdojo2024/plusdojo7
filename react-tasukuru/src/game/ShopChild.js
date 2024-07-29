import React from 'react';
import axios from 'axios';
import './ChildShop.css';
import Header from '../foundation/Header.js';
import Footer from "../foundation/Footer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default class ShopChild extends React.Component {

    constructor(props) {
        super(props);
        // stateの設定
        this.state = {
            shops: [],
            shopsItem: [],//購入した商品のリスト　データベースにitemの行がない。。後で修正必須
            kidId: "",
            money: "",
            name: "",
            price: "",
            condition: "",
            RequestModal: false,
            BuyModal: false,
            selectedItem: null, 
            requestName: ""
        };
    }

    componentDidMount() {
        this.fetchShops();
        this.fetchUserMoney();
        /* this.fetchPurchasedItems(); */

        this.setState({kidId: "KidId"});//実際はセッションから取得する
    }
    //商品リストをAPIから取得し、stateのshopsに保存
    fetchShops() {
        axios.get('/api/shop')
            .then(res => {
                this.setState({ shops: res.data });
                //これは購入済みリストの取得
                /* this.fetchPurchasedItems(); */
            });
    }
    //fetchPurchasedItemsは使わない。コメントアウト解除するとエラー出ます。
/*     // 購入済み商品リストをAPIから取得し、stateのshopsItemに保存
    fetchPurchasedItems() {
        axios.get(`/api/shopchild/purchased-items`)
            .then(res => {
                this.setState({ shopsItem: res.data });
            });
    } */


    //ユーザーの所持金をAPIから取得し、stateのmoneyに保存
    fetchUserMoney() {
        axios.get('/api/shopchild/')
            .then(res => {
                if (res.data) {
                    this.setState({ money: res.data.money, kidId: res.data.id });
                }
            })
            .catch(err => {
                console.error('ユーザー情報の取得に失敗しました:', err);
            });
    }
    

    onChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    }
    //リクエストモーダルで使ってる
    RequestChange = (e) => {
        this.setState({
            requestName: e.target.value
        });
    }

    //リクエスト処理　※エラーメッセージの表示までテスト済み
    submitRequest = () => {
        const { requestName } = this.state;
        if (requestName) {
            axios.post('/api/requests/add', { name: requestName })
                .then(res => {
                    this.setState({ RequestModal: false, requestName: "" });
                    alert('商品リクエストが送信されました');
                })
                .catch(err => {
                    console.error(err);
                    alert('リクエスト送信に失敗しました');
                });
        } else {
            alert('商品名を入力してください!');
        }
    }

    Request(index) {
        this.toggleRequestModal();
    }

    Buy(item) {
        this.toggleBuyModal(item);
    }

    toggleRequestModal() {
        const { RequestModal } = this.state;
        this.setState({
            RequestModal: !RequestModal,
        });
    }

    toggleBuyModal(item = null) {
        const { BuyModal } = this.state;
        this.setState({
            BuyModal: !BuyModal,
            selectedItem: item,
        });
    }

// 購入処理
confirmBuy = () => {
    const { selectedItem, kidId } = this.state;
    if (selectedItem && kidId) {
        axios.post(`/api/shop/${selectedItem.id}/buy/${kidId}`)
            .then(res => {
                this.setState(prevState => ({
                    BuyModal: false,
                    shops: prevState.shops.filter(shop => shop.id !== selectedItem.id),
                    shopsItem: [...prevState.shopsItem, selectedItem]
                }));
                alert('購入しました！');
                this.fetchUserMoney();
            })
            .catch(error => {
                console.error('購入できませんでした:', error);
                if (error.response) {
                    // サーバーからのエラーメッセージを表示
                    alert(`購入できませんでした: ${error.response.data}`);
                } else {
                    alert('購入できませんでした。。。');
                }
            });
    } else {
        alert('商品またはユーザーIDが選択されていません');
    }
}


    render() {
        const { RequestModal, BuyModal, shops, selectedItem, requestName, money,shopsItem } = this.state;
        return (
            <div>  
                <Header />
                <main>
                    <div className="background_image_renga">
                        <div className="ShopChildBody">
                            <h1 className="gold">{money}G</h1>
                            
                            <Tabs id="ShopChildTab">
                                <TabList id="ShopChildTabList">
                                    <Tab>販売中</Tab>
                                    <Tab>購入済み</Tab>
                                </TabList>

                                {/* 販売中タブ */}
                                <TabPanel>
                                    {shops.length > 0 ? (
                                        shops.map(shop => (
                                            <div key={shop.id}> 
                                                <h2 className="ShopChild-sale">{shop.name} {shop.price}G</h2>
                                                <button id="buy-button" onClick={() => this.Buy(shop)}>購入する</button>
                                            </div>
                                        ))
                                    ) : null}
                                    {shops.length === 0 && <h2>販売中の商品はありません。</h2>}
                                </TabPanel>
                                
                                {/* 購入済みタブ */}
                                <TabPanel>
                                    {shopsItem.length > 0 ? (
                                        shopsItem.map(shop => (
                                            <div key={shop.id}> 
                                                <h2 className="ShopChild-sale">{shop.name} {shop.price}G</h2>
                                            </div>
                                        ))
                                    ) : null}
                                    {shopsItem.length === 0 && <h2>購入済みの商品はありません。</h2>}
                                </TabPanel>
                            </Tabs>
                            
                            <div className="request_button">
                                <button id="request_button" onClick={() => this.Request()}>商品リクエスト</button>
                            </div>
                        
                            {RequestModal && (
                                <div id="ShopChildoverlay">
                                    <div id="ShopChildcontent">
                                        商品名<br />
                                        <input type="text" value={requestName} onChange={this.RequestChange} /><br />
                                        <button className="ShopChildsubmit-button" onClick={this.submitRequest}>送信</button><br />
                                        <button className="ShopChildclose-button" onClick={() => this.toggleRequestModal()}>閉じる</button>
                                    </div>
                                </div>
                            )}

                            {BuyModal && selectedItem && (
                                <div id="ShopChildoverlay">
                                    <div id="ShopChildcontent">
                                        <h1 className="ShopChildgold">{money}G</h1>
                                        <p>{selectedItem.name}  {selectedItem.price}G</p><br />
                                        <button onClick={this.confirmBuy}>購入確定</button><br />
                                        <br />
                                        <button onClick={() => this.toggleBuyModal()}>閉じる</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>                
                </main>
                <Footer />
            </div>
        );
    }
}