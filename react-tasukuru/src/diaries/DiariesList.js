import React from 'react';
import axios from "axios";

export default class DiariesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            diaries: [],
            date :"",
            title : "",
            content:"",
            diaryRegitModal: false,


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
    //画面で何か入力された時に、その値をstateとして保持する。
    onInput = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });
    }

    //日記登録
    addDiary = () => {
        // const {title,content} = this.state;
        // const data = {title : title, content : content};
        // axios.post("/api/diary/diaryAdd/",data)
        // .then(json => {
        //     console.log(json);
        //     this.setState({
        //         title:"",content:""
        //     });
            
        // })
        this.toggleDiaryAddModal();
    }
    //日記をデータベースへ保存する処理
    saveDiary = () => {
        const {diaries,title,content} = this.state;
        const data = {title : title, content : content};
        axios.post("/api/diary/diaryAdd/",data)
        .then(json =>{
            this.toggleDiaryAddModal();
            this.componentDidMount();
        })
    }
    //日記登録モデルボックスの表示切り替え
    toggleDiaryAddModal = () => {
        const{diaryRegitModal} = this.state;
        this.setState({
            diaryRegitModal: !diaryRegitModal
        });

    }
    modBook(index) {
        // Implement the edit functionality here
    }

    delBook(index) {
        // Implement the delete functionality here
    }

    render() {
        const { diaries,title,content,diaryRegitModal} = this.state;
        return (
            <div>
                <div>
                    <button onClick={() => this.addDiary()}>日記登録</button>
                </div>
                

                <div className="DiaryListBody">
                
                    <table>
                        <thead>
                            <tr>
                                <th>タイトル</th>
                                <th>日時</th>
                                {/* <th>内容</th>
                                <th>返信</th> */}
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
                {/* モーダルウィンドウ(登録) */}
                {diaryRegitModal && (
                    <div id="Diaries_overlay">
                        <div id="Diaries_content">
                            <h1>日記</h1>
                            <input type="text" name="title" onChange={this.onInput} value={title} placeholder="タイトル"></input><br /><br />
                            <input type="text" name="content" onChange={this.onInput} value={content} placeholder="内容"></input><br /><br />
                            <button onClick={this.saveDiary} >登録</button>
                            <button onClick={this.toggleDiaryAddModal} >閉じる</button><br />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}