import React from "react";
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";
import MoneyRegist from "./MoneyRegist";  // Import MoneyRegist component

export default class MoneyChild extends React.Component {
    state = {
        modalOpen: false,
        money: 0  // Initial money state
    };

    // 関数を使って、モーダルを開くまたは閉じる
    toggleModal = () => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen
        }));
    };

    addMoney = (amount) => {
        this.setState(prevState => ({
            money: prevState.money + amount
        }));
    };

    render() {
        return (
            <div>
                <Header />
                <div id="Money_Regist">
                    <button onClick={this.toggleModal}>
                        つかったお金をきろくする
                    </button>
                    {this.state.modalOpen && (
                        <MoneyRegist
                            addMoney={this.addMoney}
                            closeModal={this.toggleModal}  // closeModal を toggleModal に変更
                        />
                    )}
                </div>
                <Footer />
            </div>
        );
    }
}