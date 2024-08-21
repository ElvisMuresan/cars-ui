import React from 'react';
import axios from 'axios';

interface LogoutProps {
  token: string;
  clearToken: () => void;
}

const Logout: React.FC<LogoutProps> = ({ token, clearToken }) => {
  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/logout',
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      clearToken();
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
