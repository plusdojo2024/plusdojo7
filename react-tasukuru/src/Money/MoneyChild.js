import React from "react";
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";
import MoneyRegist from "./MoneyRegist";  // Import MoneyRegist component
import MoneyCurrentMoney from "./MoneyCurrentMoneyChild"; 
import MoneyUseListChild from "./MoneyUseListChild"; 
import MoneySupport from "./MoneySupport";
import './Money.css';

export default class MoneyChild extends React.Component {
    
    state = {
        key: 0
    };

    reloadComponet = () => {
        this.setState({
            key: this.key + 1
        });
    };

    render() {
        return (
            <div className="background_image_renga">
                <Header />
            <main>
                {/* サポートキャラ */}
                <div id="Money_Support">
                   <MoneySupport  key={this.state.key}/>
                </div>
                <br />

                 {/* 利用記録 */}
                <div id="Money_Regist">
                   <MoneyRegist onReloadComponent={this.reloadComponet}/>
                </div>
                <br />

                 {/* 所持金 */}
                <div id="Money_CurrentMoney" class="money-container">
                   <MoneyCurrentMoney key={this.state.key}/>
                </div>
                
                 {/* お小遣い一覧 */}
                <div id="Money_List"  class="lists-container">
                   <MoneyUseListChild key={this.state.key} onReloadComponent={this.reloadComponet}/>
                </div>
                </main>
                <Footer />
            </div>
        );
    }
}