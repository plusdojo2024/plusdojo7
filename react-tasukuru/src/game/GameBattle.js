import React from "react";
import './Game.css';

export default class GameBattle extends React.Component {
    render() {
        const { enemies } = this.props;
        const currentEnemy = enemies[0]; // 仮で最初の敵キャラを表示

        return (    
            <div id="game_body">
                {currentEnemy && (
                    <div className="game_enemies_icon">
                        <img src={currentEnemy.image} alt={currentEnemy.name}></img>
                        <div>{currentEnemy.name}</div>
                        <div>HP: {currentEnemy.hp}</div>
                    </div>
                )}
            </div>
        );
    }
}
