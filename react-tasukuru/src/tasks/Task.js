import React, { useState } from "react";
import Header from '../foundation/Header';
import Footer from '../foundation/Footer';
import './Task.css';
import axios from "axios";
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import NavigationButton from "./NavigationButton";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showReRegModal, setShowReRegModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState('noComplete');
  const [newTask, setNewTask] = useState({
    name: "",
    categoriesName: "",
    taskLimit: "",
    content: "",
    comment: "",
    complete: false,
    noComplete: false,
    miss: false,
    reviewOne: false,
    reviewTwo: false,
    reviewThree: false,
    taskCheck: false,
    taskImage: null,
    regTime: new Date().toISOString(),
  });

  useState(() => {
    axios.get("/api/task/")
      .then(response => {
        console.log('Tasks', response.data);  //ここでタスクデータを確認
        setTasks(response.data);
      })
      .catch(error => {
        console.error('タスクデータの取得に失敗しました', error);
      });
  }, []);


  const toggleAddModal = () => setShowAddModal(prev => !prev);
  const toggleTaskModal = () => setShowTaskModal(prev => !prev);
  const toggleReRegModal = () => setShowReRegModal(prev => !prev);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskModal(activeTab === 'noComplete' ? true : false);
    setShowReRegModal(activeTab !== 'noComplete' ? true : false);
  };

  const getButtonColor = (category) => {
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
  };

  const handleSubmitTask = (event) => {
    event.preventDefault();
    axios.post('/api/task/submit/', {
      id: selectedTask.id
    })
      .then(response => {
        console.log(response.data);
        setTasks(prevTasks => prevTasks.map(task =>
          task.id === selectedTask.id ? { ...task, noComplete: true } : task
        ));
        console.log('Updated Tasks', tasks);
        toggleTaskModal();
      })
      .catch(error => {
        console.error('タスクの提出に失敗しました', error);
      });
  };

  const handleAddTaskChange = (event) => {
    const { name, value } = event.target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleAddTaskSubmit = (event) => {
    event.preventDefault();
    const taskToAdd = {
      ...newTask,
      taskLimit: new Date(newTask.taskLimit).toISOString(),
      regTime: new Date().toISOString(),
    };
    axios.post('/api/task/add/', taskToAdd)
      .then(response => {
        console.log('Added Task', response.data);
        setTasks([...tasks, response.data]);
        toggleAddModal();
        setNewTask({
          name: "",
          categoriesName: "",
          taskLimit: "",
          content: "",
          comment: "",
          taskCheck: false,
          noComplete: false,
          complete: false,
          miss: false,
          reviewOne: false,
          reviewTwo: false,
          reviewThree: false,
          taskImage: null,
          regTime: new Date().toISOString(),
        });
      })
      .catch(error => {
        console.error('タスクの追加に失敗しました', error);
      });
  };

  const handleReRegTaskSubmit = (event) => {
    event.preventDefault();
    const taskToReg = {
      ...selectedTask,
      taskLimit: new Date(newTask.taskLimit).toISOString(),
      regTime: new Date().toISOString(),
      taskCheck: false,  // これらのフィールドをリセット
      noComplete: false,
      complete: false,
      miss: false,
      reviewOne: false,
      reviewTwo: false,
      reviewThree: false,
    };
    axios.post('/api/task/rereg/', taskToReg)
      .then(response => {
        console.log('ReReged Task', response.data);
        setTasks(prevTasks => prevTasks.map(task =>
          task.id === response.data.id ? response.data : task
        ));
        toggleAddModal();
        setNewTask({
          name: "",
          categoriesName: "",
          taskLimit: "",
          content: "",
          comment: "",
          taskCheck: false,
          noComplete: false,
          complete: false,
          miss: false,
          reviewOne: false,
          reviewTwo: false,
          reviewThree: false,
          taskImage: null,
          submitTime: null,
          regTime: new Date().toISOString(),
        });
      })
      .catch(error => {
        console.error('タスクの再登録に失敗しました', error);
      });
  };

  return (
    <div>
      <Header />
      <main>
        <div className="background_image_renga">
          {/* <div className="color_buttons">
            <button className="color_button" style={{ backgroundColor: '#F8CECC' }}></button>
            <button className="color_button" style={{ backgroundColor: '#FFF2CC' }}></button>
            <button className="color_button" style={{ backgroundColor: '#DAE8FC' }}></button>
            <button className="color_button" style={{ backgroundColor: '#D5E8D4' }}></button>
          </div> */}
          <div className="background">
            <Tabs>
              <TabList className="TabList">
                <Tab onClick={() => setActiveTab('noComplete')}>未たっせい</Tab>
                <Tab onClick={() => setActiveTab('complete')}>かんりょう</Tab>
                <Tab onClick={() => setActiveTab('miss')}>しっぱい</Tab>
              </TabList>

              <TabPanel>
                <div className="box">
                  {tasks.filter(task => !task.taskCheck && !task.noComplete && !task.complete && !task.miss).map(task => (
                    <button key={task.id} className="task_button" style={{ backgroundColor: getButtonColor(task.categoriesName) }} onClick={() => handleTaskClick(task)}>{task.name}</button>
                  ))}
                </div>
                <div className="button_container">
                  <NavigationButton path="/diaries" label="日記" className="diary_button" />
                  <button className="task_add_button" onClick={toggleAddModal}>追加</button>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="box">
                  {tasks.filter(task => task.taskCheck && task.noComplete && task.complete && !task.miss).map(task => (
                    <button key={task.id} className="task_button" style={{ backgroundColor: getButtonColor(task.categoriesName) }} onClick={() => handleTaskClick(task)}>{task.name}</button>
                  ))}
                </div>
                <div className="button_container">
                  <NavigationButton path="/diaries" label="日記" className="diary_button" />
                  <button className="task_add_button" onClick={toggleAddModal}>追加</button>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="box">
                  {tasks.filter(task => task.miss).map(task => (
                    <button key={task.id} className="task_button" style={{ backgroundColor: getButtonColor(task.categoriesName) }} onClick={() => handleTaskClick(task)}>{task.name}</button>
                  ))}
                </div>
                <div className="button_container">
                  <NavigationButton path="/diaries" label="日記" className="diary_button" />
                  <button className="task_add_button" onClick={toggleAddModal}>追加</button>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>

        {/* タスク提出モーダル */}
        {showTaskModal && selectedTask && (
          <div className="modal">
            <div className="modal_content">
              <button className="close_button" onClick={toggleTaskModal}>×</button>
              <h2>タスク提出</h2>
              <form onSubmit={handleSubmitTask}>
                <label>
                  タスク
                  <input type="text" value={selectedTask.name} readOnly />
                </label>
                <label>
                  カテゴリー
                  <input type="text" value={selectedTask.categoriesName} readOnly />
                </label>
                <label>
                  きげん
                  <input type="text" value={selectedTask.taskLimit} required />
                </label>
                <label>
                  くわしく
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
              <button className="close_button" onClick={toggleAddModal}>×</button>
              <h2>タスク追加</h2>
              <form onSubmit={handleAddTaskSubmit}>
                <label>
                  タスク
                  <input type="text" name="name" value={newTask.name} onChange={handleAddTaskChange} placeholder="タスク名" required />
                </label>
                <label>
                  カテゴリー
                  <select name="categoriesName" value={newTask.categoriesName} onChange={handleAddTaskChange} required>
                    <option value="" disabled>選択してください</option>
                    <option value="勉強">勉強</option>
                    <option value="家事">家事</option>
                    <option value="趣味">趣味</option>
                    <option value="運動">運動</option>
                    <option value="その他">その他</option>
                  </select>
                </label>
                <label>
                  きげん
                  <input type="date" name="taskLimit" value={newTask.taskLimit} onChange={handleAddTaskChange} required />
                </label>
                <label>
                  くわしく
                  <textarea name="content" value={newTask.content} onChange={handleAddTaskChange} placeholder="タスクの詳細を記入してください"></textarea>
                </label>
                <button type="submit" className="add_button">追加</button>
              </form>
            </div>
          </div>
        )}

        {/* タスク再登録モーダル */}
        {showReRegModal && selectedTask && (
          <div className="modal">
            <div className="modal_content">
              <button className="close_button" onClick={toggleReRegModal}>×</button>
              <h2>タスク再登録</h2>
              <form onSubmit={handleReRegTaskSubmit}>
                <label>
                  タスク
                  <input type="text" name="name" value={selectedTask.name} onChange={handleAddTaskChange} readOnly />
                </label>
                <label>
                  カテゴリー
                  <select name="categoriesName" defaultValue={selectedTask.categoriesName} onChange={handleAddTaskChange} required>
                    <option value="" disabled>選択してください</option>
                    <option value="勉強">勉強</option>
                    <option value="家事">家事</option>
                    <option value="趣味">趣味</option>
                    <option value="運動">運動</option>
                    <option value="その他">その他</option>
                  </select>
                </label>
                <label>
                  きげん
                  <input type="date" name="taskLimit" onChange={handleAddTaskChange} required />
                </label>
                <label>
                  くわしく
                  <textarea placeholder={selectedTask.content} onChange={handleAddTaskChange}></textarea>
                </label>
                <button type="submit" name="content" className="add_button">再登録</button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Tasks;
