import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const checkUser = await axios.get('http://localhost:3001/users', {
        params: { email: formData.email }
      });

      if (checkUser.data.length > 0) {
        setError('Email already exists');
        return;
      }

      const response = await axios.post('http://localhost:3001/users', {
        ...formData,
        token: `fake-token-${Date.now()}` // Simple token simulation
      });

      localStorage.setItem('token', response.data.token);
      navigate('/checkout');

    } catch (err) {
      setError('Registration failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-login my-24 w-[95%] p-14 rounded-lg lg:w-[40%] mx-auto">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
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
      <button className="text-[2rem] uppercase font-bold transition-all duration-300 bg-[#2b2d42] text-[#eeeddb]" type="submit">
        Register
      </button>
      <Link to="/login">Already have an account?</Link>
    </form>
  );
};
