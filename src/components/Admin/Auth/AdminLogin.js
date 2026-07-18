import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../../services/adminApi';
import { useAdmin } from '../../../context/AdminContext';
import './AdminLogin.css';

export default function AdminLogin() {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await adminLogin(form);
      const { admin, token } = res.data.data;
      login(admin, token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <span className="admin-login-brand">Instayards</span>
          <span className="admin-login-badge">Admin</span>
        </div>
        <h1 className="admin-login-title">Welcome back</h1>
        <p className="admin-login-sub">Sign in to the admin panel</p>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-field">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="admin@instayards.com"
              required
            />
          </div>
          <div className="admin-field">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
