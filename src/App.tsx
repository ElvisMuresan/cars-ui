import React, { useState } from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import { Route, Routes } from 'react-router-dom';
import bg2Image from './components/img/bg6.jpg';
import CarsList from './components/CarsList';


const App: React.FC = () => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const [username, setUsername] = useState<string>(localStorage.getItem('username') || '');

  const clearToken = () => {setToken('')
  setUsername('');
  };

  return (
    <div className='text-white h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url(${bg2Image})`}}>
      {token ? (
        <>
        <div className="absolute top-4 right-4">
          <h1>Welcome, {username}!</h1>
          <Logout token={token} clearToken={clearToken} />
        </div>
        <CarsList token={token} />
        </>
      ) : (
        <Routes>
        <Route path='login' element={<Login setToken={setToken} setUsername={setUsername}/>} />
        </Routes>
      )}
    </div>
  );
};

export default App;
