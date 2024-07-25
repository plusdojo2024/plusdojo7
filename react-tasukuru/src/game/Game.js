import React, { Component } from "react";
import Header from './GameHeader.js';
import Footer from '../foundation/Footer.js';
import GameBattle from "./GameBattle.js";
import GameDice from "./GameDice.js";
import './Game.css';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enemies: [],  // 敵キャラクターのデータ
            currentEnemyIndex: 0  // 現在の敵キャラクターのインデックス
        };
    }

    componentDidMount() {
        // ゲームデータの取得
        fetch("/api/game/enemies")
            .then(res => res.json())
            .then(json => {
                console.log(json); // データをコンソールに出力（確認用）
                this.setState({ enemies: json });
            })
            .catch(error => console.error("Error fetching enemies:", error));
    }

    // 攻撃処理
    handleAttack = (enemyId, damage) => {
        const { enemies } = this.state;
        const index = enemies.findIndex(enemy => enemy.id === enemyId);
        if (index !== -1) {
            const updatedEnemies = [...enemies];
            const updatedEnemy = { ...updatedEnemies[index] };
            updatedEnemy.hp -= damage;
            if (updatedEnemy.hp <= 0) {
                // HPがゼロ以下になった場合は次の敵キャラを表示する
                updatedEnemies.splice(index, 1);  // 現在の敵キャラを削除
                this.setState({ enemies: updatedEnemies });
            } else {
                updatedEnemies[index] = updatedEnemy;  // 更新した敵キャラを保存
                this.setState({ enemies: updatedEnemies });
            }
        }
    }

    render() {
        const { enemies, currentEnemyIndex } = this.state;

        return (
            <div id="body">
                <Header />
                <main>
                    {/* GameBattleコンポーネントに敵キャラデータを渡す */}
                    <GameBattle enemies={enemies} />
                    {/* GameDiceコンポーネントに敵キャラデータと攻撃処理を渡す */}
                    {enemies.length > 0 && (
                        <GameDice
                            currentEnemy={enemies[currentEnemyIndex]}
                            handleAttack={this.handleAttack}
                        />
                    )}
                </main>
                <Footer />
            </div>
        );
    }
}
