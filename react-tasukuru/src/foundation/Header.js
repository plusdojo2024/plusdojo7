import React from 'react';

export default class Header extends React.Component{
    render(){
        return(
            <div className="header">
                {/* ログアウトボタン */}
                <button className="header_logout" onClick={this.logout} >ログアウト</button>
                {/* 個人名 */}
                <div className="header_name">ひろし</div>
                {/* アイコン */}
                <div className="header_icon">
                    <img src="\Users\User\Downloads\character_yusha_01_red.png"></img>
                </div>
            </div>
        );
    }
}