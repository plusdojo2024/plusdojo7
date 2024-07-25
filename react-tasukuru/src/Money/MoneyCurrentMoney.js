import React from "react";
import axios from "axios";
import './Money.css';

export default class MoneyCurrentMoney extends React.Component{
    state = {
       currentMoney: "",
    };

    //データ取得
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/api/money/current")
        //取得したレスポンスを JSON 形式に変換
        .then(res => res.json())
        //JSON データを取得した後、コンソールにログ出力
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する。
            //stateが変わると自動的に画面が再描画される。
            //取得した JSON データをコンポーネントの状態 (this.state.books) に保存
            this.setState({
                currentMoney : json
            })
        });
    }


    render() {
        const {currentMoney} = this.state;
        return (
            <div >
               <p>のこり : {currentMoney}円</p>
            </div>
        );
    }

}