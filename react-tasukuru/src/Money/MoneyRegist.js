import React from "react";
import axios from "axios";

export default class MoneyRegist extends React.Component {
    state = {
        date: "",
        item: "",
        amount: ""
    };

    handleDateChange = (e) => {
        this.setState({ date: e.target.value });
    };

    handleItemChange = (e) => {
        this.setState({ item: e.target.value });
    };

    handleAmountChange = (e) => {
        this.setState({ amount: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { date, item, amount } = this.state;

        axios
            .post("/api/money/regist", {
                date,
                item,
                amount
            })
            .then((response) => {
                console.log("Data saved successfully");
                // Assuming you have props passed down for addMoney and closeModal
                this.props.addMoney(parseInt(amount));
                this.props.closeModal();
            })
            .catch((error) => {
                console.error("Error saving data: ", error);
            });
    };

    render() {
        const { date, item, amount } = this.state;

        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.props.closeModal}>
                        &times;
                    </span>
                    <h2>つかったお金をきろくする</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>日にち:</label>
                        <input
                            type="text"
                            value={date}
                            onChange={this.handleDateChange}
                            required
                        />
                        <br />
                        <label>買ったもの:</label>
                        <input
                            type="text"
                            value={item}
                            onChange={this.handleItemChange}
                            required
                        />
                        <br />
                        <label>金額:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={this.handleAmountChange}
                            required
                        />
                        <br />
                        <button type="submit">登録する</button>
                    </form>
                </div>
            </div>
        );
    }
}