import React from "react";
import LoginHeader from '../foundation/LoginHeader.js';
import LoginFooter from "../foundation/LoginFooter.js";
import './Login.css';

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <div className="login_header">
                    <LoginHeader />
                </div>
                <div className="background_image_renga">
                    <body className="login_body">
                        <button className="loginF_button">保護者</button><br />
                        <button className="loginK_button">こども</button>
                    </body>
                </div>
                <div className="login_footer">
                    <LoginFooter />
                </div>
            </div>
        );
    }
}