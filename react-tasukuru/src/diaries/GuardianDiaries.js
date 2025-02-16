import React from 'react';
import './Diaries.css';
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from "axios";

export default class GuardianDiares extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            diaries: [],
            date :"",
            title : "",
            content:"",
            reply : "",
            parentCheck : false,
            doSubmit : false,
            replyIndex : 0,
            ackDiaryModal: false,
            showCompleteDiaryModal : false,
        };
        this.toggleAckDiaryModal = this.toggleAckDiaryModal.bind(this);
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
    enterInput = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    //日記の一覧の切り替え
    toggleShowCompleteDiaryModal = () => {
        const {showCompleteDiaryModal} = this.state;
        this.setState({
            showCompleteDiaryModal : !showCompleteDiaryModal
        });
    }
    //親が返信するモデルボックスの表示の切り替え
    toggleAckDiaryModal = () => {
        const {ackDiaryModal} = this.state;
        this.setState({
            ackDiaryModal: !ackDiaryModal
        });
    }
    //元々のデータを表示する処理
    ackDiary = (index) => {
        const {diaries} = this.state;
        const selectedDiary = diaries[index];
        let updatedDiaries = [...diaries];
        updatedDiaries[index].parentCheck = true; //parentCheckを true に設定
        updatedDiaries[index].doSubmit = true;
        this.setState({
            showTitle : diaries[index].title,
            showContent : diaries[index].content,
            showReply : diaries[index].reply,
            showDate : diaries[index].date,
            showParentCheck : diaries[index].parentCheck,
            replyIndex : index,
            selectedDiary: selectedDiary,
            ackDiaryModal: true,
        })
        this.toggleAckDiaryModal();
        axios.post("api/diary/diaryMod/",updatedDiaries[index])
            .then(Response => {
                this.componentDidMount();
            });
    }
    //日記の一覧
    showDiary = (index) => {
        const {diaries} = this.state;
        this.setState({
            showTitle : diaries[index].title,
            showContent : diaries[index].content,
            showReply : diaries[index].reply,
            showDate : diaries[index].date,
            showParentCheck : diaries[index].parentCheck,
            replyIndex : index
        })
        this.toggleShowCompleteDiaryModal();
    }
    
    //日記の返信を保存する処理
    replyDiary = () => {
        const {diaries,replyIndex,showTitle,showContent,showReply,showDate,showParentCheck} = this.state;
        const data = {
            id:diaries[replyIndex].id,
            title:showTitle, content:showContent,
            reply: showReply,
            date:showDate,
            parentCheck:true,
            doSubmit:true
        }
        axios.post("/api/diary/diaryMod/",data)
        .then(json => {
            this.toggleAckDiaryModal();
            this.componentDidMount();
        })
    }
    

    render() {
        const { diaries,title,content,reply,ackDiaryModal,showCompleteDiaryModal,doSubmit,selectedDiary} = this.state;
        const filteredDiaries = diaries.filter(diary => diary.doSubmit === true);
        const guardianDiaries = diaries.filter(diary => diary.doSubmit === true);
        const readGuardianDiaries = diaries.filter(diary => diary.doSubmit === true && diary.parentCheck);
        return (
            <div>
                <Header />
                {/* <div>
                    <button onClick={() => this.addDiary()}>日記登録</button>
                </div> */}
                <main>
                    <div className="background_image_renga_diaries">
                        <div className="Diaries_background">
                            <div id="Diaries_body">
                            <Tabs>
                                <TabList>
                                    <Tab>日記一覧</Tab>
                                    <Tab>未読日記</Tab>
                                    <Tab>既読日記</Tab>
                                </TabList>

                                {/* 日記一覧のタブ */}
                                <TabPanel>
                                <div className="DiaryListBody" class="parent_Diary_Box">
                                    <table>
                                        <thead>
                                            <tr class="diaryRow">
                                                {/* <td>KidsID</td> */}
                                                <td>日時</td>
                                                <td>タイトル</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredDiaries.map((diary, index) => {
                                                const dateOnly = new Date(diary.date).toISOString().split('T')[0];
                                                return (
                                                        <tr className="diaryRow" key={index}>
                                                            {/* <td className="kidsId">{diary.kidsId}</td> */}
                                                            <td className="dateOnly">{dateOnly}</td>
                                                            <td className="title">{diary.title}</td>
                                                            {/* <td className="content">{diary.content}</td>
                                                            <td className="reply">{diary.reply}</td> */}
                                                            <td className="action">
                                                                <button onClick={() => { this.showDiary(index) }}>確認</button>
                                                            </td>
                                                        </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="DiaryListBody" class="parent_Diary_Box">
                                    <table >
                                        <thead>
                                            <tr class="diaryRow">
                                                <td>日時</td>
                                                <td>タイトル</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {guardianDiaries.map((diary, index) => {
                                                const dateOnly = new Date(diary.date).toISOString().split('T')[0];
                                                return (
                                                    !diary.parentCheck  ? (
                                                        <tr className="diaryRow" key={index}>
                                                            <td className="dateOnly">{dateOnly}</td>
                                                            <td className="title">{diary.title}</td>
                                                            {/* <td className="content">{diary.content}</td>
                                                            <td className="reply">{diary.reply}</td> */}
                                                            <td className="action">
                                                                <button onClick={() => {this.ackDiary(index)}}>返信</button>
                                                            </td>
                                                        </tr>
                                                    ) : null
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="DiaryListBody" class="parent_Diary_Box">
                                    <table>
                                        <thead>
                                            <tr class="diaryRow">
                                                <td>日時</td>
                                                <td>タイトル</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {readGuardianDiaries.map((diary, index) => {
                                                const dateOnly = new Date(diary.date).toISOString().split('T')[0];
                                                return (
                                                    diary.parentCheck ? (
                                                        <tr className="diaryRow" key={index}>
                                                            <td className="dateOnly">{dateOnly}</td>
                                                            <td className="title">{diary.title}</td>
                                                            {/* <td className="content">{diary.content}</td>
                                                            <td className="reply">{diary.reply}</td> */}
                                                            <td className="action">
                                                                <button onClick={() => { this.showDiary(index) }}>確認</button>
                                                            </td>
                                                        </tr>
                                                    ) : null
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                            </Tabs>
                            </div>    
                        </div>
                    </div>
                </main>
                {ackDiaryModal && selectedDiary && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>日記</h1>
                            {/* <input type="text" name="showTitle" value={this.state.showTitle}  placeholder="タイトル"></input><br /><br />
                            <input type="text" name="showContent" value={this.state.showContent}  className="Diaries_input" placeholder="内容"></input><br /><br /> */}
                            <p>日付<br />{new Date(selectedDiary.date).toISOString().split('T')[0]}</p>
                            <p>タイトル<br />{selectedDiary.title}</p>
                            <p>内容<br />{selectedDiary.content}</p>
                            <input type="text" name="showReply" value={this.state.showReply} onChange={this.enterInput}  className="Diaries_input" placeholder="返信"></input><br /><br />
                            <button onClick={this.replyDiary}>返信</button>
                            <button onClick={this.toggleAckDiaryModal} >閉じる</button><br />
                        </div>
                    </div>
                )}
                {showCompleteDiaryModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>日記</h1>
                            <input type="text" name="showTitle" value={this.state.showTitle}  placeholder="タイトル"></input><br /><br />
                            <input type="text" name="showContent" value={this.state.showContent}  className="Diaries_input" placeholder="内容"></input><br /><br />
                            <input type="text" name="showReply" value={this.state.showReply}   className="Diaries_input" placeholder="返信"></input><br /><br />
                            <button onClick={this.toggleShowCompleteDiaryModal} >閉じる</button><br />
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        );
    }
}