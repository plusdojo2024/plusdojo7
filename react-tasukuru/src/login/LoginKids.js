import React from "react";
import LoginHeader from '../foundation/LoginHeader.js';
import LoginFooter from "../foundation/LoginFooter.js";
import './LoginKids.css';

export default class LoginKids extends React.Component {
    render() {
        return (
            <div>
                <div className="login_header">
                    <LoginHeader />
                </div>
                <div className="background_image_renga">
                    <div className="loginKids_body">
                        <input type="text" placeholder="家族ID" className="textbox" /><br />
                        <input type="text" placeholder="なまえ" className="textbox" /><br />
                        <button className="loginMain_button">ろぐいん</button><br />
                    </div>
                </div>
                <div className="login_footer">
                    <LoginFooter />
                </div>
            </div>
        );
    }
}