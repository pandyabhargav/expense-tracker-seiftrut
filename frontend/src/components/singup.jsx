import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = ({ setIsAuth }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', { username, email, password });
      setMessage(response.data.message);
      setUsername('');
      setEmail('');
      setPassword('');
      setIsAuth(true);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <div className="flex items-center singup justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
        {message && <div className={`alert alert-success`} role="alert">{message}</div>}
        {error && <div className={`alert alert-danger`} role="alert">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-2 mt-3 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-orange-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-700">
          Already have an account? <a href="/login" className="text-orange-400 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
