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
            currentEnemyIndex: 0,  // 現在の敵キャラクターのインデックス
            currentEnemyHp:0,
            kidUserData:""
        };
    }

    componentDidMount() {
        fetch("/api/game/enemies")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.text(); // Use .text() to debug the response
            })
            .then(text => {
                console.log(text); // Log the raw response text
                const json = JSON.parse(text); // Parse the text to JSON
                this.setState({ 
                    enemies: json.enemies,
                    currentEnemyIndex: json.currentEnemyId,
                    currentEnemyHp: json.currentEnemyHp
                });
            })

            fetch("/api/kids/currentUser/")
            .then(res => res.json())
            .then(kidUserData => {
            console.log(kidUserData); // 子供ユーザーデータをコンソールに出力（確認用）
            this.setState({ kidUserData });
        })
            .catch(error => console.error("Error fetching enemies:", error));
    }

   

        // 攻撃処理
        handleAttack = (enemyId, damage) => {
            const { kidUserData } = this.state;
            fetch(`/api/enemies/${enemyId}/damage/${damage}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();

                //次に表示する、enemy_idとhpをapiからのresponseで受取る。
            })
            .then(json => {
                console.log(json);

                if(this.state.currentEnemyIndex != json.enemieId - 1 ){
                    alert("敵を倒しました。");
                    
                }

                this.setState({ 
                    currentEnemyIndex: json.enemieId - 1,
                    currentEnemyHp: json.enemieHp
                });

            })
            
            // const index = enemies.findIndex(enemy => enemy.id === enemyId);
            // if (index !== -1) {
            //     const updatedEnemies = [...enemies];
            //     const updatedEnemy = { ...updatedEnemies[index] };
            //     updatedEnemy.hp -= damage;
            //     if (updatedEnemy.hp <= 0) {
            //         // HPがゼロ以下になった場合は次の敵キャラを表示する
            //         alert("敵を倒しました。");
            //         updatedEnemies.splice(index, 1);  // 現在の敵キャラを削除
            //         this.setState({ enemies: updatedEnemies });
            //     } else {
            //         updatedEnemies[index] = updatedEnemy;  // 更新した敵キャラを保存
            //         this.setState({ enemies: updatedEnemies });
            //     }
            // }
        }

        //攻撃処理
        // handleAttack = (enemyId, damage) => {
        //     console.log("Attack: Enemy ID = " + enemyId + ", Damage = " + damage); // Debug output

        //     fetch(`/api/enemies/${enemyId}/damage/${damage}`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     .then(res => {
        //         if (!res.ok) {
                    
        //             throw new Error('Network response was not ok');
        //         }
        //         return res.json(); // Parse the JSON response from the backend
        //     })
        //     .then(updatedEnemy => {
                
        //         console.log("Updated Enemy: ", updatedEnemy); // Debug output
        //         // After updating in the backend, update the frontend state
        //         const { enemies } = this.state;
        //         const index = enemies.findIndex(enemy => enemy.id === enemyId);
        //         if (index !== -1) {
        //             const updatedEnemies = [...enemies];
        //             updatedEnemies[index] = updatedEnemy;  // Use the updated enemy from the backend

        //             if (updatedEnemy.hp <= 0) {
        //                 alert("敵を倒しました。");
        //                 updatedEnemies.splice(index, 1);
                    
        //             } 
        //             this.setState({ enemies: updatedEnemies });
                    
        //         }
        //     })
        //     .catch(error => console.error("Error updating enemy HP:", error));
        // }

    render() {
        const { enemies, currentEnemyIndex, currentEnemyHp } = this.state;

        return (
            <div id="body">
                <Header />
                <div>
                    {/* GameBattleコンポーネントに敵キャラデータを渡す */}
                    <GameBattle 
                        currentEnemy={enemies[currentEnemyIndex]} 
                        currentEnemyHp={currentEnemyHp} 
                    />
                    {/* GameDiceコンポーネントに敵キャラデータと攻撃処理を渡す */}
                    {enemies.length > 0 && (
                        <GameDice
                            currentEnemy={enemies[currentEnemyIndex]}
                            handleAttack={this.handleAttack}
                        />
                    )}
                </div>
                <Footer />
            </div>
        );
    }
}