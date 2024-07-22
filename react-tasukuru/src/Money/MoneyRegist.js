import React from "react";
import axios from "axios";

export default class MoneyRegist extends React.Component {
 
    state = {
        date: "",
        item: "",
        amount: ""
    };

    onInput = (e) => {
        //コントロールの名前を取得する
        const name= e.target.name;

        //コントロールに入力した値をstateに更新する。
        this.setState({
            [name]: e.target.value
        });
    }    


    registMoney = () => {
        //利用するstateの値を宣言
        const { date, item, amount } = this.state;

        //stateの値を利用してpostデータを作成
        const data = {
           money_time : date,
           used_type : item,
           used_money : amount
        };
        //const data = {};
        
        //axiosだとpostが記述しやすい
        axios.post("/api/money/regist", data)
        .then(json => {
            console.log(json);

            this.setState({
               date:"",
               item:"",
               amount:""
            });
        });
    }    
 

    render() {
        const { date, item, amount } = this.state;

        return (
            <div className="money_overlay">
                <div className="money-content">
                    <span className="close" onClick={this.props.closeModal}>
                        &times;
                    </span>
                    <h2>つかったお金をきろくする</h2>
                    
                        <label>日にち:</label>
                        <input
                            type="text"
                            name="date"
                            value={this.state.date}
                            onChange={this.onInput}

                        />
                        <br />
                        <label>買ったもの:</label>
                        <input
                            type="text"
                            name="item"
                            value={item}
                            onChange={this.onInput}
                            
                        />
                        <br />
                        <label>金額:</label>
                        <input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={this.onInput}

                        />
                        <br />
                        <button onclick={this.registMoney}> 登録する</button>
                </div>
            </div>
        );
    }
}