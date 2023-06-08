import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import NotFound from './component/NotFound'; 
import UserList from './component/User'
 
import MyForm from './component/SignUp';
import { QueryClient, QueryClientProvider } from 'react-query'; 
import User from './component/User';  
import { ProtectedRoute } from './AuthGuard/AuthGuard';
import { AuthProvider } from './AuthGuard/AuthProvider';
const queryClient = new QueryClient();

function App() {
  const isAuthenticated = true; // Replace with your authentication logic
  const authenticationPath = '/login';
  const redirectPath = '/';
  return (
    <QueryClientProvider client={queryClient}>
      
      <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />
        <Route path="/Signup" element={<MyForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
      </AuthProvider>
      </QueryClientProvider>
  );
}

export default App;
