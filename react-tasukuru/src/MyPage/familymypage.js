import React, { Component } from "react";
import ParentHeader from '../foundation/ParentHeader.js';
import ParentFooter from "../foundation/ParentFooter.js";
import './familymypage.css'; // CSSファイルをインポートする際は、拡張子を含める必要があります
import axios from 'axios'; // axiosをインポートする

export default class FamilyMyPage extends Component {
  constructor(props) {
    super(props);
    // stateの初期化
    this.state = {
      newname: "",
      kidsSelectionModal: false,  // 子供アカウント選択モーダルの表示状態
      kidsAddModal: false,       // 子供アカウント追加モーダルの表示状態
      kidsDelModal: false,       // 子供アカウント削除モーダルの表示状態
      familyDelModal: false,     // 家族アカウント削除モーダルの表示状態
    };

    // メソッドのバインド
    this.toggleKidsSelectionModal = this.toggleKidsSelectionModal.bind(this);
    this.toggleKidsAddModal = this.toggleKidsAddModal.bind(this);
    this.toggleKidsDelModal = this.toggleKidsDelModal.bind(this);
    this.toggleFamilyDelModal = this.toggleFamilyDelModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setNewName = this.setNewName.bind(this);
    this.newNameSave = this.newNameSave.bind(this); // メソッドをバインドする
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
      this.newNameSave(); // 新しい名前を保存するメソッドを呼び出す
    } else {
      // 他のモーダルの処理（例：子供アカウント選択、削除、家族削除など）
      console.log('Form submitted!');
    }
  }

  // 新しい名前を設定するメソッド
  setNewName(event) {
    this.setState({ newname: event.target.value });
  }

  // 新しい名前を保存するメソッド
  newNameSave() {
    const { newname } = this.state;
    const data = { name: newname };
    axios.post("/api/kidsUser/add/", data)
        .then(response => {
            console.log(response.data);
            this.toggleKidsAddModal(); // モーダルを閉じる
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

  // 新しい名前を保存するメソッド
  newN() {
    const { newname } = this.state;
    const data = { name: newname };
    axios.post("/api/kidsUser/del/", data)
        .then(response => {
            console.log(response.data);
            this.toggleKidsAddModal(); // モーダルを閉じる
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

  render() {
    const { 
      kidsSelectionModal,
      kidsAddModal,
      kidsDelModal,
      familyDelModal,
      newname
    } = this.state;

    return (
      <div>
        <ParentHeader />
        <main>
          <div className="background_image_renga"> {/* familymypage-specific */}
            <div className="familymypage-background">
              <button className="familymypage_button" onClick={this.toggleKidsSelectionModal}>子供アカウント選択</button><br />
              <button className="familymypage_button" onClick={this.toggleKidsAddModal}>子供アカウント追加</button><br />
              <button className="familymypage_button" onClick={this.toggleKidsDelModal}>子供アカウント削除</button><br />
              <button className="familymypage_button" onClick={this.toggleFamilyDelModal}>家族アカウント削除</button><br />
            </div>
          </div>

          {/* 子供アカウント選択モーダル */}
          {kidsSelectionModal && (
            <div className="familymypage-modal"> {/* familymypage-specific */}
              <div className="familymypage-modal_content"> {/* familymypage-specific */}
                <button className="familymypage-close_button" onClick={this.toggleKidsSelectionModal}>×</button>
                <h2>子供アカウント選択</h2>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <select defaultValue="" required>
                      <option value="" disabled>選択してください</option>
                      <option value="勉強">勉強</option>
                      <option value="家事">家事</option>
                      <option value="趣味">趣味</option>
                      <option value="運動">運動</option>
                      <option value="その他">その他</option>
                    </select>
                  </label>
                  <button type="submit" className="familymypage-add_button">再登録</button> {/* familymypage-specific */}
                </form>
              </div>
            </div>
          )}

          {/* 子供アカウント追加モーダル */}
          {kidsAddModal && (
            <div className="familymypage-modal"> {/* familymypage-specific */}
              <div className="familymypage-modal_content"> {/* familymypage-specific */}
                <button className="familymypage-close_button" onClick={this.toggleKidsAddModal}>×</button>
                <h2>子供アカウント追加</h2>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <input type="text" placeholder="なまえ" className="familymypage-textbox" value={newname} onChange={this.setNewName}/><br /> {/* familymypage-specific */}
                  </label>
                  <button type="submit" className="familymypage-add_button">追加する</button> {/* familymypage-specific */}
                </form>
              </div>
            </div>
          )}

          {/* 子供アカウント削除モーダル */}
          {kidsDelModal && (
            <div className="familymypage-modal"> {/* familymypage-specific */}
              <div className="familymypage-modal_content"> {/* familymypage-specific */}
                <button className="familymypage-close_button" onClick={this.toggleKidsDelModal}>×</button>
                <h2>子供アカウント削除</h2>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <select defaultValue="" required>
                      <option value="" disabled>選択してください</option>
                      <option value="勉強">勉強</option>
                      <option value="家事">家事</option>
                      <option value="趣味">趣味</option>
                      <option value="運動">運動</option>
                      <option value="その他">その他</option>
                    </select>
                  </label>
                  <button type="submit" className="familymypage-add_button">削除する</button> {/* familymypage-specific */}
                </form>
              </div>
            </div>
          )}

          {/* 家族アカウント削除モーダル */}
          {familyDelModal && (
            <div className="familymypage-modal"> {/* familymypage-specific */}
              <div className="familymypage-modal_content"> {/* familymypage-specific */}
                <button className="familymypage-close_button" onClick={this.toggleFamilyDelModal}>×</button>
                <h2>家族アカウント削除しますか？</h2>
                <form onSubmit={this.handleSubmit}>
                  <button type="submit" className="familymypage-del_button">はい</button> {/* familymypage-specific */}
                  <button type="submit" className="familymypage-del_button">いいえ</button> {/* familymypage-specific */}
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

