import React, { Component } from "react";
import Header from '../foundation/Header';
import Footer from '../foundation/Footer';
import './Task.css';
import axios from "axios";

import { BrowserRouter, Routes, Route, json } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import NavigationButton from "./NavigationButton";

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
      showAddModal: false,
      showTaskModal: false,
      selectedTask: null, //タスクが選択されたかどうか
    }

    //モーダル表示・非表示を切り替えるメソッドをバインド
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleTaskModal = this.toggleTaskModal.bind(this);
    this.handleTaskClick = this.handleTaskClick.bind(this);

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
  toggleAddModal() {
    this.setState(prevState => ({
      showAddModal: !prevState.showAddModal
    }));
  }

  toggleTaskModal() {
    this.setState(prevState => ({
      showTaskModal: !prevState.showTaskModal
    }));
  }

  handleTaskClick(task) {
    this.setState({
      selectedTask: task,
      showTaskModal: true
    });
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
    const { tasks, showAddModal, showTaskModal, selectedTask } = this.state;

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
                        <button key={task.id} className="task_button" style={{ backgroundColor: this.getButtonColor(task.categoriesName) }} onClick={() => this.handleTaskClick(task)}>{task.name}</button>
                      ) : null
                    ))}
                  </div>

                  <div className="button_container">
                    <NavigationButton path="/diaries" label="日記" className="diary_button" />
                    <button className="task_add_button" onClick={this.toggleAddModal}>追加</button>
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
                    <NavigationButton path="/diaries" label="日記" className="diary_button" />
                    <button className="task_add_button" onClick={this.toggleAddModal}>追加</button>
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
                    <NavigationButton path="/diaries" label="日記" className="diary_button" />
                    <button className="task_add_button" onClick={this.toggleAddModal}>追加</button>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
          {/* タスク提出モーダル */}
          {showTaskModal && selectedTask && (
            <div className="modal">
              <div className="modal_content">
                <button className="close_button" onClick={this.toggleTaskModal}>×</button>
                <h2>タスク提出</h2>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    タスク:
                    <input type="text" value={selectedTask.name} readOnly />
                  </label>
                  <label>
                    カテゴリー:
                    <input type="text" value={selectedTask.categoriesName} readOnly />
                  </label>
                  <label>
                    きげん:
                    <input type="text" value={selectedTask.taskLimit} required />
                  </label>
                  <label>
                    くわしく:
                    <textarea value={selectedTask.content}></textarea>
                  </label>
                  <button type="submit" className="add_button">提出</button>
                </form>
              </div>
            </div>
          )}

          {/* タスク追加モーダル */}
          {showAddModal && (
            <div className="modal">
              <div className="modal_content">
                <button className="close_button" onClick={this.toggleAddModal}>×</button>
                <h2>タスク追加</h2>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    タスク:
                    <input type="text" placeholder="タスク名" required />
                  </label>
                  <label>
                    カテゴリー:
                    <select defaultValue="" required>
                      <option value="" disabled>選択してください</option>
                      <option value="勉強">勉強</option>
                      <option value="家事">家事</option>
                      <option value="趣味">趣味</option>
                      <option value="運動">運動</option>
                      <option value="その他">その他</option>
                    </select>
                  </label>
                  <label>
                    きげん:
                    <input type="date" required />
                  </label>
                  <label>
                    くわしく:
                    <textarea placeholder="タスクの詳細を記入してください"></textarea>
                  </label>
                  <button type="submit" className="add_button">追加</button>
                </form>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </wrapper>
    );
  };
}