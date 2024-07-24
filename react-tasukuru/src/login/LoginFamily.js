import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate をインポートする
import LoginHeader from '../foundation/LoginHeader.js';
import LoginFooter from "../foundation/LoginFooter.js";
import './LoginFamily.css';

export default function LoginKids() {


        this.state = {
            family_id :"",
            pass : "",
        }


    const navigate = useNavigate(); // useNavigate フックを使ってナビゲーションオブジェクトを取得する
    
    const ReturnClick = () => {
        // ボタンがクリックされたら /login に遷移する
        navigate('/login');
    };
/*    loginDate = () => {
        const {diaries,title,content} = this.state;
        const data = {title : title, content : content};
        axios.post("/api/login/loginDate/",data)
    }
*/
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
                    <button className="loginR_button" onClick={ReturnClick}>←</button><br />
                </div>
            </div>
            <div className="login_footer">
                <LoginFooter />
            </div>
        </div>
    );
}