import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import NotFound from './component/NotFound'; 
import UserList from './component/User'
import User from './component/User';
function App() {
  return (
    <div>
      {/* <UserList /> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/User" element={<UserList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
