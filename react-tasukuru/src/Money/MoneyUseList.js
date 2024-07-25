import React from "react";
import axios from "axios";
import './Money.css';

class MoneyUseList　extends React.Component {

    state = {
        allowances:[],
        date:"",
        item: "",
        amount: "",
        showModal: false,
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

    modMoney = () => {
        //利用するstateの値を宣言
        const { allowances } = this.state;

        //stateの値を利用してpostデータを作成
        const data = {
            date:allowances,
            item: "",
            amount: "",
        };

        this.toggleModal();
    }

    render() {
        const { allowances } = this.state;
        return (
            <div>
                <h2>使ったお金一覧</h2>
                {allowances.map((allowance, index) => (
                   <div class="use">
                   <p>{allowance.moneyDate}&nbsp;&nbsp;{allowance.usedType}&nbsp;&nbsp;{allowance.usedMoney}</p>
                   
                   {/* Todo:編集ボタンを押すとmodBook関数が実行されるようにする。引数はindex */}
                   <button onClick={() => {this.modBook(index)}}>編集</button>
                  
                   </div>
             

                ))}
            </div>
        );
    }
}

export default MoneyUseList;