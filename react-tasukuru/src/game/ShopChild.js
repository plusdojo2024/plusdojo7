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
        <div class="gold">
            <h1>1000G</h1>
            <button onClick={() =>this.Request()}>商品リクエスト</button>
        </div>
        
        {RequestModal &&
            <div id="overlay">
                <div id= "content">
                    商品名<br />
                    <input type="text"></input><br />
                    <button>送信</button><br />
                    <button onClick={() =>this.toggleModal()}>閉じる</button>

                </div>
            </div>
        }
        </div>
        );
    }
}