import React, { useState, useEffect } from "react";
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

  useState(() => {
    axios.get("/api/task/")
      .then(response => {
        console.log('Tasks', response.data);  //ここでタスクデータを確認
        setTasks(response.data);
      })
      .catch(error => {
        console.error('タスクデータの取得に失敗しました', error);
      });
  });

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

  return (
    <div>
      <Header />
      <main>
        <div className="background_image_renga">
          <div className="color_buttons">
            <button className="color_button" style={{ backgroundColor: '#F8CECC' }}></button>
            <button className="color_button" style={{ backgroundColor: '#FFF2CC' }}></button>
            <button className="color_button" style={{ backgroundColor: '#DAE8FC' }}></button>
            <button className="color_button" style={{ backgroundColor: '#D5E8D4' }}></button>
          </div>
          <div className="background">
            <Tabs>
              <TabList className="TabList">
                <Tab onClick={() => setActiveTab('noComplete')}>未たっせい</Tab>
                <Tab onClick={() => setActiveTab('complete')}>かんりょう</Tab>
                <Tab onClick={() => setActiveTab('miss')}>しっぱい</Tab>
              </TabList>

              <TabPanel>
                <div className="box">
                  {tasks.filter(task => task.noComplete && !task.complete && !task.miss).map(task => (
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
                  {tasks.filter(task => task.complete && !task.miss).map(task => (
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
              <form>
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
              <form>
                <label>
                  タスク名
                  <input type="text" placeholder="タスク名" required />
                </label>
                <label>
                  カテゴリー
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
                  きげん
                  <input type="date" required />
                </label>
                <label>
                  くわしく
                  <textarea placeholder="タスクの詳細を記入してください"></textarea>
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
              <form>
                <label>
                  タスク
                  <input type="text" value={selectedTask.name} readOnly />
                </label>
                <label>
                  カテゴリー
                  <select defaultValue={selectedTask.categoriesName} required>
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
                  <input type="date" required />
                </label>
                <label>
                  くわしく
                  <textarea placeholder={selectedTask.content}></textarea>
                </label>
                <button type="submit" className="add_button">再登録</button>
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
