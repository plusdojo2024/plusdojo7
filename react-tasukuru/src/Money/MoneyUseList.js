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
                allowances : json
            })
        });
    }

    render() {
        const { usageHistory } = this.props;
        return (
            <div>
                <h2>使ったお金一覧</h2>
                {usageHistory.map((monthData, index) => (
                    <div key={index}>
                        <h3>{monthData.month}</h3>
                        <ul>
                            {monthData.items.map((item, idx) => (
                                <li key={idx}>
                                    使用金額: {item.amount} 円 - 用途: {item.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    }
}

export default MoneyUseList;