import React, { useState } from "react";
import axios from "axios";

const MoneyRegist = ({ addMoney, closeModal }) => {
    const [date, setDate] = useState("");
    const [item, setItem] = useState("");
    const [amount, setAmount] = useState("");

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleItemChange = (e) => {
        setItem(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

      
        
        // サーバーにデータを送信するaxiosのリクエスト
        axios.post("/api/", {
            date,
            item,
            amount
        })
        .then(response => {
            console.log("Data saved successfully");
            // 金額を親コンポーネントで管理する関数に渡して残金を更新する
            addMoney(parseInt(amount));
            // モーダルを閉じる
            closeModal();
        })
        .catch(error => {
            console.error("Error saving data: ", error);
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>つかったお金をきろくする</h2>
                <form onSubmit={handleSubmit}>
                    <label>日にち:</label>
                    <input
                        type="text"
                        value={date}
                        onChange={handleDateChange}
                        required
                    />
                    <br />
                    <label>買ったもの:</label>
                    <input
                        type="text"
                        value={item}
                        onChange={handleItemChange}
                        required
                    />
                    <br />
                    <label>金額:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        required
                    />
                    <br />
                    <button type="submit">登録する</button>
                </form>
            </div>
        </div>
    );
};

export default MoneyRegist;