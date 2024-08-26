import axios from 'axios';

const BASE_URL = 'http://localhost:3000'

export const loginUser = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

export const logoutUser = async (token: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/logout`, {
      },
    {
        headers: {
            Authorization: token,
        },
    });
      return response.data;
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  export const fetchCars = async (token: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/cars`, {
            headers: {
                Authorization: token,
            },
        });
        return response.data
    } catch(error) {
        throw new Error('Failed to fetch cars')
    }
  }