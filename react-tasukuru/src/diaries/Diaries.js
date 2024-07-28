//-------------------------------------------------
//子供用の日記の画面
//-------------------------------------------------
import React from "react";
import './Diaries.css';
import axios from "axios";
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import GuardianDiaries from "./GuardianDiaries"; 

export default class Diaries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diaries: [],
            selectedDiary: null,
            UnreadDiarieModal: false,
            LookedDiarieModal: false,
            GetDiceModal: false,
            GuardianUnreadDiarieModal: false,
            SubmitModal: false,
            diaryRegitModal: false,
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
        this.toggleDiaryAddModal = this.toggleDiaryAddModal.bind(this);
        this.onInput = this.onInput.bind(this);
        this.saveDiary = this.saveDiary.bind(this);
    }

    componentDidMount() {
        fetch("/api/diary/")
        .then(res => res.json())
        .then(json => {
            const updateDiaries = json.map(diary => ({ ...diary, status: "all" }));
            this.setState({ diaries: updateDiaries });
        });
    }

    UnreadDiarie(index) {
        const { diaries } = this.state;
        const selectedDiary = diaries[index];
        selectedDiary.childCheck = true;
        axios.post("/api/diary/diaryMod/", selectedDiary)
            .then(response => {
                console.log("APIレスポンス:", response.data);
                this.componentDidMount();
            })
            .catch(error => {
                console.error("既読のエラーが発生しました:", error);
            });
        this.setState({ selectedDiary }, this.toggleUnreadModal);
    }

    LookedDiarie(index) {
        const { diaries } = this.state;
        const selectedDiary = diaries[index];
        this.toggleLookedModal({ selectedDiary }, this.toggleLookedModal);
    }

    GetDice(index) {
        const { diaries } = this.state;
        const selectedDiary = diaries[index];
        selectedDiary.childCheck = true;
        axios.post("/api/diary/diaryMod/", selectedDiary)
            .then(response => {
                axios.put(`/api/kidsUser/incrementDiceCount/${selectedDiary.kidsId}`)
                    .then(response => {
                        this.setState({ GetDiceModal: true, selectedDiary: selectedDiary  })
                        this.componentDidMount();
                    })
            })
            .catch(error => {
                console.error("サイコロ増えず", error);
            });
    }

    GuardianUnreadDiarie(index) {
        const { diaries } = this.state;
        const selectedDiary = diaries[index];
        this.setState({ selectedDiary }, this.toggleGuardianUnreadDiarieModal);
    }

    SubmitDiarie(index) {
        const { diaries } = this.state;
        const selectedDiary = diaries[index];
        let updatedDiaries = [...diaries];
        updatedDiaries[index].doSubmit = true;
        this.setState({ diaries: updatedDiaries, selectedDiary }, this.toggleSubmitModal);
        axios.post("/api/diary/diaryMod/", updatedDiaries[index])
            .then(response => {
                this.componentDidMount();
            })
            .catch(error => {
                console.error("日記提出中にエラーが発生しました:", error);
            });
    }

    onInput(e) {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
    }

    addDiary() {
        this.toggleDiaryAddModal();
    }

    saveDiary() {
        const { title, content } = this.state;
        const data = { title, content };
        axios.post("/api/diary/diaryAdd/", data)
            .then(json => {
                this.toggleDiaryAddModal();
                this.componentDidMount();
            });
    }

    toggleUnreadModal() {
        const { UnreadDiarieModal } = this.state;
        this.setState({ UnreadDiarieModal: !UnreadDiarieModal });
    }

    toggleLookedModal() {
        const { LookedDiarieModal } = this.state;
        this.setState({ LookedDiarieModal: !LookedDiarieModal });
    }

    toggleDiceModal() {
        const { GetDiceModal } = this.state;
        this.setState({ GetDiceModal: !GetDiceModal });
    }

    toggleGuardianUnreadDiarieModal() {
        const { GuardianUnreadDiarieModal } = this.state;
        this.setState({ GuardianUnreadDiarieModal: !GuardianUnreadDiarieModal });
    }

    toggleSubmitModal() {
        const { SubmitModal } = this.state;
        this.setState({ SubmitModal: !SubmitModal });
    }

    toggleDiaryAddModal() {
        const { diaryRegitModal } = this.state;
        this.setState({ diaryRegitModal: !diaryRegitModal });
    }

    render() {
        const { diaries, title, content, selectedDiary, UnreadDiarieModal, LookedDiarieModal, GetDiceModal, GuardianUnreadDiarieModal, SubmitModal, diaryRegitModal } = this.state;
        const allDiaries = diaries.filter(diary => diary.doSubmit === false);
        const parentCheckDiaries = diaries.filter(diary => diary.parentCheck === true && diary.childCheck === false) ;

        return (
            <div className="background_image_renga_diaries">
                <div className="Diaries_background"></div>
                <Header />
                <div id="Diaries_body">
                    <Tabs>
                        <TabList className="Tab_diarie_list">
                            <Tab>いちらん</Tab>
                            <Tab>みどく</Tab>
                            <Tab>きどく</Tab>
                        </TabList>

                        {/* 日記一覧リスト・・・提出するためのタブ */}
                        <TabPanel>
                            <div className="Diarie_box">
                                <table>
                                    <tbody>
                                        {allDiaries.map((diary, index) => {
                                            if (!diary || !diary.date) {
                                                return null;
                                            }
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
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                        {/* 未読日記リスト・・・サイコロをもらうためのタブ */}
                        <TabPanel>
                        <div className="Diarie_box">
                            <table>
                                <tbody>
                                    {parentCheckDiaries.map((diary, index) => {
                                        if (!diary || !diary.date) {
                                            return null;
                                        }
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
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>




                        {/* 既読日記リスト・・・サイコロをもらった後のタブ */}
                        <TabPanel>
                            <div className="Diarie_box">
                                <table>
                                    <tbody>
                                        {diaries.map((diary, index) => {
                                            if (!diary || !diary.date) {
                                                return null;
                                            }
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
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                        <div className="button_container">
                            <button className="Diaries_regist_button" onClick={() => this.addDiary()}>日記登録</button>
                        </div>
                    </Tabs>
                </div>

                {/*未読日記モーダル */}
                {UnreadDiarieModal && selectedDiary && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>日記</h1>
                            <p>ひづけ<br /> {selectedDiary.date ? new Date(selectedDiary.date).toISOString().split('T')[0] : ''}</p>
                            <p>タイトル<br /> {selectedDiary.title}</p>
                            <p>ないよう<br /> {selectedDiary.content}</p>
                            <p>へんしん<br /> {selectedDiary.reply}</p>
                            <button onClick={this.toggleDiceModal}>サイコロをもらう</button>
                        </div>
                    </div>
                )}

                {/*既読日記モーダル */}
                {LookedDiarieModal && selectedDiary && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>日記</h1>
                            <p>日付<br /> {selectedDiary.date ? new Date(selectedDiary.date).toISOString().split('T')[0] : ''}</p>
                            <p>タイトル<br /> {selectedDiary.title}</p>
                            <p>内容<br /> {selectedDiary.content}</p>
                            <p>へんしん<br /> {selectedDiary.reply}</p>
                            <button onClick={this.toggleLookedModal}>とじる</button><br />
                        </div>
                    </div>
                )}

                {/*サイコロ入手モーダル */}
                {GetDiceModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            サイコロを手にいれたよ！<br />
                            <button onClick={() => { this.toggleDiceModal(); this.toggleUnreadModal(); }}>とじる</button><br />
                        </div>
                    </div>
                )}

                {/* 保護者用日記モーダル */}
                {GuardianUnreadDiarieModal && selectedDiary && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <button onClick={this.toggleGuardianUnreadDiarieModal}>とじる</button><br />
                            <h1>日記</h1>
                            <p>日付<br /> {selectedDiary.date ? new Date(selectedDiary.date).toISOString().split('T')[0] : ''}</p>
                            <p>タイトル<br /> {selectedDiary.title}</p>
                            <p>内容<br /> {selectedDiary.content}</p>
                            <input type="text" className="Diaries_input" placeholder="返信内容"></input><br />
                            <button className="Diaries_read_button" onClick={this.toggleGuardianUnreadDiarieModal}>既読にする</button>
                        </div>
                    </div>
                )}

                {/* 日記の提出モーダル */}
                {SubmitModal && selectedDiary && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>にっき</h1>
                            <p>ひづけ<br /> {selectedDiary.date ? new Date(selectedDiary.date).toISOString().split('T')[0] : ''}</p>
                            <p>タイトル<br /> {selectedDiary.title}</p>
                            <p>ないよう<br /> {selectedDiary.content}</p>
                            <button onClick={this.toggleSubmitModal}>ていしゅつ</button>
                        </div>
                    </div>
                )}

                {diaryRegitModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>日記</h1>
                            <input type="text" name="title" onChange={this.onInput} value={title} placeholder="タイトル"></input><br /><br />
                            <input type="text" name="content" onChange={this.onInput} value={content} placeholder="内容"></input><br /><br />
                            <button onClick={this.saveDiary}>登録</button>
                            <button onClick={this.toggleDiaryAddModal}>閉じる</button><br />
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        );
    }
}

//-------------------------------------------------------
//memo
//-------------------------------------------------------
/*
7/25
子が提出→親未読→返信→子供未読→サイコロもらう→子供既読
子が提出→親未読＆子未読→返信→子供未読→サイコロもらう→子供既読
流れがおかしくなっている→一応動くので優先度低め
日記のデータがずれている→テストデータのせいでずれていたので解決


参考になりそうなページ
スプレッド構文
https://qiita.com/tokky_se/items/9c359c3e94ca280deda8

未読既読のフラグ関連
https://zenn.dev/sprout2000/books/76a279bb90c3f3/viewer/chapter12

タスクのフィルタリング
https://zenn.dev/sprout2000/books/76a279bb90c3f3/viewer/chapter14

絞り込み機能（時間があれば実装）
https://qiita.com/ryuheisato7/items/4b3e55f0ee9a8a84a29f
*/