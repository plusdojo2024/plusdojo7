import React from "react";
import './Game.css';

export default class GameBattle extends React.Component{
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
        const { id, hp, drop, name, image } = this.state;
        return (    
                
    <div id="game_body">
            <div className="game_enemies_icon">
                <img src="images\character_monster_dragon_01_red.png" alt="敵キャラクター"></img>
            </div>     
    </div>
            
    );
}
}
