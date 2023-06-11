import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home'; 
import NotFound from './component/NotFound'; 
import UserList from './component/User'
 
import MyForm from './component/SignUp';
import { QueryClient, QueryClientProvider } from 'react-query'; 
  
import { ProtectedRoute } from './AuthGuard/AuthGuard';
import { AuthContext, AuthProvider } from './AuthGuard/AuthProvider';
import { Login } from './component/login';
import { A } from './component/a';
const queryClient = new QueryClient();

function App() { 
   console.log('app')
 
   React.useEffect(()=>{

   },[])
  return (
    <QueryClientProvider client={queryClient}>
      
      <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserList  />
          </ProtectedRoute>
        }
         />
        <Route path="/Signup" element={<MyForm />} />
        <Route path="/Login" element={<Login />} />
       
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
      </AuthProvider>
      </QueryClientProvider>
  );
}

export default App;
