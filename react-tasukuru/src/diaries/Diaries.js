//-------------------------------------------------
//子供用の日記の画面
//-------------------------------------------------
import React from "react";
import './Diaries.css';
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";
import DiariesList from "./DiariesList";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Diaries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diaries: [],
            selectedDiary: null, // 日記の選択を保存するやつ
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
        const { diaries } = this.state;
        const selectedDiary = diaries[index];
        this.toggleUnreadModal({ selectedDiary }, this.toggleUnreadModal);
    }
    //既読日記処理
    LookedDiarie(index) {
        const { diaries } = this.state;
        const selectedDiary = diaries[index];
        this.toggleLookedModal({ selectedDiary }, this.toggleLookedModal);
    }
    //サイコロ入手処理
    GetDice(index) {
        this.toggleDiceModal();
    }
    //保護者用未読日記処理
    GuardianUnreadDiarie(index) {
        this.toggleGuardianUnreadDiarieModal();
    }
    //日記提出処理
    SubmitDiarie(index) {
        const { diaries } = this.state;
        const selectedDiary = diaries[index];
        this.setState({ selectedDiary }, this.toggleSubmitModal);
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
    //提出日記表示切り替え
    toggleSubmitModal() {
        const { SubmitModal } = this.state;
        this.setState({
            SubmitModal: !SubmitModal,
        });
    }

    render() {
        const {diaries, selectedDiary, UnreadDiarieModal, LookedDiarieModal, GetDiceModal, GuardianUnreadDiarieModal, SubmitModal } = this.state;
        return (
            <div className="background_image_renga_diaries">
                <div className="Diaries_background"></div>
                <Header />

                {/*日記リストの表示*/}
                <div id="Diaries_body">
                    <Tabs>
                        <TabList className="Tab_diarie_list">
                            <Tab>いちらん</Tab>
                            <Tab>みどく</Tab>
                            <Tab>きどく</Tab>
                            <Tab>保護者用</Tab>{/*テスト用のタブ。保護者のみ表示にするかも。*/}
                        </TabList>

                        {/* 日記一覧リスト・・・提出するためのタブ */}
                        <TabPanel>
                            <div className="Diarie_box">
                            {diaries.map((diary, index) => {
                                const dateOnly = new Date(diary.date).toISOString().split('T')[0];
                                return (
                                    <tr className="" key={index}>
                                        <td className="dateOnly">{dateOnly}</td>
                                        <td className="title">{diary.title}</td>
                                        <td className="content">{diary.content}</td>
                                        <td className="action">
                                        <button className="Diaries_submit_button" onClick={() => this.SubmitDiarie(index)}>ていしゅつ</button>
                                        </td>
                                    </tr>
                                );
                            })} 
                            </div>
                        </TabPanel>

                        {/* 未読日記リスト・・・サイコロをもらうためのタブ */}
                        <TabPanel>
                            <div className="Diarie_box">
                            {diaries.map((diary, index) => {
                                const dateOnly = new Date(diary.date).toISOString().split('T')[0];
                                return (
                                    <tr className="" key={index}>
                                        <td className="dateOnly">{dateOnly}</td>
                                        <td className="title">{diary.title}</td>
                                        <td className="content">{diary.content}</td>
                                        <td className="action">
                                        <button className="Diaries_submit_button" onClick={() => this.UnreadDiarie(index)}>かくにん</button>
                                        </td>
                                    </tr>
                                );
                            })} 
                            </div>
                        </TabPanel>

                        {/* 既読日記リスト・・・サイコロをもらった後のタブ */}
                        <TabPanel>
                            <div className="Diarie_box">
                            {diaries.map((diary, index) => {
                                const dateOnly = new Date(diary.date).toISOString().split('T')[0];
                                return (
                                    <tr className="" key={index}>
                                        <td className="dateOnly">{dateOnly}</td>
                                        <td className="title">{diary.title}</td>
                                        <td className="content">{diary.content}</td>
                                        <td className="action">
                                        <button className="Diaries_submit_button" onClick={() => this.LookedDiarie(index)}>かくにん</button>
                                        </td>
                                    </tr>
                                );
                            })} 
                            </div>
                        </TabPanel>

                        {/* 保護者用既読日記リスト。テストタブであり、提出されたものがここに来る*/}
                        <TabPanel>
                            <div className="Diarie_box">
                                
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>

                {/*未読日記モーダル*/}
                {UnreadDiarieModal && selectedDiary && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>日記</h1>
                            <p>ひづけ<br /> {new Date(selectedDiary.date).toISOString().split('T')[0]}</p>
                            <p>タイトル<br /> {selectedDiary.title}</p>
                            <p>ないよう<br /> {selectedDiary.content}</p>
                            <p>へんしん<br /> {selectedDiary.reply}</p>
                            <button onClick={this.toggleDiceModal}>サイコロをもらう</button>
                        </div>
                        
                    </div>
                )}

                {/*既読日記モーダル*/}
                {LookedDiarieModal && selectedDiary && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>日記</h1>
                            <p>日付<br /> {new Date(selectedDiary.date).toISOString().split('T')[0]}</p>
                            <p>タイトル<br /> {selectedDiary.title}</p>
                            <p>内容<br /> {selectedDiary.content}</p>
                            <p>へんしん<br /> {selectedDiary.reply}</p>
                            <button onClick={this.toggleLookedModal}>とじる</button><br />
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

                {/* 日記の提出モーダル */}
                {SubmitModal && selectedDiary && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>にっき</h1>
                            <p>ひづけ<br /> {new Date(selectedDiary.date).toISOString().split('T')[0]}</p>
                            <p>タイトル<br /> {selectedDiary.title}</p>
                            <p>ないよう<br /> {selectedDiary.content}</p>
                            <button onClick={this.toggleSubmitModal}>ていしゅつ</button>
                        </div>
                    </div>
                )}
            <Footer />
            {/* モーダルウィンドウ確認ボタン */}
            {/*
            <button onClick={() => this.UnreadDiarie()}>未読日記</button> 
            <button onClick={() => this.LookedDiarie()}>既読日記</button><br />
            <button onClick={() => this.GuardianUnreadDiarie()}>保護者用未読日記</button><br />
            */}
            </div>
        );
    }
}
