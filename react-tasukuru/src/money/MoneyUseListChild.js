import React from "react";
import './Money.css';

class MoneyUseListChild extends React.Component {

    state = {
        allowances: [],
        date: "",
        item: "",
        amount: "",
        selectedMonth: "", // 選択された月を管理する state
        showModal: false,
    };

    componentDidMount() {
        fetch("/api/money/list")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                allowances: json
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
                <button onClick={this.goToPreviousMonth}>前の月</button>
                <span>{this.formatMonth(this.state.selectedMonth)}</span>
                <button onClick={this.goToNextMonth}>次の月</button>
            </div>
        );
    }

    render() {
        const { allowances } = this.state;
        return (
            <div>
                <h2>つかったお金</h2>

                {/* 月の切り替えボタンを表示 */}
                {this.renderMonthSwitcher()}

                {/* 選択された月のデータを表示 */}
                {allowances.filter(this.filterByMonth).map((allowance, idx) => (
                    <div key={idx} className="use">
                        <p>{allowance.moneyDate}&nbsp;&nbsp;{allowance.usedType}&nbsp;&nbsp;{allowance.usedMoney}</p>
                        {/* Todo: 編集ボタンを押すと modBook 関数が実行されるようにする。引数は index */}
                        <button onClick={() => {this.modBook(idx)}}>へんしゅう</button>
                    </div>
                ))}
            </div>
        );
    }
}

export default MoneyUseListChild;