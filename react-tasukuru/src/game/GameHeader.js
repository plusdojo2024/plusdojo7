import React from 'react';
import './Game.css';
export default class Header extends React.Component{
    render(){
        return(
            <div className="game_header">
                {/* ショップ遷移ボタン */}
                <div className="game_header_shop">
                <a href="/game/shopChild"><img src="images\ie_front_01_blue.png" alt="ショップ"></img></a>
                </div>
                {/* 個人名 */}
                <div className="game_header_name">しんのすけ</div>
                {/* アイコン */}
                <div className="game_header_icon">
                <img src="images\character_yusha_01_red.png" alt="アバター"></img>
                </div>
            </div>
        );
    }
}