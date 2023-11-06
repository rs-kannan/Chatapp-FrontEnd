import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';
import axios from 'axios';

axios.defaults.baseURL = 'https://chat-d8d8.onrender.com/';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/chats' element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;
