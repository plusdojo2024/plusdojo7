import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate をインポートする
import LoginHeader from '../foundation/LoginHeader.js';
import LoginFooter from "../foundation/LoginFooter.js";
import './Login.css';

export default function Login() {
    const navigate = useNavigate(); // useNavigate フックを使ってナビゲーションオブジェクトを取得する

    const FamilyClick = () => {
        // ボタンがクリックされたら /loginFamily に遷移する
        navigate('/loginFamily');
    };

    const KidsClick = () => {
        // ボタンがクリックされたら /loginFamily に遷移する
        navigate('/loginKids');
    };

    return (
        <div>
            <div className="login_header">
                <LoginHeader />
            </div>
            <div className="background_image_renga">
                <div className="login_body">
                    <button className="loginF_button" onClick={FamilyClick}>保護者</button><br />
                    <button className="loginK_button" onClick={KidsClick}>こども</button><br />
                </div>
            </div>
            <div className="login_footer">
                <LoginFooter />
            </div>
        </div>
    );
}