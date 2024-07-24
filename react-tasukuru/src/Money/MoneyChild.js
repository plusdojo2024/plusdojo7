import React from "react";
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";
import MoneyRegist from "./MoneyRegist";  // Import MoneyRegist component

export default class MoneyChild extends React.Component {
    


    render() {
        return (
            <div>
                <Header />
                <div id="Money_Regist">
                   <MoneyRegist />
                </div>
                <Footer />
            </div>
        );
    }
}