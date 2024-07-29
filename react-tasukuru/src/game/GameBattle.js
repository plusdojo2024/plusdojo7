import React from "react";
import './Game.css';

export default class GameBattle extends React.Component {
    
    render() {
        const { currentEnemy } = this.props;
        // const currentEnemy = enemy; // 仮で最初の敵キャラを表示
        
        return (    
            <div id="game_body">
                {currentEnemy && (
                    <div className="game_enemies_icon">
                        <div class="enemy-hp"> 
                            HP: <span id="enemy-hp">{currentEnemy.hp}</span>
                           
                        </div>
                        <div class="enemy-health-bar">
                        <div class="health-bar-bg">
                        
                        <div className="health-bar-fill" id="health-bar"></div>
                        </div>
                        </div> 

                            <div class="enemy-name-text">{currentEnemy.name}</div>
                        
                        <img src={currentEnemy.image} alt={currentEnemy.name}></img>
                        

                        
                    </div>
                )}
            </div>
        );
    }
}
