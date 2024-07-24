import React from "react";
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";
import MoneyAdd from "./MoneyAdd";  // MoneyAddコンポーネントをインポート



export default class MoneyParent extends React.Component  {

    
    render() {
        return (
            <div>
                <Header />
                <div id="Money_Add">
                   <MoneyAdd />
                </div>
                <Footer />
            </div>
        );
    }
}

