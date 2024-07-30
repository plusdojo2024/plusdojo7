import React from "react";
import axios from "axios";
import './ParentShop.css';
import Header from '../foundation/ParentHeader.js';
import Footer from '../foundation/ParentFooter';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default class ShopParent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: [],
            requests: [],
            kidId: "",
            money: "",
            name: "",
            price: "",
            condition: "",
            newItemName: "",
            newItemPrice: "",
            ItemAddModal: false,
            ItemModModal: false,
            itemToMod: null,
            
        };
    }
    
    componentDidMount() {
        this.fetchShops();
        this.fetchRequests();
        this.fetchUserMoney();
    }

    fetchShops() {
        axios.get("/api/shop")
            .then(res => {
                this.setState({ shops: res.data });
            });
    }

    fetchRequests() {
        axios.get("/api/requests")
            .then(res =>{
                this.setState({requests: res.data });
            });
    }

    fetchUserMoney() {
        axios.get('/api/shopchild/')
            .then(res => {
                if (res.data) {
                    this.setState({ money: res.data.money });
                }
            })
            .catch(error => {
                console.error('Error fetching user money:', error);
            });
    }



    onInput = (e) => {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
    }

    addItem = () => {
        const { newItemName, newItemPrice } = this.state;

        const data = { name: newItemName, price: newItemPrice };
        axios.post("/api/shop/add", data)
            .then(() => {
                this.setState({ newItemName: "", newItemPrice: "" });
                this.fetchShops();
                this.toggleItemAddModal();
            });   
    }

    modItem = () => {
        const { itemToMod, newItemName, newItemPrice } = this.state;
        const data = { name: newItemName, price: newItemPrice };
        
        axios.put(`/api/shop/${itemToMod.id}`, data)
            .then(() => {
                this.fetchShops();
                this.toggleModModal();
            });
    }
    
    //ショップ商品の削除
    deleteItem = (id) => {
        axios.delete(`/api/shop/${id}`)
            .then(() => {
                this.fetchShops();
            });
    }


    //リクエストの削除
    deleteRequest = (id) => {
        axios.delete(`/api/requests/${id}`)
            .then(() => {
                this.fetchRequests();
            })
            .catch(error => {
                console.error("リクエストの削除に失敗しました。。。", error.response ? error.response.data : error.message);
            });
    }



    toggleItemAddModal = () => {
        this.setState(prevState => ({
            ItemAddModal: !prevState.ItemAddModal,
        }));
    }

    toggleModModal = (item = null) => {
        this.setState(prevState => ({
            ItemModModal: !prevState.ItemModModal,
            itemToMod: item
        }));
    }


    render() {
        const { shops, requests, newItemName, newItemPrice, ItemAddModal, ItemModModal, itemToMod, money } = this.state;
        return (
            <div className="wrapper">
                <Header />
                <main>
                    <div className="background_image_renga">
                        <div className="ShopParentBody">
                            <h1 className="ShopParentgold">{money}G</h1>
                            <div className="ShopParentTabs">
                                <Tabs>
                                    <TabList id="ShopParentTabList">
                                        <Tab>出品中</Tab>
                                        <Tab>リクエスト</Tab>
                                        <Tab>購入済み</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <div className="shopParent-list">
                                            {shops.map(shop => (
                                                <div key={shop.id}>
                                                    <h2 className="ShopParent-sale-button">・{shop.name} {shop.price}G</h2>
                                                    <button className="ShopParent-sale-button" onClick={() => this.toggleModModal(shop)}>編集</button><br/>
                                                    <button className="ShopParent-sale-button" onClick={() => this.deleteItem(shop.id)}>削除</button>
                                                </div>                                            
                                            ))}
                                        </div>
                                    </TabPanel>



                                    <TabPanel>
                                        <div className="request-list">
                                            {requests.map(request => (
                                                <div key={request.id}>
                                                    <h2 className="ShopParent-request">・{request.name}</h2>
                                                    <button className="ShopParent-request" onClick={() => this.deleteRequest(request.id)}>削除</button>
                                                </div>
                                            ))}
                                        </div>
                                    </TabPanel>

                                    

                                    
                                    <TabPanel>
                                        <div className="sold-list">
                                            {shops.filter(shop => !shop.condition).map(shop => (
                                                <div key={shop.id}> 
                                                    <h2 className="ShopParent-sold">・{shop.name} {shop.price}G</h2>
                                                    <button className="ShopParent-sold" onClick={() => this.deleteItem(shop.id)}>削除</button>
                                                </div>
                                            ))}
                                            {shops.filter(shop => !shop.condition).length === 0 && <h2>購入済みの商品はありません。</h2>}
                                        </div>
                                    </TabPanel>
                                </Tabs>
                            </div>
                            <button id="Item_AddButton" onClick={() => this.toggleItemAddModal()}>商品追加</button>
                        </div>
                    </div>

                    {ItemAddModal &&
                        <div id="ShopParentoverlay">
                            <div id="ShopParentcontent">
                                出品内容<br />
                                <input className="ShopParent-addModal" type="text" placeholder="商品名" name="newItemName" value={newItemName} onChange={this.onInput}></input><br />
                                <input className="ShopParent-addModal" type="text" placeholder="価格" name="newItemPrice" value={newItemPrice} onChange={this.onInput}></input><br />
                                <button className="ShopParent-addModal-button-blue" onClick={() => this.addItem()}>出品</button><br />
                                <button className="ShopParent-addModal-button" onClick={() => this.toggleItemAddModal()}>閉じる</button>
                            </div>
                        </div>
                    }

                    {ItemModModal &&
                        <div id="ShopParentoverlay">
                            <div id="ShopParentcontent">
                                編集内容<br />
                                <input className="ShopParent-modModal" type="text" placeholder="商品名" name="newItemName" value={this.state.newItemName} onChange={this.onInput}></input><br />
                                <input className="ShopParent-modModal" type="text" placeholder="価格" name="newItemPrice" value={this.state.newItemPrice} onChange={this.onInput}></input><br />
                                <button className="ShopParent-modModal-button-blue" onClick={() => this.modItem()}>保存</button><br />
                                <button className="ShopParent-modModal-button" onClick={() => this.toggleModModal()}>閉じる</button>
                            </div>
                        </div>
                    }
                </main>
                <Footer />
            </div>
        );
    }
}
