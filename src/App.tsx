import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import NotFound from './component/NotFound'; 
import UserList from './component/User'
 
import MyForm from './component/Form';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <UserList /> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/User" element={<UserList />} />
        <Route path="/Form" element={<MyForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
      
      </QueryClientProvider>
  );
}

export default App;
