import React, { Component } from "react";
import ParentHeader from '../foundation/ParentHeader.js';
import ParentFooter from "../foundation/ParentFooter.js";
import './familymypage.css'; 
import axios from 'axios'; 

export default class FamilyMyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familyId: "",
      newname: "",
      selectedName: "",
      kidsSelectionModal: false,
      kidsAddModal: false,
      kidsDelModal: false,
      familyDelModal: false,
      kids: [],
      nameList: []
    };

    // メソッドのバインド
    this.toggleKidsSelectionModal = this.toggleKidsSelectionModal.bind(this);
    this.toggleKidsAddModal = this.toggleKidsAddModal.bind(this);
    this.toggleKidsDelModal = this.toggleKidsDelModal.bind(this);
    this.toggleFamilyDelModal = this.toggleFamilyDelModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setNewName = this.setNewName.bind(this);
    this.newNameSave = this.newNameSave.bind(this);
    this.deleteName = this.deleteName.bind(this);
    this.handleNameSelect = this.handleNameSelect.bind(this);
  }

  // コンポーネントがマウントされた後にデータを取得する
  componentDidMount() {
    axios.get("/api/familymypage/")
      .then(response => {
        const kids = response.data;
        const familyId = kids.length > 0 ? kids[0].familyId : "";
        const nameList = kids.map(kid => kid.name);

        this.setState({ 
          kids: kids,
          nameList: nameList,
          familyId: familyId
        });
      })
      .catch(error => {
        console.error('データの取得に失敗しました', error);
      });
  }

  // モーダル表示・非表示を切り替えるメソッド
  toggleKidsSelectionModal() {
    this.setState(prevState => ({
      kidsSelectionModal: !prevState.kidsSelectionModal
    }));
  }

  toggleKidsAddModal() {
    this.setState(prevState => ({
      kidsAddModal: !prevState.kidsAddModal
    }));
  }

  toggleKidsDelModal() {
    this.setState(prevState => ({
      kidsDelModal: !prevState.kidsDelModal
    }));
  }

  toggleFamilyDelModal() {
    this.setState(prevState => ({
      familyDelModal: !prevState.familyDelModal
    }));
  }

  // フォームのサブミット処理
  handleSubmit(event) {
    event.preventDefault();
    
    if (this.state.kidsAddModal) {
      this.newNameSave();
    } else if (this.state.kidsDelModal) {
      this.deleteName();
    } else {
      console.log('Form submitted!');
    }
  }

  // 新しい名前を設定するメソッド
  setNewName(event) {
    this.setState({ newname: event.target.value });
  }

  // 名前選択の処理
  handleNameSelect(event) {
    this.setState({ selectedName: event.target.value });
  }

  // 新しい名前を保存するメソッド
  newNameSave() {
    const { newname, familyId } = this.state;
    const data = { name: newname, familyId: familyId };
    axios.post("/api/kidsUser/add/", data)
      .then(response => {
        this.toggleKidsAddModal();
        this.componentDidMount();
      })
      .catch(error => {
        console.error('名前の追加に失敗しました', error);
      });
  }

  // 名前を削除するメソッド
  deleteName() {
    const { selectedName } = this.state; 
    const data = { name: selectedName }; 
    axios.post("/api/kidsUser/delete/", data)
      .then(response => {
        this.toggleKidsDelModal(); 
        this.componentDidMount(); 
      })
      .catch(error => {
        console.error('名前の削除に失敗しました', error);
      });
  }

  render() {
    const { 
      kidsSelectionModal,
      kidsAddModal,
      kidsDelModal,
      familyDelModal,
      newname,
      selectedName,
      nameList
    } = this.state;

    return (
      <div>
        <ParentHeader />
        <main>
          <div className="background_image_renga">
            <div className="familymypage-background">
              <button className="familymypage_button" onClick={this.toggleKidsSelectionModal}>子供アカウント選択</button><br />
              <button className="familymypage_button" onClick={this.toggleKidsAddModal}>子供アカウント追加</button><br />
              <button className="familymypage_button" onClick={this.toggleKidsDelModal}>子供アカウント削除</button><br />
              <button className="familymypage_button" onClick={this.toggleFamilyDelModal}>家族アカウント削除</button><br />
            </div>
          </div>

          {/* 子供アカウント選択モーダル */}
          {kidsSelectionModal && (
            <div className="familymypage-modal">
              <div className="familymypage-modal_content">
                <button className="familymypage-close_button" onClick={this.toggleKidsSelectionModal}>×</button>
                <h2>子供アカウント選択</h2>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <select defaultValue="" required>
                      <option value="" disabled>選択してください</option>
                      {nameList.length > 0 ? (
                        nameList.map((name, index) => (
                          <option key={index} value={name}>{name}</option>
                        ))
                      ) : (
                        <option value="" disabled>名前がありません</option>
                      )}
                    </select>
                  </label>
                  <button type="submit" className="familymypage-add_button">再登録</button>
                </form>
              </div>
            </div>
          )}

          {/* 子供アカウント追加モーダル */}
          {kidsAddModal && (
            <div className="familymypage-modal">
              <div className="familymypage-modal_content">
                <button className="familymypage-close_button" onClick={this.toggleKidsAddModal}>×</button>
                <h2>子供アカウント追加</h2>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <input type="text" placeholder="なまえ" className="familymypage-textbox" value={newname} onChange={this.setNewName}/><br />
                  </label>
                  <button type="submit" className="familymypage-add_button">追加する</button>
                </form>
              </div>
            </div>
          )}

          {/* 子供アカウント削除モーダル */}
          {kidsDelModal && (
            <div className="familymypage-modal">
              <div className="familymypage-modal_content">
                <button className="familymypage-close_button" onClick={this.toggleKidsDelModal}>×</button>
                <h2>子供アカウント削除</h2>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <select value={selectedName} onChange={this.handleNameSelect} required>
                      <option value="" disabled>選択してください</option>
                      {nameList.length > 0 ? (
                        nameList.map((name, index) => (
                          <option key={index} value={name}>{name}</option>
                        ))
                      ) : (
                        <option value="" disabled>名前がありません</option>
                      )}
                    </select>
                  </label>
                  <button type="submit" className="familymypage-add_button">削除する</button>
                </form>
              </div>
            </div>
          )}

          {/* 家族アカウント削除モーダル */}
          {familyDelModal && (
            <div className="familymypage-modal">
              <div className="familymypage-modal_content">
                <button className="familymypage-close_button" onClick={this.toggleFamilyDelModal}>×</button>
                <h2>家族アカウント削除しますか？</h2>
                <form onSubmit={this.handleSubmit}>
                  <button type="submit" className="familymypage-del_button">はい</button>
                  <button type="button" className="familymypage-del_button" onClick={this.toggleFamilyDelModal}>いいえ</button>
                </form>
              </div>
            </div>
          )}

        </main>
        <ParentFooter />
      </div>
    );
  }
}

