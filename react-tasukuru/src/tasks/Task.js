import React from "react";
import Header from '../foundation/Header';
import Footer from '../foundation/Footer';
import './Task.css';
import axios from "axios";

import { BrowserRouter, Routes, Route, json } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    //stateの設定
    this.state = {
      tasks: [],
      kids_id: "",
      name: "",
      content: "",
      regTime: "",
      categoriesName: "",
      taskLimit: "",
      submitTime: "",
      taskImage: "",
      comment: "",
      reviewOne: false,
      reviewTwo: false,
      reviewThree: false,
      taskCheck: false,
      noComplete: false,
      complete: false,
      miss: false,
      showModal: false,
    }

    //モーダル表示・非表示を切り替えるメソッドをバインド
    this.toggleModal = this.toggleModal.bind(this);

  }

  componentDidMount() {
    //タスクデータの取得
    fetch("/api/task/")
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ tasks: json });
      });
  }

  // モーダル表示・非表示を切り替えるメソッド
  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }


  //タスクのカテゴリーごとにボタンの背景色を変更する処理
  getButtonColor(category) {
    switch (category) {
      case '勉強':
        return '#F8CECC';
      case '家事':
        return '#FFF2CC';
      case '趣味':
        return '#DAE8FC';
      case '運動':
        return '#D5E8D4';
      default:
        return 'gray';
    }
  }


  render() {
    const { tasks, showModal } = this.state;

    return (

      <wrapper>
        <Header />
        <main>
          <div className="background_image_renga">
            <div className="background">
              <Tabs>
                <TabList className="TabList">
                  <Tab>未たっせい</Tab>
                  <Tab>かんりょう</Tab>
                  <Tab>しっぱい</Tab>
                </TabList>

                <TabPanel>
                  <div class="box">
                    {tasks.map(task => (
                      task.noComplete === true && task.complete === false && task.miss === false ? (
                        <button key={task.id} className="task_button" style={{ backgroundColor: this.getButtonColor(task.categoriesName) }}>{task.name}</button>
                      ) : null
                    ))}
                  </div>

                  <div className="button_container">
                    <button className="diary_button">日記</button>
                    <button className="task_add_button" onClick={this.toggleModal}>追加</button>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div class="box">
                    {tasks.map(task => (
                      task.noComplete === false && task.complete === true && task.miss === false ? (
                        <button key={task.id} className="task_button" style={{ backgroundColor: this.getButtonColor(task.categoriesName) }}>{task.name}</button>
                      ) : null
                    ))}
                  </div>

                  <div className="button_container">
                    <button className="diary_button">日記</button>
                    <button className="task_add_button">再登録</button>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div class="box">
                    {tasks.map(task => (
                      task.noComplete === false && task.complete === false && task.miss === true ? (
                        <button key={task.id} className="task_button" style={{ backgroundColor: this.getButtonColor(task.categoriesName) }}>{task.name}</button>
                      ) : null
                    ))}
                  </div>

                  <div className="button_container">
                    <button className="diary_button">日記</button>
                    <button className="task_add_button">再登録</button>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
          {/* タスク追加モーダル */}
          {showModal && (
            <div className="modal">
              <div className="modal_content">
                <h2>タスク追加</h2>
                <label>
                  タスク:
                  <input type="text" />
                </label>
                <label>
                  カテゴリー:
                  <select>
                    <option value="勉強">勉強</option>
                    <option value="家事">家事</option>
                    <option value="趣味">趣味</option>
                    <option value="運動">運動</option>
                    <option value="その他">その他</option>
                  </select>
                </label>
                <label>
                  きげん:
                  <input type="date" />
                </label>
                <label>
                  くわしく:
                  <textarea />
                </label>
                <button onClick={this.toggleModal}>追加</button>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </wrapper>

    );
  };
}