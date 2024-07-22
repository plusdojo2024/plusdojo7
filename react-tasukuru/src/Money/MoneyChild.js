import React from "react";
import MoneyRegist from "./MoneyRegist";  // Import MoneyRegist component

export default class MoneyChild extends React.Component {
    state = {
        modalOpen: false,
        money: 0  // Initial money state
    };

    addMoney = (amount) => {
        this.setState(prevState => ({
            money: prevState.money + amount
        }));
    };

    openModal = () => {
        this.setState({
            modalOpen: true
        });
    };

    closeModal = () => {
        this.setState({
            modalOpen: false
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.openModal}>つかったお金をきろくする</button>
                {this.state.modalOpen && (
                    <MoneyRegist
                        addMoney={this.addMoney}
                        closeModal={this.closeModal}
                    />
                )}
            </div>
        );
    }
}