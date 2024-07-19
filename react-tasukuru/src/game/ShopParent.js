import React from "react";
import axios from "axios";
import './ParentShop.css';
import Header from '../foundation/Header.js';


export default class ShopParent extends React.Component{
    
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
            showModal:false,
            keyword: ""
        }


        
    }
    onChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    }



    render(){
         const{title} = this.state;
        return(
        
        <div>
            <Header />
            <div class="shopName">
                <h1>保護者用ショップ設定</h1>
            </div>
        </div>

        );





        }
   }
