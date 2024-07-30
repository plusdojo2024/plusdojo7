import React from "react";
import './Game.css';

export default class GameBattle extends React.Component {

    calculateHealthPercentage = (currentHp, maxHp) => {
        return (currentHp / maxHp) * 100;
    }

    
    render() {
        const { currentEnemy, currentEnemyHp } = this.props;
        // const currentEnemy = enemy; // 仮で最初の敵キャラを表示
        // const healthPercentage = this.calculateHealthPercentage(currentEnemyHp, 500);
        
        return (    
            <div id="game_body">
                {currentEnemy && (
                    <div className="game_enemies_icon">
                        <div class="enemy-hp"> 
                            HP: <span id="enemy-hp">{currentEnemyHp}</span>
                           
                        </div>
                        <div class="enemy-health-bar">
                        <div class="health-bar-bg">
                        
                        <div className="health-bar-fill" id="health-bar"  style={{ width: `${this.calculateHealthPercentage(currentEnemyHp, currentEnemy.hp)}%` }} ></div>
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
