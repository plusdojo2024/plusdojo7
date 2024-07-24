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


    render(){
        const { tasks } = this.state;
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
                    <button className="task_add_button" onClick={this.toggleModal}>追加</button>
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
          </main>
            <Footer />
            </wrapper>
            

        );
    }
}