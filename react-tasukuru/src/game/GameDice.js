import React from "react";
import './Game.css';

export default class GameDice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDiceCount: 1,  // 選択されたサイコロの数の初期値
            kidUserData : null,
            diceCount : "",
            damage : 0,
        };
    }

    componentDidMount() {
            
        // 子供ユーザーデータを取得
        fetch("/api/kids/currentUser/")
        .then(res => res.json())
        .then(kidUserData => {
            console.log(kidUserData); // 子供ユーザーデータをコンソールに出力（確認用）
            this.setState({ kidUserData });
        })
        .catch(error => console.error("Error fetching kid user data:", error));


    }

    

    // 攻撃ボタンがクリックされた時の処理
    handleAttack = () => {
        const { kidUserData, selectedDiceCount } = this.state;
        if (kidUserData.diceCount >= selectedDiceCount) {
            const { handleAttack, currentEnemy } = this.props;
            const { selectedDiceCount, kidUserData } = this.state;

            // 選択されたサイコロの数に応じたダメージ計算
            const damage = this.rollDice(selectedDiceCount);

            handleAttack(currentEnemy.id, damage);
            // サイコロ数を減らす
                const newDiceCount = kidUserData.diceCount - selectedDiceCount;
                this.setState(prevState => ({
                    kidUserData: {
                        ...prevState.kidUserData,
                        diceCount: newDiceCount
                    }

                }), () => {
                    // //攻撃した後、残るサイコロ数をデータベースに保存する
                    fetch('/api/kids/currentUser/updateDiceCount', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            newDiceCount: newDiceCount
                        })
                    })

                    .then(response => response.json())
                    .then(data => {
                        console.log('Dice count updated successfully:', data);
                    })
                    .catch((error) => {
                        console.error('Error updating dice count:', error);
                    });
                });
                alert("サイコロ数："+selectedDiceCount + "\n" + "ダメージ："+damage)
                        
        } else {
            alert("サイコロが足りません！");
        }
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
        const { kidUserData } = this.state;

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
                                <div>攻撃！</div>
                                <div className="game_pig">
                                    <img src="images/buta.png" alt="豚" />
                                </div>
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}