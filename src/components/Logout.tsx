import React from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './api/car-api';
import { FiLogOut } from 'react-icons/fi';

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

  return <div onClick={handleLogout}>
  <Button >
    Logout <FiLogOut className="ml-2" />
  </Button>
</div>;
};

export default Logout;
