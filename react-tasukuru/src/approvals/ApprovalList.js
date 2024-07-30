import React from "react";
import Header from '../foundation/ParentHeader';
import Footer from '../foundation/ParentFooter';
import './Approval.css';
import NavigationButton from "../tasks/NavigationButton";
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
            regTime: new Date().toISOString()
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
    toggleAddModal = () => {
      this.setState(prevState => ({
        showAddModal: !prevState.showAddModal
      }));
    }
  
    toggleTaskModal = () =>{
      this.setState(prevState =>({
        showTaskModal: !prevState.showTaskModal
      }));
    }

    toggleApprovalModal = () =>{
      this.setState(prevState =>({
        showApprovalModal: !prevState.showApprovalModal
      }));
    }

    onInput = (e) => {
      const {categoriesName} = this.state;
      const name= e.target.name;
      this.setState({
        [name]: e.target.value
      });
      console.log(categoriesName);
    }

    onInput_One = (e) => {
      
      const {reviewOne, reviewTwo, reviewThree} = this.state;
      this.setState({
        reviewOne:true,
        reviewTwo:false,
        reviewThree:false
      }, () => {
      console.log(this.state.reviewOne);
      console.log(this.state.reviewTwo);
      console.log(this.state.reviewThree);
    }) ;
  }

    onInput_Two= (e) => {
      const {reviewOne, reviewTwo, reviewThree} = this.state;
      this.setState({
        reviewOne:false,
        reviewTwo:true,
        reviewThree:false
      }, () => {
        console.log(this.state.reviewOne);
        console.log(this.state.reviewTwo);
        console.log(this.state.reviewThree);
      }) 
    }

    onInput_Three = (e) => {
      const {reviewOne, reviewTwo, reviewThree} = this.state;
      this.setState({
        reviewOne:false,
        reviewTwo:false,
        reviewThree:true
      }, () => {
        console.log(this.state.reviewOne);
        console.log(this.state.reviewTwo);
        console.log(this.state.reviewThree);
      }) 
    }

    addTask = () => {
      const {name, content, categoriesName, taskLimit} = this.state;
        console.log("nameは" + name);
        console.log("taskLimitは" + taskLimit);
        const data = {
          name: name,
          content: content,
          categoriesName: categoriesName,
          taskLimit: taskLimit,
          taskCheck: false,
          noComplete: false,
          complete: false,
          miss: false,
          review_one: false,
          review_two: false,
          review_three: false,
          kidsId:1
        };
        console.log("dataは" + data);
        axios.post("/api/familyTask/add/",data)
       .then(json => {
           console.log(json);
        this.setState({
        name:""
        ,content:""
        ,categoriesName:""
        ,taskLimit:""
      });
      console.log("nameは" + name);
       //追加したら再読み込みする。
        this.componentDidMount();
      });
        }
    
        ApprovalCheck = (index) => {
          console.log("index:" +index);
          
          //編集なので、表示中tasksを利用して対象データの値をinputに格納する。
          const { tasks } = this.state;
          console.log("task[index].name:" + tasks[index].submitTime);
          //setStateでmodNameを変更すると、関連するモーダル上のinputが再描画される。
          this.setState({
              name:tasks[index].name,
              content:tasks[index].content,
              taskLimit:tasks[index].taskLimit,
              submitTime:tasks[index].submitTime,
              modIndex:index
          });
          //モーダルを表示
          this.toggleApprovalModal();
      }

      CheckOK = () =>{
        const {modIndex, tasks, name, taskLimit, submitTime, content, reviewOne, reviewTwo, reviewThree, comment, taskCheck} = this.state;
        console.log(this.state.reviewOne);
        const data = {id:tasks[modIndex].id,name:name, taskLimit:taskLimit, submitTime:submitTime, content:content, reviewOne:reviewOne, reviewTwo:reviewTwo, reviewThree:reviewThree, comment:comment, taskCheck:true,
                      kidsId:tasks[modIndex].kidsId,categoriesName:tasks[modIndex].categoriesName, noComplete:true, complete:true, miss:false, taskImage:tasks[modIndex].taskImage, submitTime:tasks[modIndex].submitTime, regTime:tasks[modIndex].regtime
        };
        console.log(data);
        axios.post("api/familyTask/mod/",data)
        .then(json =>{
          console.log(json);
          this.toggleAddModal();
        })
      }
        
      CheckNG = () =>{
        const {modIndex, tasks, name, taskLimit, submitTime, content, review_one, review_two, review_three, comment, taskCheck} = this.state;
        const data = {id:tasks[modIndex].id,name:name, taskLimit:taskLimit, submitTime:submitTime, content:content, review_one:review_one, review_two, review_three, comment:comment, taskCheck:true,
                      kidsId:tasks[modIndex].kidsId,categoriesName:tasks[modIndex].categoriesName, noComplete:true, complete:false, miss:true, taskImage:tasks[modIndex].taskImage, submitTime:tasks[modIndex].submitTime, regTime:tasks[modIndex].regtime
        };
        console.log(data);
        axios.post("api/familyTask/mod/",data)
        .then(json =>{
          console.log(json);
          this.toggleAddModal();
        })
      }


    render(){
      const { tasks, showAddModal, showTaskModal, showApprovalModal, name, content, categoriesName, taskLimit, handleTaskClick, selectedTask, comment} = this.state;
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
                {/* 承認待ち */}
                <TabPanel>
                  <div class="box">
                  {tasks.map((task,index) => (
                  task.taskCheck === false && task.noComplete === true && task.complete === false && task.miss === false ? (
                    
                        <button key={task.id} className="task_button" style={{ backgroundColor: this.getButtonColor(task.categoriesName) }} onClick={() => this.ApprovalCheck(index)}>{task.name}</button>
                      ) : null
                    ))}
                  </div>
                  
                  <div className="button_container">
                  <NavigationButton path="/guardianDiaries" label="日記" className="diary_button" />
                    <button className="task_add_button" onClick={this.toggleAddModal}>追加</button>
                  </div>
                </TabPanel>
                {/* 未達成 */}
                <TabPanel>
                  <div class="box">
                  {tasks.map(task => (
                  task.taskCheck === false && task.noComplete === false && task.complete === false && task.miss === false ? (
                        <button key={task.id} className="task_button" style={{ backgroundColor: this.getButtonColor(task.categoriesName) }}>{task.name}</button>
                      ) : null
                    ))}
                  </div>

                  <div className="button_container">
                  <NavigationButton path="/guardianDiaries" label="日記" className="diary_button" />
                    <button className="task_add_button" onClick={this.toggleAddModal}>追加</button>
                  </div>
                </TabPanel>
                {/* 完了済み */}
                <TabPanel>
                  <div class="box">
                  {tasks.map(task => (
                  task.taskCheck === true && task.noComplete === true && task.complete === true && task.miss === false ? (
                        <button key={task.id} className="task_button" style={{ backgroundColor: this.getButtonColor(task.categoriesName) }}>{task.name}</button>
                      ) : null
                    ))}
                  </div>

                  <div className="button_container">
                  <NavigationButton path="/guardianDiaries" label="日記" className="diary_button" />
                    <button className="task_add_button" onClick={this.toggleAddModal}>追加</button>
                  </div>
                </TabPanel>
                {/* 失敗 */}
                <TabPanel>
                  <div class="box">
                  {tasks.map(task => (
                  task.miss === true ? (
                        <button key={task.id} className="task_button" style={{ backgroundColor: this.getButtonColor(task.categoriesName) }}>{task.name}</button>
                      ) : null
                    ))}
                  </div>

                  <div className="button_container">
                  <NavigationButton path="/guardianDiaries" label="日記" className="diary_button" />
                    <button className="task_add_button" onClick={this.toggleAddModal}>追加</button>
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
                    <input type="text" name="name" placeholder="タスク名" required onChange={this.onInput} value={name} />
                  </label>
                  <label>
                    カテゴリー:
                    <select defaultValue="" name="categoriesName" required onChange={this.onInput} value={categoriesName}>
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
                    <input type="datetime-local" name="taskLimit" required onChange={this.onInput} value={taskLimit} />
                  </label>
                  <label>
                    くわしく:
                    <textarea name="content" placeholder="タスクの詳細を記入してください" onChange={this.onInput} value={content}></textarea>
                  </label>
                  <button type="submit"  onClick={this.addTask} className="add_button" >追加</button>
                </form>
              </div>
            </div>
          )}

          {/* 親承認モーダル */}
          {showApprovalModal && (
            <div className="modal">
              <div className="modal_content">
                <button className="close_button" onClick={this.toggleApprovalModal}>×</button>
                <form onSubmit={this.handleSubmit}>
                  <label>
                  タスク名:
                  <input type="text" name="name" value={this.state.name} readOnly  placeholder="タスク名"  />
                  </label>
                  <label>
                  期限:
                  <input type="text" name="taskLimit" value={this.state.taskLimit} readOnly  />
                  </label>
                  <label>
                  提出時間:
                  <input type="text" value={this.state.submitTime} readOnly name="submitTime"  />
                  </label>
                  <label>
                  詳細:
                  <input type="text" value={this.state.content} readOnly name="content"  />
                  </label>
                  <label>

                  <div class="cont">
                    <div class="approval-stars">
                      <form action="">
                        <input class="star star-3" id="star-3-2" type="radio" name="star" onChange={this.onInput_Three}/>
                        <label class="star star-3" for="star-3-2"></label>
                        <input class="star star-2" id="star-2-2" type="radio" name="star" onChange={this.onInput_Two}/>
                        <label class="star star-2" for="star-2-2"></label>
                        <input class="star star-1" id="star-1-2" type="radio" name="star" onChange={this.onInput_One} />
                        <label class="star star-1" for="star-1-2"></label>
                        <div class="rev-box">
                          <textarea class="review" col="30" name="review" placeholder="レビュー" onChange={this.onInput} value={comment}></textarea>
                          <label class="review" for="review">Breif Review</label>
                        </div>
                      </form>
                    </div>
                  </div>
                  </label>
                  <button type="submit" onClick={() => this.CheckNG()} className="checkNG"> ×</button>
                  <button type="submit"  onClick={() => this.CheckOK()} className="checkOK">○</button>

                </form>
                <section>
                

</section>
              </div>
            </div>
          )}



          </main>
            <Footer />
            </wrapper>
            

        );
    }
}
