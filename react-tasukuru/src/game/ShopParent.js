import React from "react";
import axios from "axios";
import './ParentShop.css';

export default class ShopParent extends React.Component {
    constructor(props) {
        super(props);
        //stateの設定
        this.state = {
            shops: [],
            kid_id: 0,
            name: "",
            price: "",
            condition: "",
            ItemAddModal:false,
            ItemModModal:false
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
        const { ItemAddModal,} = this.state;
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

    render(){
         const{ItemAddModal, ModModal } = this.state;
        return(
        <div class="ShopParentBody">  
            <div class="ShopParentgold">
                <h1>1000G</h1>
                <h2>AAA   250G</h2><br/>
                <button onClick={() => this.toggleModModal()}>編集</button>
                <h2>BBB   300G</h2><br/>
                <h2>CCC   1000G</h2><br/>
                <button onClick={() =>this.ItemAdd()}>商品リクエスト</button>
            </div>
        
            {ItemAddModal &&
                <div id="ItemAddModaloverlay">
                    <div id= "ItemAddcontent">
                        商品名<br />
                        <input type="text"></input><br />
                        <button>送信</button><br />
                        <button onClick={() =>this.toggleModal()}>出品</button>

                    </div>
                </div>
            }

            {ModModal &&
                <div id="ModModaloverlay">
                    <div id="Modcontent">
                        編集内容<br />
                        {/* Add form fields for editing */}
                        <input type="text" placeholder="新しい商品名"></input><br />
                        <input type="text" placeholder="新しい価格"></input><br />
                        <button>保存</button><br />
                        <button onClick={() => this.toggleEditModal()}>閉じる</button>
                    </div>
                 </div>
            }


            </div>
            );
        }
    }