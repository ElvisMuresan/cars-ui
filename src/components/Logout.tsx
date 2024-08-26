import React from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './api/car-api';

interface LogoutProps {
  token: string;
  clearToken: () => void;
}

const Logout: React.FC<LogoutProps> = ({ token, clearToken }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser(token)
      clearToken();
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate("/")
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
