import React from "react";
import Header from "../foundation/HeaderParent";
import Footer from "../foundation/FooterParent";
import MoneyAdd from "./MoneyAdd";  // MoneyAddコンポーネントをインポート
import MoneyCurrentMoney from "./MoneyCurrentMoney"; 
import MoneyUseList from "./MoneyUseList";
import './Money.css';



export default class MoneyParent extends React.Component  {

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
                <div className="container">
                {/* 所持金 */}
                <div id="Money_CurrentMoney" class="money-containers">
                   <MoneyCurrentMoney key={this.state.key} />
                </div>

                {/* お小遣い追加 */}
                <div id="Money_Add">
                   <MoneyAdd onReloadComponent={this.reloadComponet} />
                </div>
               </div>
               {/* お小遣い一覧 */}
               <div id="Money_List"  class="list-container">
                   <MoneyUseList onReloadComponent={this.reloadComponet}/>
                </div>
                
                </main>
                <Footer />
            </div>
        );
    }
}


