import './App.css';
import Header from './foundation/Header';
import Footer from './foundation/Footer';
import NewAccount from './account/NewAccount';
import Login from './login/Login';
import LoginFamily from './login/LoginFamily';
import LoginKids from './login/LoginKids';
import FamilyMyPage from './MyPage/familymypage';
import Start from './start/Start';
import Task from './tasks/Task';
import Approval from './approvals/ApprovalList';
import Game from './game/Game';
import Mypage from './/game/GameMypage'; 
import ShopChild from './/game/ShopChild';
import ShopParent from './/game/ShopParent';
import Diaries from './diaries/Diaries';
import GuardianDiares  from './diaries/GuardianDiaries';
import MoneyChild from './money/MoneyChild';
import MoneyParent from './money/MoneyParent';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DiariesList from './diaries/DiariesList';


function App() {
  return (
    <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path="/start" element={<Start></Start>}></Route>
            <Route path="/newaccount" element={<NewAccount></NewAccount>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/loginFamily" element={<LoginFamily></LoginFamily>}></Route>
            <Route path="/loginKids" element={<LoginKids></LoginKids>}></Route>
            <Route path="/familymypage" element={<FamilyMyPage></FamilyMyPage>}></Route>
            <Route path="/task" element={<Task></Task>}></Route>
            <Route path="/approval" element={<Approval></Approval>}></Route>
            <Route path="/game" element={<Game></Game>}></Route>
            <Route path="/diaries" element={<Diaries></Diaries>}></Route>
            <Route path="/diariesList" element={<DiariesList></DiariesList>}></Route>
            <Route path="/guardianDiaries" element={<GuardianDiares></GuardianDiares>}></Route>
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
