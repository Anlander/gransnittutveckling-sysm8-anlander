import axios from "axios";

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const response = await axios.get('http://localhost:3001/users', {
    params: { token }
  });

  return response.data[0] || null;
};

export const logout = (navigate) => {
  return () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
};
