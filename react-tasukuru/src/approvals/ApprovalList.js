import React from "react";
import Header from '../foundation/ParentHeader';
import Footer from '../foundation/ParentFooter';
import './Approval.css';
import axios from "axios";

import { BrowserRouter, Routes, Route, json } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class ApprovalList extends React.Component{

    constructor(props) {
        super(props);
        //stateの設定。
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
    }

    //マウント後に自動で動作する
    componentDidMount(){
        //学習用にaxiosでなく、標準のfetchを利用している。
        fetch("/api/familyTask/")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            //stateのbooksに受け取ったデータを保持する。
            //stateが変わると自動的に画面が再描画される。
            this.setState({
                tasks:json
            })
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

    // モーダル表示・非表示を切り替えるメソッド
    toggleAddModal() {
      this.setState(prevState => ({
        showAddModal: !prevState.showAddModal
      }));
    }
  
    toggleTaskModal(){
      this.setState(prevState =>({
        showTaskModal: !prevState.showTaskModal
      }));
    }


    render(){
      const { tasks, showAddModal, showTaskModal } = this.state;
        return (
            <wrapper>
        <Header />
        <main>
          <div className="background_image_renga">
            <div className="background">
              <Tabs>
                <TabList className="TabList">
                  <Tab>承認待ち</Tab>
                  <Tab>未達成</Tab>
                  <Tab>完了済み</Tab>
                  <Tab>失敗</Tab>
                </TabList>

                <TabPanel>
                  <div class="box">
                  {tasks.map(task => (
                  task.taskCheck === false && task.noComplete === true && task.complete === false && task.miss === false ? (
                        <button key={task.id} className="task_button" style={{ backgroundColor: this.getButtonColor(task.categoriesName) }}>{task.name}</button>
                      ) : null
                    ))}
                  </div>

                  <div className="button_container">
                    <button className="diary_button">日記</button>
                    <button className="task_add_button" onClick={this.toggleAddModal}>追加</button>
                  </div>
                </TabPanel>

                <TabPanel>
                  <div class="box">
                  {tasks.map(task => (
                  task.taskCheck === false && task.noComplete === false && task.complete === false && task.miss === false ? (
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
                   
                  </div>

                  <div className="button_container">
                    <button className="diary_button">日記</button>
                    <button className="task_add_button">再登録</button>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div class="box">
                    
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
    }
}