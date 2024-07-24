import React from "react";
import './Game.css';

export default class GameDice extends React.Component{
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
            
        // サイコロの所持数
    <div class="game_dice_countContent">
        <span id = ""></span>

        
        {/* サイコロのプルダウン      */}
    <div class="game_dice_content">
                   <select className = "game_dice"> 
                        <option >サイコロの数</option>
                        <option value="1">1個</option>
                        <option value="2">2個</option>
                        <option value="3">3個</option>
                        <option value="4">4個</option>
                        <option value="5">5個</option>
                        <option value="6">6個</option>
                        <option value="7">7個</option>
                        <option value="8">8個</option>
                        <option value="9">9個</option>
                        <option value="10">10個</option>
                   </select> 
    </div>
    </div>
            
    );
}
}
