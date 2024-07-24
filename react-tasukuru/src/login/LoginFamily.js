import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // axiosをインポートする
import LoginHeader from '../foundation/LoginHeader.js';
import LoginFooter from "../foundation/LoginFooter.js";
import './LoginFamily.css';


export default function LoginKids() {
    const [family_id, setFamilyId] = useState(""); // useStateフックを使ってfamily_idを状態として管理する
    const [pass, setPass] = useState(""); // useStateフックを使ってpassを状態として管理する    

    const navigate = useNavigate();

    const ReturnClick = () => {
        navigate('/login');
    };

    const loginDate = () => {
        const data = { family_id: family_id, pass: pass }; // 現在のstateからデータを取得する
        axios.post("/api/FamilyLogin/loginDate/", data)
            .then(response => {
                // リクエスト成功時の処理
                console.log(response.data); // レスポンスをログに出力するなど
                // 成功時に何らかの処理を行う場合はここに記述する
                if (response.data === "ログイン成功") {
                    navigate('/task');
                }
            })
            .catch(error => {
                // リクエスト失敗時の処理
                console.error('エラー:', error);
                console.log(data);
                // エラー時の処理を行う場合はここに記述する
            });
    }

    return (
        <div>
            <div className="login_header">
                <LoginHeader />
            </div>
            <div className="background_image_renga">
                <div className="loginFamily_body">
                <input type="text" placeholder="家族ID" className="textbox" value={family_id} onChange={(e) => setFamilyId(e.target.value)}/><br />
                <input type="text" placeholder="パスワード" className="textbox" value={pass} onChange={(e) => setPass(e.target.value)}/><br />
                    <button className="loginMain_button" onClick={loginDate}>ログイン</button><br />
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