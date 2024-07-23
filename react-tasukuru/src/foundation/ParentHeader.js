import React from 'react';
import './Header.css';
export default class ParentHeader extends React.Component{
    render(){
        return(
            <div className="parent_header">
                {/* ログアウトボタン */}
                <button className="header_logout" onClick={this.logout} >ログアウト</button>
                {/* 個人名 */}
                <label for="toggle" onclick=""  for="menuToggle">ひろし</label>  
                <input type="checkbox" id="toggle" autocomplete="off"></input>
                <ul id="menu">  
                <li>LIST1</li>
                <li>LIST2</li>
                <li>LIST3</li>
                </ul>
                <hr></hr>
            </div>
            
        );
    }
}