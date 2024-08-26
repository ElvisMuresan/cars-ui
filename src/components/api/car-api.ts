import axios from 'axios';

const BASE_URL = 'http://localhost:3000'

export const loginUser = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };