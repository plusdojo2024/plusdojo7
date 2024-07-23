import React from "react";
import './Start.css';
import { useNavigate } from "react-router-dom"; // useNavigate をインポートする

export default function LoginKids() {
    const navigate = useNavigate(); // useNavigate フックを使ってナビゲーションオブジェクトを取得する
    
    const ReturnClick = () => {
        // ボタンがクリックされたら /login に遷移する
        navigate('/login');
    };

    return (
        <div className="Start" onClick={ReturnClick}>
            <img src="./images/tasukuru.png" className="start" alt="start" />
        </div>
    );
}