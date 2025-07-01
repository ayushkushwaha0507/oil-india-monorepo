const API_BASE = 'http://localhost:4000/api/files';

export const loginOrRegister = async (form: any, isLogin: boolean) => {
  const url = isLogin
    ? 'http://localhost:5000/api/auth/login'
    : 'http://localhost:5000/api/auth/register';

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  return await res.json();
};

export const fetchProjectById = async (id: string) => {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`${API_BASE}/project/${id}`, {
    headers: { Authorization: `Bearer ${token || ''}` },
  });
  return await res.json();
};
