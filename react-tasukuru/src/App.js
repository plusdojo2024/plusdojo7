import './App.css';
import Login from './login/Login';
import Task from './tasks/Task';
import Game from './game/Game';
import Diaries from './diaries/Diaries';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/task" element={<Task></Task>}></Route>
            <Route path="/game" element={<Game></Game>}></Route>
            <Route path="/diaries" element={<Diaries></Diaries>}></Route>
          </Routes>
        </BrowserRouter>
        
      </header>
    </div>
  );
}

export default App;
