import React from "react";
import './Diaries.css';
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";

export default class Diaries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UnreadDiarieModal: false,
            LookedDiarieModal: false,
            GetDiceModal: false,
            GuardianUnreadDiarieModal: false,
        };

        this.UnreadDiarie = this.UnreadDiarie.bind(this);
        this.LookedDiarie = this.LookedDiarie.bind(this);
        this.GetDice = this.GetDice.bind(this);
        this.GuardianUnreadDiarie = this.GuardianUnreadDiarie.bind(this);
        this.toggleUnreadModal = this.toggleUnreadModal.bind(this);
        this.toggleLookedModal = this.toggleLookedModal.bind(this);
        this.toggleDiceModal = this.toggleDiceModal.bind(this);
        this.toggleGuardianUnreadDiarieModal = this.toggleGuardianUnreadDiarieModal.bind(this);
    }

    //未読日記処理
    UnreadDiarie(index) {
        this.toggleUnreadModal();
    }
    //既読日記処理
    LookedDiarie(index) {
        this.toggleLookedModal();
    }
    //サイコロ入手処理
    GetDice(index) {
        this.toggleDiceModal();
    }
    //保護者用未読日記処理
    GuardianUnreadDiarie(index) {
        this.toggleGuardianUnreadDiarieModal();
    }

    //未読モーダルウィンドウ表示切り替え
    toggleUnreadModal() {
        const { UnreadDiarieModal } = this.state;
        this.setState({
            UnreadDiarieModal: !UnreadDiarieModal,
        });
    }
    //既読モーダルウィンドウ表示切り替え
    toggleLookedModal() {
        const { LookedDiarieModal } = this.state;
        this.setState({
            LookedDiarieModal: !LookedDiarieModal,
        });
    }
    //サイコロ入手表示切り替え
    toggleDiceModal() {
        const { GetDiceModal } = this.state;
        this.setState({
            GetDiceModal: !GetDiceModal,
        });
    }
    //保護者用日記表示切り替え
    toggleGuardianUnreadDiarieModal() {
        const { GuardianUnreadDiarieModal } = this.state;
        this.setState({
            GuardianUnreadDiarieModal: !GuardianUnreadDiarieModal,
        });
    }


    render() {
        const { UnreadDiarieModal, LookedDiarieModal, GetDiceModal, GuardianUnreadDiarieModal } = this.state;
        return (
            <div className="background_image_renga_diaries">
                <div className="Diaries_background"></div>
                <Header />
                {/*日記リストの表示*/}
                <div id="Diaries_body">
                    
                    <h1>日記</h1>
                    {/* <table >
                        <thead>
                            <tr>
                                <th>ひづけ</th>
                                <th>たいとる</th>
                            </tr>
                        </thead>
                    </table> */}
                    <button onClick={() => this.UnreadDiarie()}>未読日記です</button><br />
                    <button onClick={() => this.LookedDiarie()}>既読日記です</button><br />
                    <button onClick={() => this.LookedDiarie()}>既読日記です</button><br />
                    <button onClick={() => this.GuardianUnreadDiarie()}>保護者用未読日記</button><br />
                </div>
                
                {/*未読日記モーダル*/}
                {UnreadDiarieModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <button onClick={this.toggleUnreadModal}>とじる</button><br />
                            ここに日付<br />
                            title<br />
                            reply<br />
                            <button onClick={this.toggleDiceModal}>サイコロをもらう</button>
                        </div>
                        
                    </div>
                )}

                {/*既読日記モーダル*/}
                {LookedDiarieModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <button onClick={this.toggleLookedModal}>とじる</button><br />
                            ここに日付<br />
                            title<br />
                            reply<br />
                        </div>
                        
                    </div>
                )}

                {/*サイコロ入手モーダル*/}
                {GetDiceModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            サイコロを手にいれたよ！<br />
                            <button onClick={() => { this.toggleDiceModal(); this.toggleUnreadModal(); }}>とじる</button><br />
                        </div>
                    </div>
                )} *

                {/* 保護者用日記モーダル*/}
                {GuardianUnreadDiarieModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <button onClick={this.toggleGuardianUnreadDiarieModal}>とじる</button><br />
                            ここに日付<br />
                            title<br />
                            返信<br />
                            <input type="text" className="Diaries_input" placeholder="返信内容"></input><br /><br />
                            <button onClick={this.toggleGuardianUnreadDiarieModal}>既読にする</button>
                        </div>
                        
                    </div>
                )} 

                {/*
                //------------------------------------
                //日記記入モーダル
                //------------------------------------
                {GetDiceModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>日記</h1>
                            <input type="text" placeholder="タイトル"></input><br /><br />
                            <input type="text" className="Diaries_input" placeholder="内容"></input><br /><br />
                            <button onClick={()=>{  }}>提出</button> 　　　　 
                            <button onClick={() => {  }}>とじる</button><br />
                        </div>
                    </div>
                )}
                    */}
            <Footer />
            </div>
        );
    }
}