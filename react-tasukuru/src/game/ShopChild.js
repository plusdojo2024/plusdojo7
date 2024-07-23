import React from 'react';
import './ChildShop.css';
import Header from '../foundation/Header.js';
import Footer from "../foundation/Footer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
export default class ShopChild extends React.Component{

    onChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    }

    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            shops:[],
            id:"",
            kid_id:"",
            name:"",
            price:"",
            condition:"",
            RequestModal:false
        }

        this.state={
            requests:[],
            id:"",
            kid_id:"",
            name:"",
            RequestModal:false
        }
    }

    Request(index) {
        this.toggleRequestModal();
    }   
    Buy(index) {
        this.toggleBuyModal();
    }  
    
    //リクエストのモーダル
    toggleRequestModal() {
        const { RequestModal,} = this.state;
        this.setState({
            RequestModal: !RequestModal,
            
        });
    }
    //購入のモーダル
    toggleBuyModal() {
        const { BuyModal,} = this.state;
        this.setState({
            BuyModal: !BuyModal,
        })
    }



    render(){
        const{RequestModal,BuyModal,} = this.state;
        return(
        <div>  
            <Header />
            <div className="ShopChildBody">
                <div className ="background_image_renga">
            
                <h1 class ="gold">1000G</h1>
                
                <Tabs id ="ShopChildTab">
                    <TabList id ="ShopChildTabList">
                        <Tab>販売中</Tab>
                        <Tab>購入済み</Tab>
                    </TabList>

                <TabPanel>
                <h2>商品１</h2>
                <button id ="buy_button" onClick={() =>this.Buy()}>購入する</button>
                <h2>商品２</h2>
                <button id ="buy_button" onClick={() =>this.Buy()}>購入する</button>
                <h2>商品３</h2>
                <button id ="buy_button" onClick={() =>this.Buy()}>購入する</button>
                <h2>商品４</h2>
                <button id ="buy_button" onClick={() =>this.Buy()}>購入する</button>
                <h2>商品５</h2>
                <button id ="buy_button" onClick={() =>this.Buy()}>購入する</button>
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
            
            
            {RequestModal &&
                <div id="ShopChildoverlay">
                    <div id= "ShopChildcontent">
                        商品名<br />
                        <input type="text"></input><br />
                        <button>送信</button><br />
                        <button onClick={() =>this.toggleRequestModal()}>閉じる</button>
                    </div>
                </div>
            }

            {BuyModal &&
                <div id="ShopChildoverlay">
                    <div id= "ShopChildcontent">
                        <h1 class ="gold">1000G</h1>
                        <a>商品１  250G</a><br/><br/>
                        <button>購入確定</button><br/>
                        <br/>
                        <button onClick={() =>this.toggleBuyModal()}>閉じる</button>
                    </div>
                </div>
            }

                </div>

            <Footer />
            </div>
        </div>
        );
    }
}