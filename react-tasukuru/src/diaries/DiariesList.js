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
            showModal: false,


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

    modBook(index) {
        // Implement the edit functionality here
    }

    delBook(index) {
        // Implement the delete functionality here
    }

    render() {
        const { diaries,showModal} = this.state;
        return (
            <div>
                
                <div className="DiaryListBody">
                <button>日記登録</button>
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
                                            <button onClick={() => this.modBook(index)}>確認</button>
                                            
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {showModal &&
                    <div id="overlay">
                        <div id="content">
                            タイトル：<input type="text" name="modName" value={this.state.modName} onChange={this.onInput} /><br />
                            内容　　：<input type="text" name="modAuthor" value={this.state.modAuthor} onChange={this.onInput} /><br />
                            <button onClick={this.saveBook} >登録</button>
                            <button onClick={this.toggleModal}>閉じる</button>
                        </div>
                    </div>
                }
                </div>  
            </div>
        );
    }
}