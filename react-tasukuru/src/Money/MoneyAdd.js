import React from "react";

class MoneyAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputMoney: ""  // 入力された金額
        };
    }

    // モーダル内で金額を入力するための関数
    handleInputChange = (event) => {
        this.setState({
            inputMoney: event.target.value
        });
    };

    // モーダル内で金額を登録する関数
    handleAddModal = () => {
        const { inputMoney } = this.state;
        const moneyToAdd = parseInt(inputMoney, 10);
        if (!isNaN(moneyToAdd)) {
            this.props.addMoney(moneyToAdd);  // MoneyParentコンポーネントの関数を呼び出し、残金を増やす
            this.props.closeModal();  // モーダルを閉じる
        }
    };

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.props.closeModal}>&times;</span>
                    <p>金額を入力してください:</p>
                    <input type="number" value={this.state.inputMoney} onChange={this.handleInputChange} />
                    <button onClick={this.handleAddModal}>登録</button>
                </div>
            </div>
        );
    }
}

export default MoneyAdd;