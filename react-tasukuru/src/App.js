import './App.css';
import Header from './foundation/Header';
import Footer from './foundation/Footer';
import Login from './login/Login';
import Task from './tasks/Task';
import Game from './game/Game';
import Mypage from './/game/GameMypage'; 
import ShopChild from './/game/ShopChild';
import ShopParent from './/game/ShopParent';
import Diaries from './diaries/Diaries';
import MoneyChild from './money/MoneyChild';
import MoneyParent from './money/MoneyParent';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DiariesList from './diaries/DiariesList';

function App() {
  return (
    <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/task" element={<Task></Task>}></Route>
            <Route path="/game" element={<Game></Game>}></Route>
            <Route path="/diaries" element={<Diaries></Diaries>}></Route>
            <Route path="/diariesList" element={<DiariesList></DiariesList>}></Route>
            <Route path="/game/mypage" element={<Mypage></Mypage>}></Route>
            <Route path="/game/shopChild" element={<ShopChild></ShopChild>}></Route>
            <Route path="/game/shopParent" element={<ShopParent></ShopParent>}></Route>
            <Route path="/money/child" element={<MoneyChild></MoneyChild>}></Route>
            <Route path="/money/parent" element={<MoneyParent></MoneyParent>}></Route>
          </Routes>
        </BrowserRouter>
     
    </div>
  );
}

export default App;
