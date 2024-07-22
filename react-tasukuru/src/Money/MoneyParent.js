import React from "react";
import MoneyAdd from "./MoneyAdd";  // MoneyAddコンポーネントをインポート



class MoneyParent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            money: 0,  // 初期の残金を0とする
            modalOpen: false,  // モーダルの表示状態
           
        };
    }

    // 残金を増やす関数
    addMoney = (amount) => {
        this.setState(prevState => ({
            money: prevState.money + amount
        }));
    };

    

    // モーダルを開く関数
    openModal = () => {
        this.setState({
            modalOpen: true
        });
    };

    // モーダルを閉じる関数
    closeModal = () => {
        this.setState({
            modalOpen: false
        });
    };

    render() {
        return (
            <div>
                <div>残金: {this.state.money} 円</div>
                <button onClick={this.openModal}>追加</button>

                {this.state.modalOpen && (
                    <MoneyAdd
                        addMoney={this.addMoney}
                        closeModal={this.closeModal}
                    />
                )}
            </div>
        );
    }
}

export default MoneyParent;