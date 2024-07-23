import React from "react";
import Header from '../foundation/Header';
import Footer from '../foundation/Footer';
import './Task.css';
import axios from "axios";

import { BrowserRouter, Routes, Route, json } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Task extends React.Component{
  constructor(props){
    super(props);
    //stateの設定
    this.state = {
      tasks:[],
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
    }
  }

    componentDidMount(){
        //タスクデータの取得
        fetch("/api/task/")
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({tasks: json});
        });
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
      <Tab>未たっせい</Tab>
      <Tab>かんりょう</Tab>
      <Tab>しっぱい</Tab>
    </TabList>

    <TabPanel>
      <div class="box">
        {tasks.map(task => (
          task.noComplete === true && task.complete === false && task.miss === false ?(
          <button key={task.id} className="task_button">{task.name}</button>
          ) : null
        ))}
      </div>
      <div className="button_container">
        <button className="diary_button">日記登録</button>
        <button className="task_add_button">追加</button>
      </div>
    </TabPanel>

    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 3</h2>
    </TabPanel>
  </Tabs>
                    </div>
                </div>
            </main>
        <Footer />
        </wrapper>
       
        );
    };
}