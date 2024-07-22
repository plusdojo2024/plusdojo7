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
        this.toggleModal();
    }   
    
    toggleModal() {
        const { RequestModal,} = this.state;
        this.setState({
            RequestModal: !RequestModal,
            
        });
    }

    render(){
        const{RequestModal} = this.state;
        return(
        <div>  
            <Header />
            <div className ="background_image_renga">
        
            <h1>1000G</h1>
            <Tabs>
                <TabList>
                    <Tab>販売中</Tab>
                    <Tab>購入済み</Tab>
                </TabList>

            <TabPanel>
                <h2>商品１</h2>
                <h2>商品２</h2>
                <h2>商品３</h2>
                <h2>商品４</h2>
                <h2>商品５</h2>
            </TabPanel>
            <TabPanel>
                <h2>購入済み商品１</h2>
                <h2>購入済み商品２</h2>
                <h2>購入済み商品３</h2>
                <h2>購入済み商品４</h2>
                <h2>購入済み商品５</h2>
            </TabPanel>
            </Tabs>

            <button onClick={() =>this.Request()}>商品リクエスト</button>
        
        
        {RequestModal &&
            <div id="ShopChildoverlay">
                <div id= "ShopChildcontent">
                    商品名<br />
                    <input type="text"></input><br />
                    <button>送信</button><br />
                    <button onClick={() =>this.toggleModal()}>閉じる</button>

                </div>
            </div>
        }



</div>

        <Footer />
        </div>
        );
    }
}