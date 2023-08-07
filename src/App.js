import './App.css';
// import Signup from './components/Signup';
// import Login from './components/Login';
import Loginset from './components/Loginset';
// import { useState,useEffect } from 'react';
import {Routes,Route,BrowserRouter} from 'react-router-dom'
// import {collection,getDocs} from "firebase/firestore"
// import {db} from "./components/FirebaseFile"
// import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
// import {db} from './components/FirebaseFile'
// import { addDoc, collection } from 'firebase/firestore';
import Home from './components/Home';
import Setfolder from './components/Setfolder';
import Protected from './components/Protected';
// import Signup from './components/Signup';

function App() {
  // const check= async()=>{
  //   const res = await addDoc(collection(db,"cities"),{
  //     class:"four",
  //     pincode:7,
  //     city:"karachi"
  //   })
  //   console.log("result",res)
  // }
  return (
    <div className="heading">
      {/* <button onClick={check}>click</button> */}
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
