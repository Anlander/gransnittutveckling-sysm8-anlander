import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          email: formData.email,
          password: formData.password
        }
      });

      if (response.data.length > 0) {
        localStorage.setItem('token', response.data[0].token);
        navigate('/checkout');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-login my-24 w-[95%] p-14 rounded-lg lg:w-[40%] mx-auto">
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="bg-[#2b2d42] text-[#eeeddb] text-[2rem] uppercase font-bold transition-all duration-300" type="submit">
        Login
      </button>
      <Link to="/register">No account?</Link>
    </form>
  );
};
