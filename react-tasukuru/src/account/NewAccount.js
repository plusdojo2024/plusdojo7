import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate をインポートする
import LoginHeader from '../foundation/LoginHeader.js';
import LoginFooter from "../foundation/LoginFooter.js";
import './NewAccount.css';

export default function NewAccount() {
    const navigate = useNavigate(); // useNavigate フックを使ってナビゲーションオブジェクトを取得する
    
    const ReturnClick = () => {
        // ボタンがクリックされたら /login に遷移する
        navigate('/login');
    };

    return (
        <div>
            <div className="login_header">
                <LoginHeader />
            </div>
            <div className="background_image_renga">
                <div className="account_body">
                    <input type="text" placeholder="家族ID" className="textbox" /><br />
                    <input type="text" placeholder="メールアドレス" className="textbox" /><br />
                    <input type="text" placeholder="パスワード" className="textbox" /><br />
                    <input type="text" placeholder="確認用パスワード" className="textbox" /><br />
                    <button className="account_button">登録</button><br />
                    <button className="accountR_button" onClick={ReturnClick}>←</button><br />
                </div>
            </div>
            <div className="login_footer">
                <LoginFooter />
            </div>
        </div>
    );
}