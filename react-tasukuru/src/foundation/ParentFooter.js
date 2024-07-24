import React from 'react';
import './Footer.css';
export default class ParentFooter extends React.Component{
    render(){
        return(
            <div className="parent_footer">
                <div className="footer_allicons">
                    <img className="footer_icon"src="../images/1415.png" alt="タスク"></img>
                    <img className="footer_icon"src="../images/849.png" alt="おこづかい"></img>
                    <img className="footer_icon"src="../images/728.png" alt="ゲーム"></img>
                </div>
            </div>
        )
    }
}
