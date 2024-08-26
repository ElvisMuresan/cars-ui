import React, { useState } from 'react';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import bg2Image from './components/img/bg7.jpg';
import CarsList from './components/CarsList';
import CarDetails from './components/CarDetails';
import AddCar from './components/AddCar';
import EditCar from './components/EditCar';
import UserDropdown from './components/UserDropdown';


const App: React.FC = () => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const [username, setUsername] = useState<string>(localStorage.getItem('username') || '');

  const clearToken = () => {setToken('')
  setUsername('');
  };

  const user = {
    username,
    fullName: username === 'elvis' ? 'Elvis Muresan' : 'Florin Bejera',
    email: username === 'elvis' ? 'elvis.e.muresan@gmail.com' : 'florinpentru0306@gmail.com',
  };

  return (
    <div className='text-white h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url(${bg2Image})`}}>
      {token ? (
        <>
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <span className="text-white font-semibold">User Info</span>
          <UserDropdown
                username={user.username}
                fullName={user.fullName}
                email={user.email}
                token={token}
                clearToken={clearToken}           
          />

        </div>
        <Routes>
            <Route path="/" element={<CarsList token={token} />} />
            <Route path="/:id" element={<CarDetails token={token} />} />
            <Route path="/add-car" element={<AddCar token={token} />} />
            <Route path="/edit-car/:id" element={<EditCar token={token} />} />
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
