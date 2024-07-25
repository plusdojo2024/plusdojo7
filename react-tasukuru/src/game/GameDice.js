import React from "react";
import './Game.css';

export default class GameDice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AttackModal: false,  // 攻撃モーダルの表示状態
            selectedDiceCount: "1"  // 選択されたサイコロの数の初期値
        };
    }

    // 攻撃モーダルの表示切替
    toggleAttackModal = () => {
        this.setState(prevState => ({
            AttackModal: !prevState.AttackModal
        }));
    }

    // 攻撃ボタンがクリックされた時の処理
    handleAttack = () => {
        this.toggleAttackModal(); // モーダルを表示する
    }

    // モーダル内の攻撃ボタンがクリックされた時の処理
    handleModalAttack = () => {
        const { handleAttack, currentEnemy } = this.props;
        const { selectedDiceCount } = this.state;

        // 選択されたサイコロの数に応じたダメージ計算
        const damage = this.rollDice(parseInt(selectedDiceCount, 10));
        handleAttack(currentEnemy.id, damage); // 親コンポーネントの攻撃処理を呼び出す
        this.toggleAttackModal(); // モーダルを閉じる
    }

    // サイコロを振る（ランダムな数値を返す）
    rollDice = (count) => {
        let totalDamage = 0;
        for (let i = 0; i < count; i++) {
            // サイコロの目は1から6のランダムな整数と仮定（実際のゲームルールに応じて変更）
            const diceResult = Math.floor(Math.random() * 6) + 1;
            totalDamage += diceResult;
        }
        return totalDamage;
    }

    // サイコロの数を選択した時の処理
    handleDiceCountChange = (e) => {
        this.setState({
            selectedDiceCount: e.target.value
        });
    }

    render() {
        const { AttackModal } = this.state;

        return (
            <div className="game_content">
                <div className="background_image_renga">
                    {/* サイコロ所持数 */}
                    <div className="game_dice_count">サイコロ<br /><span id="dice_count">999</span>個所持</div>

                    {/* サイコロのプルダウン */}
                    <div className="game_dice_content">
                        <select className="game_dice" value={this.state.selectedDiceCount} onChange={this.handleDiceCountChange}>
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
                        {/* 攻撃ボタン */}
                        <div className="game_attack">
                            <button id="attack" onClick={this.handleAttack}>
                                <span>攻撃！</span>
                                <div className="game_pig">
                                    <img src="images/buta.png" alt="豚" />
                                </div>
                            </button>
                            {/* 攻撃モーダル */}
                            {AttackModal &&
                                <div id="Attackoverlay">
                                    <div id="Attackcontent">
                                        <br />
                                        <button onClick={this.handleModalAttack}>攻撃</button>
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
