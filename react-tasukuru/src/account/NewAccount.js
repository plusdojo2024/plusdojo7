import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from '../foundation/LoginHeader.js';
import LoginFooter from "../foundation/LoginFooter.js";
import './NewAccount.css';
import axios from 'axios';

export default function NewAccount() {
    const [family_id, setFamilyId] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const ReturnClick = () => {
        navigate('/loginFamily');
    };

    const accountDate = () => {
        const data = { familyId: family_id, mail: mail, pass: pass };
        axios.post("/api/NewAccount/accountAdd/", data)
            .then(response => {
                console.log(response.data);
                // レスポンスに応じた処理を記述する
                if (response.data === "OK") {
                    setTimeout(() => {
                        navigate('/loginFamily'); // 成功メッセージ表示後にログインページに移動
                    }, 2000); // 2秒後にログインページに移動（例）
                }
            })
            .catch(error => {
                console.error('エラー:', error);
                // エラー処理を記述する
                // ユーザーにエラーを通知する方法を考慮する
            });
    };

    return (
        <div>
            <div className="newaccount_header">
                <LoginHeader />
            </div>
            <div className="background_image_renga">
                <div className="newaccount_body">
                    <input type="text" placeholder="家族ID" className="textbox" value={family_id} onChange={(e) => setFamilyId(e.target.value)} /><br />
                    <input type="text" placeholder="メールアドレス" className="textbox" value={mail} onChange={(e) => setMail(e.target.value)} /><br />
                    <input type="text" placeholder="パスワード" className="textbox" value={pass} onChange={(e) => setPass(e.target.value)} /><br />
                    <button className="newaccount_button" onClick={accountDate}>登録</button><br />
                    <button className="newaccount_buttonR" onClick={ReturnClick}>←</button><br />
                </div>
            </div>
            <div className="newaccount_footer">
                <LoginFooter />
            </div>
        </div>
    );
}

