import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginOrRegister } from '../services/api';

const AuthForm: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await loginOrRegister(form, isLogin);

    if (data.token) {
      localStorage.setItem('authToken', data.token);
      // 👇 Navigate to hardcoded projectId or fetch user-specific later
      navigate('/project-manager');
    } else {
      alert(data.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-full border px-4 py-2 rounded" />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full border px-4 py-2 rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isLogin ? 'No account?' : 'Already have an account?'}{' '}
          <button className="text-blue-600 hover:underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
