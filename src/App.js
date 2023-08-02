import './App.css';
// import Signup from './components/Signup';
// import Login from './components/Login';
import Loginset from './components/Loginset';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
// import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';

import Home from './components/Home';
import Setfolder from './components/Setfolder';
import Protected from './components/Protected';
// import Signup from './components/Signup';

function App() {
  return (
    <div className="heading">
      <BrowserRouter>
      <Routes>
      <Route path="/home" element={<Protected Component={Home}/>}/>
      <Route path="/" element={<Loginset/>}/>
        <Route path='/signup' element={<Setfolder/>}/>
      </Routes>
      </BrowserRouter>
     </div>
  )}


export default App;
