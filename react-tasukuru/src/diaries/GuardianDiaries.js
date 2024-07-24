import React from 'react';
import './Diaries.css';
import Header from "../foundation/Header";
import Footer from "../foundation/Footer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class GuardianDiares extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            diaries: [],
            date :"",
            title : "",
            content:"",
            ackDiaryModal: false,


        }
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
    //評価モデルボックス
    

    toggleAckDiaryModal = () => {
        const {ackDiaryModal} = this.state;
        this.setState({
            ackDiaryModal: !ackDiaryModal
        });
    }
    ackDiary() {
        this.toggleAckDiaryModal();
    }
    
    

    render() {
        const { diaries,title,content,ackDiaryModal} = this.state;
        return (
            <div>
                <Header />
                {/* <div>
                    <button onClick={() => this.addDiary()}>日記登録</button>
                </div> */}
                <main>
                    <div className="background_image_renga">
                        <div className="background">
                            <Tabs>
                                <TabList>
                                    <Tab>未読日記</Tab>
                                    <Tab>既読日記</Tab>
                                </TabList>
                                <TabPanel>
                                    <div className="DiaryListBody">
                                    <table>
                                        <thead>
                                            <tr class="bookrow">
                                                <td>日時</td>
                                                <td>タイトル</td>
                                            </tr>
                                        </thead>
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
                                                            <button onClick={() => this.ackDiary()}>評価</button>
                                                            
                                                            
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                            </TabPanel>
                            <TabPanel>
                                <div className="DiaryListBody">
                                    <table>
                                        <thead>
                                            <tr class="bookrow">
                                                <td>日時</td>
                                                <td>タイトル</td>
                                            </tr>
                                        </thead>
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
                                                            <button>確認</button>
                                                            
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                

                            </TabPanel>

                            </Tabs>
                              
                            
                        </div>
                    </div>
                </main>
                {ackDiaryModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>日記</h1>
                            <input type="text" placeholder="タイトル"></input><br /><br />
                            <input type="text" className="Diaries_input" placeholder="内容"></input><br /><br />
                            <button onClick={this.toggleAckDiaryModal}>提出</button>
                            <button onClick={this.toggleAckDiaryModal} >閉じる</button><br />
                        </div>
                    </div>
                )}

                <Footer />
            </div>
            
            
        );
    }
}