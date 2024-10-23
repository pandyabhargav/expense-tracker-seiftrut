import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import InputForm from './components/InputForm';
import ShowRecentTransactions from './components/ShowRecentTransactions';
import Calculation from './components/Calculation';
import Signup from './components/singup'; 
import Login from './components/login';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsAuth(true);  
    } else {
      setIsAuth(false); 
    }
    
    setLoading(false);
  }, []); 

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <Router>
      <div className='pt-3 bg-gray-100 min-h-screen flex flex-col px-5 sm:px-10 items-center'>
      <h1 className='font-title font-extrabold text-4xl py-4 text-center border-gray-300 border-b-3'>
          Expense Tracker
        </h1>
          <div className='col-12 d-flex calc'>
            <Routes>
            <Route path="/" element={isAuth ? <Calculation /> : <Navigate to="/login" />} />
            <Route path="/calculation" element={isAuth ? <Calculation /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        <div className='flex flex-col md:flex-row mt-6 gap-6 h-auto w-full max-w-5xl mb-6'>
          <div className='flex flex-col gap-5 w-full max-w-2xl'>
            <Routes>
              <Route path="/" element={isAuth ? <InputForm /> : <Navigate to="/login" />} />
              <Route path="/input" element={isAuth ? <InputForm /> : <Navigate to="/login" />} />
            </Routes>
            
          </div>
          <div className='w-full max-w-2xl'>
            <Routes>
              <Route path="/" element={isAuth ? <ShowRecentTransactions /> : <Navigate to="/login" />} />
              <Route path="/recent-transactions" element={isAuth ? <ShowRecentTransactions /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </div>

        <Routes>
          <Route path="/signup" element={<Signup setIsAuth={setIsAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
