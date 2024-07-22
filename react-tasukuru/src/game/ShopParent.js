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
        // stateの設定
        this.state = {
            shops: [],
            kid_id: 0,
            name: "",
            price: "",
            condition: "",
            ItemAddModal: false,
            ItemModModal: false
        };
    }

    onChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    }

    ItemAdd(index) {
        this.toggleItemAddModal();
    }

    toggleItemAddModal() {
        const { ItemAddModal } = this.state;
        this.setState({
            ItemAddModal: !ItemAddModal,
        });
    }

    toggleModModal() {
        const { ModModal } = this.state;
        this.setState({
            ModModal: !ModModal
        });
    }

    render() {
        const { ItemAddModal, ModModal } = this.state;
        return (
            <wrapper>
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
                                    <h2>・AAA   250G</h2>
                                    <button onClick={() => this.toggleModModal()}>編集</button>
                                    <h2>・BBB   300G</h2>
                                    <button onClick={() => this.toggleModModal()}>編集</button>
                                    <h2>・CCC   1000G</h2>
                                    <button onClick={() => this.toggleModModal()}>編集</button><br />
                       
                                </TabPanel>
                                <TabPanel>
                                    <h2>・じゃがりこ</h2>
                                    <h2>・遊園地</h2>
                                    <h2>・ゲームソフト</h2>
                                    <h2>・映画館</h2>
                                </TabPanel>
                                <TabPanel>
                                    <h2>・ポッキー</h2>
                                    <h2>・サッカーボール</h2>
                                    
                                </TabPanel>
                                </Tabs>
                            </div>
                            <button id="Item_AddButton" onClick={() => this.ItemAdd()}>商品追加</button>
                        </div>
                    </div>

                    

                            {ItemAddModal &&
                                <div id="ShopParentoverlay">
                                    <div id="ShopParentcontent">
                                        商品名<br />
                                        <input type="text"></input><br />
                                        <button>送信</button><br />
                                        <button onClick={() => this.toggleItemAddModal()}>閉じる</button>
                                    </div>
                                </div>
                            }

                            {ModModal &&
                                <div id="ShopParentoverlay">
                                    <div id="ShopParentcontent">
                                        編集内容<br />
                                        <input type="text" placeholder="商品名"></input><br />
                                        <input type="text" placeholder="価格"></input><br />
                                        <button>保存</button><br />
                                        <button onClick={() => this.toggleModModal()}>閉じる</button>
                                    </div>
                                </div>
                            }
                </main>
                <Footer />
            </wrapper>
        );
    }
}
