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
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsernameInput(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
