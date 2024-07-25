import React from "react";
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";
import MoneyRegist from "./MoneyRegist";  // Import MoneyRegist component
import MoneyCurrentMoney from "./MoneyCurrentMoney"; 
import MoneyUseListChild from "./MoneyUseListChild"; 

export default class MoneyChild extends React.Component {
    


    render() {
        return (
            <div>
                <Header />

                 {/* 利用記録 */}
                <div id="Money_Regist">
                   <MoneyRegist />
                </div>
                <br />

                 {/* 所持金 */}
                <div id="Money_CurrentMoney">
                   <MoneyCurrentMoney />
                </div>
                
                <Footer />
            </div>
        );
    }
}