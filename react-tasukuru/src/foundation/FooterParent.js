import React from 'react';
import NavigationButton from '../tasks/NavigationButton';
import './Footer.css';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div className="footer_allicons">
                    <NavigationButton path="/approval" label={<img className="footer_icon" src="../images/1415.png" alt="タスク" />} className="footer_button" />
                    <NavigationButton path="/money/parent" label={<img className="footer_icon" src="../images/849.png" alt="おこづかい" />} className="footer_button" />
                    <NavigationButton path="/game/shopParent" label={<img className="footer_icon" src="../images/728.png" alt="ショップ" />} className="footer_button" />
                </div>
            </div>
        );
    }
}