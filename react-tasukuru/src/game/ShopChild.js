import React from 'react';
import axios from 'axios';
import './ChildShop.css';
import Header from '../foundation/Header.js';
import Footer from "../foundation/Footer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
export default class ShopChild extends React.Component{

    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            shops:[],
            id:"",
            kidId:"",
            name:"",
            price:"",
            condition:"",
            RequestModal:false,
            BuyModal:false,
            selectedItem: null, 
            requestName: ""
        }
    }


    componentDidMount() {
        this.fetchShops();
    }

    fetchShops() {
        axios.get('/api/shop')
            .then(res => {
                this.setState({ shops: res.data });
            });
    }

    onChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    }

    //リクエスト入力フィールドのonChange
    handleRequestChange = (e) => {
        this.setState({
            requestName: e.target.value
        });
    }
    
    //リクエスト送信
    submitRequest = () => {
        const { requestName } = this.state;
        if (requestName) {
            axios.post('/api/requests/add', { name: requestName })
                .then(res => {
                    // リクエスト成功時の処理（例：モーダルを閉じる、メッセージを表示）
                    this.setState({ RequestModal: false, requestName: "" });
                    alert('商品リクエストが送信されました');
                })
                .catch(err => {
                    // リクエスト失敗時の処理
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
    
    //リクエストのモーダル
    toggleRequestModal() {
        const { RequestModal,} = this.state;
        this.setState({
            RequestModal: !RequestModal,
            
        });
    }
    //購入のモーダル
    toggleBuyModal(item = null) {
        const { BuyModal,} = this.state;
        this.setState({
            BuyModal: !BuyModal,
            selectedItem: item,
        });
    }



    render(){
        const{RequestModal, BuyModal, shops, selectedItem, requestName} = this.state;
        return(
        <div>  
            <Header />
            <main>
                <div className ="background_image_renga">
                    <div className="ShopChildBody">
                        <h1 class ="gold">1000G</h1>
                        
                        <Tabs id ="ShopChildTab">
                            <TabList id ="ShopChildTabList">
                                <Tab>販売中</Tab>
                                <Tab>購入済み</Tab>
                            </TabList>

                            <TabPanel>
                                {shops.length > 0 ? (
                                    shops.map(shop => (
                                        <div key={shop.id}> 
                                            <h2>{shop.name}   {shop.price}G</h2>
                                            <button id="buy_button" onClick={() => this.Buy(shop)}>購入する</button>
                                        </div>
                                    ))
                                ) : (
                                    <h2>販売中の商品はありません。</h2>
                                )}
                            </TabPanel>

                        <TabPanel>
                            <h2>購入済み商品１</h2>
                            <h2>購入済み商品２</h2>
                            <h2>購入済み商品３</h2>
                            <h2>購入済み商品４</h2>
                            <h2>購入済み商品５</h2>
                        </TabPanel>
                        </Tabs>
                        
                        <div className="request_button">
                            <button id ="request_button" onClick={() =>this.Request()}>商品リクエスト</button>
                        </div>
                    
                    
                        {RequestModal && (
                            <div id="ShopChildoverlay">
                                <div id= "ShopChildcontent">
                                    商品名<br />
                                    <input type="text" value={requestName} onChange={this.handleRequestChange}/><br />
                                    <button onClick={this.submitRequest}>送信</button><br />
                                    <button onClick={() =>this.toggleRequestModal()}>閉じる</button>
                                </div>
                            </div>
                        )}

                        {BuyModal && selectedItem && (
                            <div id="ShopChildoverlay">
                                <div id= "ShopChildcontent">
                                    <h1 className ="gold">1000G</h1>
                                    <p>{selectedItem.name} {selectedItem.price}G</p><br/>
                                    <button>購入確定</button><br/>
                                    <br/>
                                    <button onClick={() =>this.toggleBuyModal()}>閉じる</button>
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