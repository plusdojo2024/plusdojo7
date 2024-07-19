import React from 'react';
import './ChildShop.css';

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
            showModal:false
        }

        this.state={
            requests:[],
            id:"",
            kid_id:"",
            name:"",
            showModal:false
        }

    }

    render(){
         const{title} = this.state;
        return(
        <div>
            <h1>子ども用ショップ</h1>
        </div>
        );
    }
}