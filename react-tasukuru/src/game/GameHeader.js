import React from 'react';
import './Game.css';
import NavigationButton from '../tasks/NavigationButton'
export default class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            CharacterSkin :"",
        }
    }

    componentDidMount() {
            
        // 子供ユーザーデータを取得
        fetch("/api/mypage/")
        .then(res => res.json())
        .then(CharacterSkin => {
            console.log(CharacterSkin); // 子供ユーザーデータをコンソールに出力（確認用）
            this.setState({ CharacterSkin });
        })
        .catch(error => console.error("エラー", error));
        
    }

    render(){
        const {CharacterSkin}=this.state;
        return(
            <div className="game_header">
                {/* ショップ遷移ボタン */}
                <NavigationButton path="/game/shopChild" label={<img src="images\ie_front_01_blue.png" alt="ショップ"></img>} className="game_header_shop" />
                {/* 個人名 */}
                <div className="game_header_name">しんのすけ</div>
                {/* アイコン */}
                <div className="game_header_icon">
                {CharacterSkin&&(
                <a href="/game/mypage">   
                <img src={CharacterSkin.characterImage} alt="アバター"></img></a>
                )}
                </div>
            </div>
        );
    }
}