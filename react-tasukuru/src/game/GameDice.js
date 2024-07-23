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
            AttackModal:false
            }
    } 
    onChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    }
    Attack(index) {
        this.toggleAttackModal();
    }   
    //攻撃のモーダル
    toggleAttackModal() {
        const { AttackModal,} = this.state;
        this.setState({
            AttackModal: !AttackModal,
            
        });
    }
    render(){
        //画面項目に連動するstateはここで宣言する。
        const{AttackModal} = this.state;
        const { id, hp, drop, name, image } = this.state;
        
        return (
        <div class = "game_content">   
        <div className="background_image_renga">
            {/* サイコロ所持数 */}
        <div class="game_dice_count">サイコロ<br /><span id = "dice_count"></span>999個所持</div>

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
    {/* 攻撃ボタン     */}
    <div className = "game_attack">
        <button id="attack" onClick={() =>this.Attack()}>
        <span>攻撃！</span>
            <div class = "game_pig">
                <img src="images\buta.png" alt="豚"></img>
            </div>
        </button>
        {AttackModal &&
                <div id="Attackoverlay">
                    <div id= "Attackcontent">
                        <br />
                        <button onClick={() =>this.toggleAttackModal()}>攻撃</button>
                    </div>
                </div>
            }
    </div>

    </div>  

    </div>

    </div>
    );
}
}
