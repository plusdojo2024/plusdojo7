import React from "react";
import axios from "axios";
import './ParentShop.css';
import Header from '../foundation/Header.js';
import Footer from '../foundation/Footer';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default class ShopParent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shops: [],
            kid_id: 0,
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
    }

    fetchShops() {
        axios.get("/api/shop")
            .then(res => {
                this.setState({ shops: res.data });
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

    deleteItem = (id) => {
        axios.delete(`/api/shop/${id}`)
            .then(() => {
                this.fetchShops();
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
        const { shops, newItemName, newItemPrice, ItemAddModal, ItemModModal, itemToMod } = this.state;
        return (
            <div className="wrapper">
                <Header />
                <main>
                    <div className="ShopParentBody">
                        <div className="background_image_renga">
                            <h1 className="ShopParentgold">1000G</h1>
                            <div className="ShopParentTabs">
                                <Tabs>
                                    <TabList id="ShopParentTabList">
                                        <Tab>出品中</Tab>
                                        <Tab>リクエスト</Tab>
                                        <Tab>購入済み</Tab>
                                    </TabList>

                                    <TabPanel>
                                        {shops.map(shop => (
                                            <div key={shop.id}>
                                                <h2>・{shop.name} {shop.price}G</h2>
                                                <button onClick={() => this.toggleModModal(shop)}>編集</button><br/>
                                                <button onClick={() => this.deleteItem(shop.id)}>削除</button>
                                            </div>
                                        ))}
                                    </TabPanel>
                                    <TabPanel>
                                        <h2>・じゃがりこ</h2>
                                        <button onClick={() => this.deleteItem(/* 'じゃがりこ' */)}>削除</button>
                                        <h2>・遊園地</h2>
                                        <button onClick={() => this.deleteItem()}>削除</button>
                                        <h2>・ゲームソフト</h2>
                                        <button onClick={() => this.deleteItem()}>削除</button>
                                        <h2>・映画館</h2>
                                        <button onClick={() => this.deleteItem()}>削除</button>
                                    </TabPanel>
                                    <TabPanel>
                                        <h2>・ポッキー</h2>
                                        <button onClick={() => this.deleteItem()}>削除</button>
                                        <h2>・サッカーボール</h2>
                                        <button onClick={() => this.deleteItem()}>削除</button>
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
                                <input type="text" placeholder="商品名" name="newItemName" value={newItemName} onChange={this.onInput}></input><br />
                                <input type="text" placeholder="価格" name="newItemPrice" value={newItemPrice} onChange={this.onInput}></input><br />
                                <button onClick={() => this.addItem()}>出品</button>
                                <button onClick={() => this.toggleItemAddModal()}>閉じる</button>
                            </div>
                        </div>
                    }

                    {ItemModModal &&
                        <div id="ShopParentoverlay">
                            <div id="ShopParentcontent">
                                編集内容<br />
                                <input type="text" placeholder="商品名" name="newItemName" value={newItemName} onChange={this.onInput}></input><br />
                                <input type="text" placeholder="価格" name="newItemPrice" value={newItemPrice} onChange={this.onInput}></input><br />
                                <button onClick={() => this.modItem()}>保存</button>
                                <button onClick={() => this.toggleModModal()}>閉じる</button>
                            </div>
                        </div>
                    }
                </main>
                <Footer />
            </div>
        );
    }
}
