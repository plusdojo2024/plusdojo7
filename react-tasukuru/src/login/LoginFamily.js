import React from "react";
import LoginHeader from '../foundation/LoginHeader.js';
import LoginFooter from "../foundation/LoginFooter.js";
import './LoginFamily.css';

export default class LoginFamily extends React.Component {
    render() {
        return (
            <div>
                <div className="login_header">
                    <LoginHeader />
                </div>
                <div className="background_image_renga">
                    <div className="loginFamily_body">
                        <input type="text" placeholder="家族ID" className="textbox" /><br />
                        <input type="text" placeholder="パスワード" className="textbox" /><br />
                        <button className="loginMain_button">ログイン</button><br />
                        <button className="loginMain_button">新規登録</button><br />
                    </div>
                </div>
                <div className="login_footer">
                    <LoginFooter />
                </div>
            </div>
        );
    }
}
