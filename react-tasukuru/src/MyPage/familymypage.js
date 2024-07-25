import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // axiosをインポートする
import ParentHeader from '../foundation/ParentHeader.js';
import ParentFooter from "../foundation/ParentFooter.js";
import './familymypage.css';


export default function FamilyMyPage() {
    const [family_id, setFamilyId] = useState(""); // useStateフックを使ってfamily_idを状態として管理する
    const [pass, setPass] = useState(""); // useStateフックを使ってpassを状態として管理する    

    const navigate = useNavigate();

    const ReturnClick = () => {
        navigate('/login');
    };
    const NewAccountClick = () => {
        navigate('/newaccount');
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
                <ParentHeader />
            </div>
            <div className="background_image_renga">
                <div className="loginFamily_body">
                <input type="text" placeholder="家族ID" className="textbox" value={family_id} onChange={(e) => setFamilyId(e.target.value)}/><br />
                <input type="text" placeholder="パスワード" className="textbox" value={pass} onChange={(e) => setPass(e.target.value)}/><br />
                    <button className="loginMain_button" onClick={loginDate}>ログイン</button><br />
                    <button className="loginMain_button" onClick={NewAccountClick}>新規登録</button><br />
                    <button className="loginR_button" onClick={ReturnClick}>←</button><br />
                </div>
            </div>
            <div className="login_footer">
                <ParentFooter />
            </div>
        </div>
    );
}