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
        selectedMonth: "", // 選択された月を管理する state

     };

     //データ取得
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/api/money/listParent")
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
            });
            // 最初のデータの月を選択状態に設定
            if (json.length > 0) {
                const firstAllowance = json[0];
                const selectedMonth = this.getMonthFromDate(firstAllowance.moneyTime);
                this.setState({ selectedMonth });
            }
        });
    }

    // 日付から月を取得する関数
    getMonthFromDate = (dateString) => {
        const dateObj = new Date(dateString);
        return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
    }

    // 月の表示フォーマットを修正する関数
    formatMonth = (month) => {
        const dateObj = new Date(month);
        const formattedMonth = dateObj.toLocaleString('default', { month: 'long'});
        return formattedMonth;
    }

    // 前の月に移動する関数
    goToPreviousMonth = () => {
        const { selectedMonth } = this.state;
        const dateObj = new Date(selectedMonth);
        dateObj.setMonth(dateObj.getMonth() - 1);
        const newMonth = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
        this.setState({ selectedMonth: newMonth });
    }

    // 次の月に移動する関数
    goToNextMonth = () => {
        const { selectedMonth } = this.state;
        const dateObj = new Date(selectedMonth);
        dateObj.setMonth(dateObj.getMonth() + 1);
        const newMonth = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
        this.setState({ selectedMonth: newMonth });
    }

    // 使用履歴の中で、指定された月のデータのみをフィルタリングする関数
    filterByMonth = (allowance) => {
        const { selectedMonth } = this.state;
        const allowanceMonth = this.getMonthFromDate(allowance.moneyTime);
        return allowanceMonth === selectedMonth;
    }

    // 月の切り替えボタンを表示する関数
    renderMonthSwitcher = () => {
        return (
            <div className="month-switcher">
                <button onClick={this.goToPreviousMonth}>&lt;</button>
                <span>{this.formatMonth(this.state.selectedMonth)}</span>
                <button onClick={this.goToNextMonth}>&gt;</button>
            </div>
        );
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
        this.props.onReloadComponent();
        this.toggleModal();
        this.componentDidMount();
        
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
        this.props.onReloadComponent();
        this.toggleModal();
        this.componentDidMount();
        
        
    }


    render() {
        const { allowances, date, item, amount,showModal } = this.state;
        return (
            <div>
                <h2>使ったお金一覧</h2>
                
                {/* 月の切り替えボタンを表示 */}
                {this.renderMonthSwitcher()}

                {/* 選択された月のデータを表示 */}
                {allowances.filter(this.filterByMonth).map((allowance, index) => (
                    <div key={index} className="use">
                        <p>{allowance.moneyDate}&nbsp;&nbsp;{allowance.usedType}&nbsp;&nbsp;{allowance.usedMoney}円&nbsp;&nbsp;<button onClick={() => {this.modMoney(index)}}>編集</button></p>
                     </div>
                ))}

                {/* モーダルウィンドウ */}
                {showModal &&
                    <div  className="money_overlay">
                        <div  className="money-content">
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
                    </div>
                }
 
            </div>
        );
    }
}

export default MoneyUseList;