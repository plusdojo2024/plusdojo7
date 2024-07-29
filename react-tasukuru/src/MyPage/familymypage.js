import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParentHeader from '../foundation/ParentHeader.js';
import ParentFooter from "../foundation/ParentFooter.js";
import './familymypage.css'; 
import axios from 'axios'; 

const FamilyMyPage = () => {
  const [familyId, setFamilyId] = useState("");
  const [newname, setNewName] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedKidId, setSelectedKidId] = useState(null); 
  const [kidsSelectionModal, setKidsSelectionModal] = useState(false);
  const [kidsAddModal, setKidsAddModal] = useState(false);
  const [kidsDelModal, setKidsDelModal] = useState(false);
  const [familyDelModal, setFamilyDelModal] = useState(false);
  const [kids, setKids] = useState([]);
  const [nameList, setNameList] = useState([]);
  const navigate = useNavigate();

  // コンポーネントがマウントされた後にデータを取得する
  useEffect(() => {
    axios.get("/api/familymypage/")
      .then(response => {
        const kids = response.data;
        const familyId = kids.length > 0 ? kids[0].familyId : "";
        const nameList = kids.map(kid => kid.name);

        setKids(kids);
        setNameList(nameList);
        setFamilyId(familyId);
      })
      .catch(error => {
        console.error('データの取得に失敗しました', error);
      });
  }, []);

  // モーダル表示・非表示を切り替えるメソッド
  const toggleKidsSelectionModal = () => {
    setKidsSelectionModal(prev => !prev);
  };

  const toggleKidsAddModal = () => {
    setKidsAddModal(prev => !prev);
  };

  const toggleKidsDelModal = () => {
    setKidsDelModal(prev => !prev);
  };

  const toggleFamilyDelModal = () => {
    setFamilyDelModal(prev => !prev);
  };

  // 新しい名前を設定するメソッド
  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  // 名前選択の処理
  const handleNameSelect = (event) => {
    setSelectedName(event.target.value);
  };

  // 子供選択の処理
  const handleKidSelect = (event) => {
    setSelectedKidId(event.target.value);
  };

  // 選択した子供を保存するメソッド
  const selectionNameSave = () => {
    const data = { selectedKidId: selectedKidId }; 
    axios.post("/api/kidsName/selection/", data)
      .then(response => {
        toggleKidsSelectionModal();
        // データの再取得
        axios.get("/api/familymypage/")
          .then(response => {
            const kids = response.data;
            const nameList = kids.map(kid => kid.name);
            setKids(kids);
            setNameList(nameList);
          })
          .catch(error => {
            console.error('データの再取得に失敗しました', error);
          });
      })
      .catch(error => {
        console.error('子供の選択に失敗しました', error);
      });
  };

  // 新しい名前を保存するメソッド
  const newNameSave = () => {
    const data = { name: newname, familyId: familyId };
    axios.post("/api/kidsName/add/", data)
      .then(response => {
        toggleKidsAddModal();
        // データの再取得
        axios.get("/api/familymypage/")
          .then(response => {
            const kids = response.data;
            const nameList = kids.map(kid => kid.name);
            setKids(kids);
            setNameList(nameList);
          })
          .catch(error => {
            console.error('データの再取得に失敗しました', error);
          });
      })
      .catch(error => {
        console.error('名前の追加に失敗しました', error);
      });
  };

  // 名前を削除するメソッド
  const deleteName = () => {
    const data = { name: selectedName }; 
    axios.post("/api/kidsName/del/", data)
      .then(response => {
        toggleKidsDelModal();
        // データの再取得
        axios.get("/api/familymypage/")
          .then(response => {
            const kids = response.data;
            const nameList = kids.map(kid => kid.name);
            setKids(kids);
            setNameList(nameList);
          })
          .catch(error => {
            console.error('データの再取得に失敗しました', error);
          });
      })
      .catch(error => {
        console.error('名前の削除に失敗しました', error);
      });
  };

  // 家族アカウントを削除するメソッド
  const deleteFamily = () => {
    const data = { familyId: familyId }; 
    axios.post("/api/family/familydel/", data)
      .then(response => {
        toggleFamilyDelModal();
        if (response.data === "削除成功") {
          navigate('/start');
        }
      })
      .catch(error => {
        console.error('家族アカウントの削除に失敗しました', error);
      });
  };

  return (
    <div>
      <ParentHeader />
      <main>
        <div className="background_image_renga">
          <div className="familymypage-background">
            <button className="familymypage_button" onClick={toggleKidsSelectionModal}>子供アカウント選択</button><br />
            <button className="familymypage_button" onClick={toggleKidsAddModal}>子供アカウント追加</button><br />
            <button className="familymypage_button" onClick={toggleKidsDelModal}>子供アカウント削除</button><br />
            <button className="familymypage_button" onClick={toggleFamilyDelModal}>家族アカウント削除</button><br />
          </div>
        </div>

        {/* 子供アカウント選択モーダル */}
        {kidsSelectionModal && (
          <div className="familymypage-modal">
            <div className="familymypage-modal_content">
              <button className="familymypage-close_button" onClick={toggleKidsSelectionModal}>×</button>
              <h2>子供アカウント選択</h2>
              <form onSubmit={(event) => {
                event.preventDefault();
                selectionNameSave(); 
              }}>
                <label>
                  <select defaultValue="" onChange={handleKidSelect} required>
                    <option value="" disabled>選択してください</option>
                    {kids.length > 0 ? (
                      kids.map((kid, index) => (
                        <option key={index} value={kid.id}>{kid.name}</option>
                      ))
                    ) : (
                      <option value="" disabled>名前がありません</option>
                    )}
                  </select>
                </label>
                <button type="submit" className="familymypage-add_button">決定</button>
              </form>
            </div>
          </div>
        )}

        {/* 子供アカウント追加モーダル */}
        {kidsAddModal && (
          <div className="familymypage-modal">
            <div className="familymypage-modal_content">
              <button className="familymypage-close_button" onClick={toggleKidsAddModal}>×</button>
              <h2>子供アカウント追加</h2>
              <form onSubmit={(event) => {
                event.preventDefault();
                newNameSave();
              }}>
                <label>
                  <input type="text" placeholder="なまえ" className="familymypage-textbox" value={newname} onChange={handleNewNameChange}/><br />
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
              <button className="familymypage-close_button" onClick={toggleKidsDelModal}>×</button>
              <h2>子供アカウント削除</h2>
              <form onSubmit={(event) => {
                event.preventDefault();
                deleteName();
              }}>
                <label>
                  <select value={selectedName} onChange={handleNameSelect} required>
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
              <button className="familymypage-close_button" onClick={toggleFamilyDelModal}>×</button>
              <h2>家族アカウント削除しますか？</h2>
              <form onSubmit={(event) => {
                event.preventDefault();
                deleteFamily();
              }}>
                <button type="submit" className="familymypage-del_button">はい</button>
                <button type="button" className="familymypage-del_button" onClick={toggleFamilyDelModal}>いいえ</button>
              </form>
            </div>
          </div>
        )}

      </main>
      <ParentFooter />
    </div>
  );
};

export default FamilyMyPage;



