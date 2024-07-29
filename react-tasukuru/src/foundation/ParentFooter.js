import React from 'react';
import './Footer.css';
import NavigationButton from '../tasks/NavigationButton';
export default class ParentFooter extends React.Component{
    render(){
        return(
            <div className="parent_footer">
                <div className="footer_allicons">
                    <NavigationButton path="/task" label={<img className="footer_icon" src="../images/1415.png" alt="タスク" />} className="footer_button" />
                    <NavigationButton path="/money/child" label={<img className="footer_icon" src="../images/849.png" alt="おこづかい" />} className="footer_button" />
                    <NavigationButton path="/game" label={<img className="footer_icon" src="../images/ic060.png" alt="ゲーム" />} className="footer_button" />
                </div>
            </div>
        )
    }
}
