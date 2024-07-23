import React from 'react';
import './Header.css';
export default class ParentHeader extends React.Component{
    render(){
        return(
            <div className="parent_header">
                {/* ログアウトボタン */}
                <button className="header_logout" onClick={this.logout} >ログアウト</button>
                {/* 個人名 */}
                <div className="header_name">ひろし</div>
                <hr></hr>
            </div>
        );
    }
}