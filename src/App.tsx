import React, { useState } from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import { Route, Routes } from 'react-router-dom';
import bg2Image from './components/img/bg7.jpg';
import CarsList from './components/CarsList';
import CarDetails from './components/CarDetails';
import AddCar from './components/AddCar';


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
        <Routes>
            <Route path="/" element={<CarsList token={token} />} />
            <Route path="/:id" element={<CarDetails token={token} />} />
            <Route path="/add-car" element={<AddCar token={token} />} />
          </Routes>
        </>
      ) : (
        <Routes>
        <Route path='/' element={<Login setToken={setToken} setUsername={setUsername}/>} />
        </Routes>
      )}
    </div>
  );
};

export default App;
