import React from "react";
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";
import MoneyAdd from "./MoneyAdd";  // MoneyAddコンポーネントをインポート
import MoneyCurrentMoney from "./MoneyCurrentMoney"; 



export default class MoneyParent extends React.Component  {

    
    render() {
        return (
            <div>
                <Header />
                
                {/* 所持金 */}
                <div id="Money_CurrentMoney">
                   <MoneyCurrentMoney />
                </div>

                {/* お小遣い追加 */}
                <div id="Money_Add">
                   <MoneyAdd />
                </div>

                <Footer />
            </div>
        );
    }
}

