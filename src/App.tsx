import React, { useState } from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const [username, setUsername] = useState<string>(localStorage.getItem('username') || '');

  const clearToken = () => {setToken('')
  setUsername('');
  };

  return (
    <div>
      {token ? (
        <div>
          <h1>Welcome, {username}!</h1>
          <Logout token={token} clearToken={clearToken} />
        </div>
      ) : (
        <Routes>
        <Route path='login' element={<Login setToken={setToken} setUsername={setUsername}/>} />
        </Routes>
      )}
    </div>
  );
};

export default App;
