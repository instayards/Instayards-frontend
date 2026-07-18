import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import { useAgent } from '../../../context/AgentContext';
import { agentLogin } from '../../../services/agentApi';
import {
  AuthPage, AuthCard, AuthLogo, AuthLogoText, AuthLogoSub,
  AuthTitle, AuthSubtitle, AuthForm, AuthField, AuthLabel, AuthInput,
  AuthSubmitBtn, AuthDivider, AuthLink, AuthFooter, AuthAlert,
} from './AgentAuthStyles';

const AgentLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAgent();
  const navigate = useNavigate();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await agentLogin(form);
      const { agent, token } = res.data.data;
      login(agent, token);
      navigate('/agent/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <AuthCard>
        <AuthLogo>
          <AuthLogoText>Insta<span>yards</span></AuthLogoText>
          <AuthLogoSub>Realtor Portal</AuthLogoSub>
        </AuthLogo>

        <AuthTitle>Welcome back</AuthTitle>
        <AuthSubtitle>Sign in to your agent account to manage your listings.</AuthSubtitle>

        {error && (
          <AuthAlert variant="error" style={{ marginBottom: 16 }}>
            <FiAlertCircle style={{ flexShrink: 0, marginTop: 1 }} /> {error}
          </AuthAlert>
        )}

        <AuthForm onSubmit={handleSubmit}>
          <AuthField>
            <AuthLabel htmlFor="email">Email Address</AuthLabel>
            <AuthInput
              type="email" id="email" name="email"
              value={form.email} onChange={handleChange}
              placeholder="you@example.com" required
            />
          </AuthField>

          <AuthField>
            <AuthLabel htmlFor="password">Password</AuthLabel>
            <AuthInput
              type="password" id="password" name="password"
              value={form.password} onChange={handleChange}
              placeholder="Enter your password" required
            />
          </AuthField>

          <AuthSubmitBtn type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </AuthSubmitBtn>
        </AuthForm>

        <AuthDivider style={{ marginTop: 24 }}>or</AuthDivider>

        <AuthFooter>
          Don't have an account?{' '}
          <AuthLink to="/agent/signup">Create one free</AuthLink>
        </AuthFooter>
      </AuthCard>
    </AuthPage>
  );
};

export default AgentLogin;
