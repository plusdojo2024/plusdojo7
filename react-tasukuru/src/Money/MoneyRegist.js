import React from "react";
import axios from "axios";
import './Money.css';
import DatePicker from "react-datepicker"; // react-datepicker のインポート
import "react-datepicker/dist/react-datepicker.css"; // react-datepicker のスタイルシート
import { ja } from "date-fns/locale"; // 日本語ロケールのインポート
import { registerLocale, setDefaultLocale } from "react-datepicker";

// 日本語のロケールを設定
registerLocale('ja', ja); 
setDefaultLocale('ja');

export default class MoneyRegist extends React.Component {
    state = {
        date:new Date(), // 初期値として今日の日付を設定
        item: "",
        amount: "",
        showModal: false
       };

    // 関数を使って、モーダルを開くまたは閉じる
    toggleModal = () => {
        const{showModal} = this.state;
        this.setState({
            showModal: !showModal
        });
    }


    // 日付が選択されたときのハンドラー
    handleDateChange = date => {
        this.setState({ date });
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
           moneyTime : date,
           usedType : item,
           usedMoney : amount
        };

        //const data = {};
        //axiosだとpostが記述しやすい
        axios.post("/api/money/regist", data)
        .then(json => {
            console.log(json);
            this.setState({
               date:new Date(), // 登録後に日付をリセット
               item:"",
               amount:""
            });
        });
        this.toggleModal();
    }

    render() {
        const { date, item, amount,showModal } = this.state;
        return (
            <div className="money_overlay">
                <div className="money-content">
                    
                    <button onClick={this.toggleModal}>
                        つかったお金をきろくする
                    </button>

                    {/* モーダルウィンドウ */}
                    {showModal &&
                    <div>
                    <button className="close" onClick={this.toggleModal}>
                        &times;
                    </button>
                
                        <label>日にち</label>
                        <DatePicker
                        selected={date}
                        onChange={this.handleDateChange}
                        dateFormat="yyyy/MM/dd" // 日付のフォーマット指定
                    />
                        <br />

                        <label>買ったもの</label>
                        <input
                            type="text"
                            name="item"
                            value={item}
                            onChange={this.onInput}
                            
                        />
                        <br />
                        <label>つかったお金</label>
                        <input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={this.onInput}
                        />
                        <br />
                        <button onClick={this.registMoney}> とうろく</button>
                    </div>
                    }
                </div>
            </div>
        );
    }
}







