import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";

interface LoginProps {
  setToken: (token: string) => void;
  setUsername: (username: string) => void;
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
      setUsername(response.data.user.username);
      localStorage.setItem('token', response.data.user.token);
      localStorage.setItem('username', response.data.user.username);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <div className='bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
        <h1 className='text-4xl text-white font-bold text-center mb-6'>Login</h1>
        <form onSubmit={handleLogin}>
          <div className='relative my-4'>
            <input 
              type="text" 
              id="username" 
              className='peer block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700'
              placeholder=" " 
              value={username} 
              onChange={(e) => setUsernameInput(e.target.value)} 
            />
            <label 
              htmlFor="username" 
              className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Username
            </label>
            <BiUser className='absolute top-4 right-4'/>
          </div>
          <div className='relative my-4'>
            <input 
              type="password" 
              id="password" 
              className='peer block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700'
              placeholder=" " 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <label 
              htmlFor="password" 
              className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Password
            </label>
            <AiOutlineUnlock className='absolute top-4 right-4'/>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button className='w-full mb-4 text-[18px] mt-6 rounded-full py-2' type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
