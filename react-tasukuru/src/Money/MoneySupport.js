import React from "react";
import './Money.css';

export default class MoneySupport extends React.Component{
    state = {
       image: "",
    };

    //データ取得
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/api/money/support")
        //取得したレスポンスを JSON 形式に変換
        .then(res => res.json())
        //JSON データを取得した後、コンソールにログ出力
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する。
            //stateが変わると自動的に画面が再描画される。
            //取得した JSON データをコンポーネントの状態 (this.state.books) に保存
            this.setState({
                image : json
            })
        });
    }


    render() {
        const {image} = this.state;
        return (
            <div >
              <img src = {image.image}></img>
            </div>
        );
    }

}