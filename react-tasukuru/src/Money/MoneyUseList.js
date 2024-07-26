import React from "react";
import axios from "axios";
import './Money.css';
import DatePicker from "react-datepicker"; // react-datepicker のインポート
import "react-datepicker/dist/react-datepicker.css"; // react-datepicker のスタイルシート
import { ja } from "date-fns/locale"; // 日本語ロケールのインポート
import { registerLocale, setDefaultLocale } from "react-datepicker";

class MoneyUseList　extends React.Component {

    state = {
        allowances:[],
        date:"",
        item: "",
        amount: "",
        showModal: false,
        modIndex: 0,
        modDate: '',
        modItem: '',
        modAmount:'',

     };

     //データ取得
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/api/money/list")
        //取得したレスポンスを JSON 形式に変換
        .then(res => res.json())
        //JSON データを取得した後、コンソールにログ出力
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する。
            //stateが変わると自動的に画面が再描画される。
            //取得した JSON データをコンポーネントの状態 (this.state.books) に保存
            this.setState({
                allowances : json
            })
        });
    }

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

    handleDateChange = date => {
        this.setState({ date });
    };

    //モーダル表示（編集）
    modMoney = (index) => {
        //利用するstateの値を宣言
        const { allowances } = this.state;

        this.setState ({
            date:allowances[index].moneyTime,
            item: allowances[index].usedType,
            amount: allowances[index].usedMoney,
            modIndex: index,
        });

        this.toggleModal();
    }

    //更新
    updateMoney = () => {
        //利用するstateの値を宣言
        const { allowances, modIndex, date, item, amount } = this.state;

        //stateの値を利用してpostデータを作成
        const data = {
           id:allowances[modIndex].id, 
           moneyTime : date,
           usedType : item,
           usedMoney : amount
        };

        //const data = {};
        //axiosだとpostが記述しやすい
        axios.post("/api/money/mod", data)
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

    //削除
    deleteMoney = () => {
        //利用するstateの値を宣言
        const { allowances, modIndex, date, item, amount } = this.state;

        //stateの値を利用してpostデータを作成
        const data = {
           id:allowances[modIndex].id, 
           moneyTime : date,
           usedType : item,
           usedMoney : amount
        };

        //const data = {};
        //axiosだとpostが記述しやすい
        axios.post("/api/money/del", data)
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
        const { allowances, date, item, amount,showModal } = this.state;
        return (
            <div>
                <h2>使ったお金一覧</h2>
                {allowances.map((allowance, index) => (
                   <div class="use">
                   <p>{allowance.moneyDate}&nbsp;&nbsp;{allowance.usedType}&nbsp;&nbsp;{allowance.usedMoney}円&nbsp;&nbsp;<button onClick={() => {this.modMoney(index)}}>編集</button></p>
                                    
                   </div>
                ))}

                {/* モーダルウィンドウ */}
                {showModal &&
                    <div>
                    <button className="close" onClick={this.toggleModal}>
                        &times;
                    </button>
                
                        <label>日付</label>
                        <DatePicker
                        selected={date}
                        onChange={this.handleDateChange}
                        dateFormat="yyyy/MM/dd" // 日付のフォーマット指定
                    />
                        <br />

                        <label>購入した物</label>
                        <input
                            type="text"
                            name="item"
                            value={item}
                            onChange={this.onInput}
                            
                        />
                        <br />
                        <label>金額</label>
                        <input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={this.onInput}
                        />
                        <br />
                        <button onClick={this.updateMoney}> 更新</button> <button onClick={this.deleteMoney}> 削除</button>
                    </div>
                }
 
            </div>
        );
    }
}

export default MoneyUseList;