import React from 'react';
import './Header.css';
export default class ParentHeader extends React.Component{
    render(){
        return(
            <div className="parent_header">
                {/* ログアウトボタン */}
                <button className="header_logout" onClick={this.logout} >ログアウト</button>
                {/* 個人名 */}
                
        <select className = "parent_header_childName"> 
            <option className="parent_header_otherName" >ひろし</option>
                <option value="1" className="parent_header_otherName">りょうたろう</option>
                <option value="2" className="parent_header_otherName">あつし</option>
                
        </select> 
                <hr></hr>
            </div>
            
        );
    }
}