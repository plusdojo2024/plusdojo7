import React from "react";
import './Game.css';
import Header from './GameHeader.js';
import Footer from '../foundation/Footer.js';
import './GameBattle.js';
import GameBattle from "./GameBattle.js";
import GameDaice from "./GameDice.js";

export default class Game extends React.Component{
    //親コンポーネントから受け取るデータなどがpropsに入っている。
    constructor(props) {
        super(props);
        //stateの設定。
        this.state = {
            enemies:[] ,
            id:"",
            hp:"",
            drop:"",
            name: "",
            image: "",
            }

    } 
    
    
    render(){
        //画面項目に連動するstateはここで宣言する。
        // const { id, hp, drop, name, image } = this.state;
        return (    
                
            <div id="body">
                <Header />

                <main>
                    <GameBattle />
                    <GameDaice />
                </main>

                <Footer />
            </div>
            
    );
}
}
