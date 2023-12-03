
import './App.css';
import Data from './components/Data';
import Login from './components/Login';
import Form from './components/Form';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Certificate from './components/Certificate.js';
import Signup from './components/Signup';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Data"  element={<Data />} />
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Form" element={<Form/>} />
        <Route path="/Certificate/:internId" element={<Certificate/>} />

      </Routes>
    </Router>
    
  );
}

export default App;
