import React from "react";
import './Diaries.css';
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";
import DiariesList from "./DiariesList";

export default class Diaries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diaries: [],
            UnreadDiarieModal: false,
            LookedDiarieModal: false,
            GetDiceModal: false,
            GuardianUnreadDiarieModal: false,
            SubmitModal: false,
        };

        this.UnreadDiarie = this.UnreadDiarie.bind(this);
        this.LookedDiarie = this.LookedDiarie.bind(this);
        this.GetDice = this.GetDice.bind(this);
        this.GuardianUnreadDiarie = this.GuardianUnreadDiarie.bind(this);
        this.SubmitDiarie = this.SubmitDiarie.bind(this);
        this.toggleUnreadModal = this.toggleUnreadModal.bind(this);
        this.toggleLookedModal = this.toggleLookedModal.bind(this);
        this.toggleDiceModal = this.toggleDiceModal.bind(this);
        this.toggleGuardianUnreadDiarieModal = this.toggleGuardianUnreadDiarieModal.bind(this);
        this.toggleSubmitModal = this.toggleSubmitModal.bind(this);
    }

    componentDidMount() {
        fetch("/api/diary/")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                diaries: json
            });
        });
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
    //保護者用未読日記処理
    SubmitDiarie(index) {
        this.toggleSubmitModal();
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
    //保護者用日記表示切り替え
    toggleSubmitModal() {
        const { SubmitModal } = this.state;
        this.setState({
            SubmitModal: !SubmitModal,
        });
    }


    render() {
        const {diaries, UnreadDiarieModal, LookedDiarieModal, GetDiceModal, GuardianUnreadDiarieModal, SubmitModal } = this.state;
        return (
            <div className="background_image_renga_diaries">
                <div className="Diaries_background"></div>
                <Header />
                {/*日記リストの表示*/}
                <div id="Diaries_body">
                    
                    <h1>日記</h1>
                    <tbody>
                            {diaries.map((diary, index) => {
                                const dateOnly = new Date(diary.date).toISOString().split('T')[0];
                                return (
                                    <tr class="bookrow" key={index}>
                                        <td className="dateOnly">{dateOnly}</td>
                                        <td className="title">{diary.title}</td>
                                        {/* <td className="content">{diary.content}</td>
                                        <td className="reply">{diary.reply}</td> */}
                                        <td className="action">
                                            <button onClick={() => this.modBook(index)}>提出</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    <button onClick={() => this.UnreadDiarie()}>未読日記です</button><br />
                    <button onClick={() => this.LookedDiarie()}>既読日記です</button><br />
                    <button onClick={() => this.LookedDiarie()}>既読日記です</button><br />
                    <button onClick={() => this.GuardianUnreadDiarie()}>保護者用未読日記</button><br />
                    <button onClick={() => this.SubmitDiarie()}>確認</button><br />
                    
                </div>
                
                {/*未読日記モーダル*/}
                {UnreadDiarieModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <button className="close_button" onClick={this.toggleUnreadModal}>とじる</button><br />
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
                )} 

                {/* 保護者用日記モーダル*/}
                {GuardianUnreadDiarieModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <button onClick={this.toggleGuardianUnreadDiarieModal}>とじる</button><br />
                            ここに日付<br />
                            title<br />
                            返信<br />
                            <input type="text" className="Diaries_input" placeholder="返信内容"></input><br /><br />
                            <button className="Diaries_read_button" onClick={this.toggleGuardianUnreadDiarieModal}>既読にする</button>
                        </div>
                    </div>
                )} 

                {SubmitModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>日記</h1>
                            <input type="text" placeholder="タイトル"></input><br /><br />
                            <input type="text" className="Diaries_input" placeholder="内容"></input><br /><br />
                            <button onClick={this.toggleSubmitModal}>提出</button><br />
                        </div>
                    </div>
                )}
                    
            <Footer />
            </div>
        );
    }
}