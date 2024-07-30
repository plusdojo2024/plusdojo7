import React from "react";
import axios from "axios";
import './Money.css';


export default class MoneyAdd extends React.Component{
    state = {
        date:new Date(),
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
        const { getMoney, date } = this.state;

        //stateの値を利用してpostデータを作成
        const data = {
           getMoney : getMoney,
           moneyTime : date
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
        this.props.onReloadComponent();
        this.toggleModal();
        
    }


    render() {
        const {getMoney,showModal } = this.state;
        return (
            <div className="">
                
                <div className="add-contents">
                    <button onClick={this.toggleModal}>
                        追加
                    </button>

                    {/* モーダルウィンドウ */}
                    {showModal &&
                    <div className="Add_overlay">
                        <div className="Add-content">
                    <button className="Add_close" onClick={this.toggleModal}>
                        &times;
                    </button>
                        <div class="input-content">
                        <label>お小遣い金額:</label>
                        <input
                            type="number"
                            name="getMoney"
                            value={getMoney}
                            onChange={this.onInput}
                        />
                        <br />
                        </div>
                        <button onClick={this.addMoney}> 登録</button>
                        </div>
                    </div>
                    }
                </div>
                
            </div>
        );
    }

}