import React from "react";
import './Game.css';

export default class GameDice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AttackModal: false,  // 攻撃モーダルの表示状態
            selectedDiceCount: "1",  // 選択されたサイコロの数の初期値
            kidUserData : null,
            diceCount : "",
        };
    }

    componentDidMount() {
            
        // 子供ユーザーデータを取得
        fetch("/api/kids/2/")
        .then(res => res.json())
        .then(kidUserData => {
            console.log(kidUserData); // 子供ユーザーデータをコンソールに出力（確認用）
            this.setState({ kidUserData });
        })
        .catch(error => console.error("Error fetching kid user data:", error));


    }

    // 攻撃モーダルの表示切替
    toggleAttackModal = () => {
        this.setState(prevState => ({
            AttackModal: !prevState.AttackModal
        }));
    }

    // 攻撃ボタンがクリックされた時の処理
    handleAttack = () => {
        const { kidUserData, selectedDiceCount } = this.state;
        if (kidUserData.diceCount >= selectedDiceCount) {
            this.toggleAttackModal(); // モーダルを表示する
        } else {
            alert("サイコロが足りません！");
        }
    }

    // モーダル内の攻撃ボタンがクリックされた時の処理
    handleModalAttack = () => {
        const { handleAttack, currentEnemy } = this.props;
        const { selectedDiceCount,kidUserData } = this.state;

        // 選択されたサイコロの数に応じたダメージ計算
        const damage = this.rollDice(parseInt(selectedDiceCount, 10));
        handleAttack(currentEnemy.id, damage); // 親コンポーネントの攻撃処理を呼び出す

        // サイコロ数を減らす
        const newDiceCount = kidUserData.diceCount - selectedDiceCount;
        this.setState(prevState => ({
            kidUserData: {
                ...prevState.kidUserData,
                diceCount: newDiceCount
            }
        }));
        
        //攻撃して残るサイコロ数をデータベースに保存する
        this.saveDiceCount(newDiceCount,kidUserData.id);

        this.toggleAttackModal(); // モーダルを閉じる
    }

     // 攻撃して残るサイコロ数をデータベースに保存する
    saveDiceCount = (newDiceCount, userId) => {
        fetch(`/api/kids/${userId}/dice`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDiceCount)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Dice count updated:", data);
        })
        .catch(error => {
            console.error("Error updating dice count:", error);
        });
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
        const { AttackModal,kidUserData } = this.state;

        return (
            <div className="game_content">
                <div className="background_image_renga">

                    {/* サイコロ所持数 */}
                    {kidUserData && (
                        <div>
                            <div className="game_dice_count">サイコロ<br /><span id="dice_count"> {kidUserData.diceCount} 個</span></div>
                            
                            
                        </div>
                    )}                

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
                            {/* {AttackModal &&
                                <div id="Attackoverlay">
                                    <div id="Attackcontent">
                                        <br />
                                        <button onClick={this.handleModalAttack}>攻撃</button>
                                    </div>
                                </div>
                            } */}

                            {AttackModal && (
                            <div className="attack_modal">
                                <div className="modal_content">
                                    <p>サイコロの数: {this.state.selectedDiceCount}</p>
                                    <p>ダメージ: {this.rollDice(parseInt(this.state.selectedDiceCount, 10))}</p>
                                    <button onClick={this.handleModalAttack}>攻撃する</button>
                                    <button onClick={this.toggleAttackModal}>キャンセル</button>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
