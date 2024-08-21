import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'flowbite-react';

interface LoginProps {
  setToken: (token: string) => void;
  setUsername:(username: string) => void
}

const Login: React.FC<LoginProps> = ({ setToken, setUsername }) => {
  const [username, setUsernameInput] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      setToken(response.data.user.token);
      setUsername(response.data.user.username)
      localStorage.setItem('token', response.data.user.token);
      localStorage.setItem('username', response.data.user.username);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
        <div className='bg-slate-800 boredr border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
        <h1 className='text-4xl text-white font-bold text-center mb-6'>Login</h1>
        <form onSubmit={handleLogin}>
        <div className='relative my-4'>
          <label>Username</label>
          <input type="text" className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600' value={username} onChange={(e) => setUsernameInput(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">Login</Button>
      </form>
        </div>
      {/* 
       */}
    </div>
  );
};

export default Login;
