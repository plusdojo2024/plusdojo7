import './App.css';
import Login from './login/login';
import Task from './tasks/Task';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/task" element={<Task></Task>}></Route>
          </Routes>
        </BrowserRouter>
        
      </header>
    </div>
  );
}

export default App;
