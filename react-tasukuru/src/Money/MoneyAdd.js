import React from "react";
import axios from "axios";
import './Money.css';

export default class MoneyAdd extends React.Component{
    state = {
        getMoney: "",
        showModal: false
       };


        // 関数を使って、モーダルを開くまたは閉じる
    toggleModal = () => {
        const{showModal} = this.state;
        this.setState({
            showModal: !showModal
        });
    }



       onInput = (e) => {
        //コントロールの名前を取得する
        const name= e.target.name;
        //コントロールに入力した値をstateに更新する。
        this.setState({
            [name]: e.target.value
        });
    }

    addMoney = () => {
        //利用するstateの値を宣言
        const { getMoney } = this.state;

        //stateの値を利用してpostデータを作成
        const data = {
           get_money : getMoney
        };

        //const data = {};
        //axiosだとpostが記述しやすい
        axios.post("/api/money/add", data)
        .then(json => {
            console.log(json);
            this.setState({
              getMoney:""
            });
        });
        this.toggleModal();
    }


    render() {
        const {getMoney,showModal } = this.state;
        return (
            <div className="money_overlay">
                <div className="money-content">
                    
                    <button onClick={this.toggleModal}>
                        追加
                    </button>

                    {/* モーダルウィンドウ */}
                    {showModal &&
                    <div>
                    <button className="close" onClick={this.toggleModal}>
                        &times;
                    </button>
                
                        <label>お小遣い金額:</label>
                        <input
                            type="number"
                            name="getMoney"
                            value={getMoney}
                            onChange={this.onInput}
                        />
                        <br />
                        <button onClick={this.addMoney}> 登録</button>
                    </div>
                    }
                </div>
            </div>
        );
    }

}