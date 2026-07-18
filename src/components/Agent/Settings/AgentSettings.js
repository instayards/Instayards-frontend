import { useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiLock } from 'react-icons/fi';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import AgentLayout from '../AgentLayout';
import { useAgent } from '../../../context/AgentContext';
import { agentChangePassword } from '../../../services/agentApi';

const t = {
  primary: '#0d5aa7', success: '#10b981', danger: '#ef4444',
  text: '#1e293b', textSec: '#64748b', textLight: '#94a3b8',
  bg: '#f1f5f9', bgWhite: '#ffffff', border: '#e2e8f0',
  shadow: '0 1px 3px rgba(0,0,0,0.08)',
};

const Card = styled(Box)({
  background: t.bgWhite, borderRadius: 12, boxShadow: t.shadow,
  border: `1px solid ${t.border}`, padding: '28px',
  maxWidth: 480,
});

const Field = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 6 });
const Label = styled('label')({ fontSize: 13, fontWeight: 600, color: t.text });
const Input = styled('input')({
  padding: '11px 14px', border: `2px solid ${t.border}`, borderRadius: 8,
  fontSize: 14, outline: 'none', fontFamily: 'inherit', color: t.text,
  transition: 'border-color 0.2s',
  '&:focus': { borderColor: t.primary, boxShadow: '0 0 0 3px rgba(13,90,167,0.08)' },
  '&::placeholder': { color: t.textLight },
});
const SubmitBtn = styled('button')({
  padding: '12px 24px', background: t.primary, color: 'white', border: 'none',
  borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
  fontFamily: 'inherit', transition: 'all 0.2s',
  '&:hover': { background: '#0a4a8c' },
  '&:disabled': { opacity: 0.6, cursor: 'not-allowed' },
});
const Alert = styled(Box)(({ variant }) => ({
  padding: '10px 14px', borderRadius: 8, fontSize: 13,
  display: 'flex', alignItems: 'flex-start', gap: 8,
  ...(variant === 'error'
    ? { background: 'rgba(239,68,68,0.08)', color: t.danger, border: `1px solid rgba(239,68,68,0.2)` }
    : { background: 'rgba(16,185,129,0.08)', color: t.success, border: `1px solid rgba(16,185,129,0.2)` }),
}));

const AgentSettings = () => {
  const { token } = useAgent();
  const [form, setForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null); setSuccess(null);
    if (form.new_password.length < 6) return setError('New password must be at least 6 characters.');
    if (form.new_password !== form.confirm_password) return setError('New passwords do not match.');
    setLoading(true);
    try {
      await agentChangePassword(
        { current_password: form.current_password, new_password: form.new_password },
        token
      );
      setSuccess('Password updated successfully.');
      setForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AgentLayout pageTitle="Settings">
      <Typography sx={{ fontSize: 14, color: t.textSec, mb: 3 }}>
        Manage your account settings.
      </Typography>

      <Card>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <Box sx={{
            width: 36, height: 36, borderRadius: 2, background: 'rgba(13,90,167,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primary,
          }}>
            <FiLock size={18} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: t.text }}>Change Password</Typography>
            <Typography sx={{ fontSize: 12, color: t.textSec }}>Update your login password</Typography>
          </Box>
        </Box>

        {error && (
          <Alert variant="error" sx={{ mb: 2 }}>
            <FiAlertCircle style={{ flexShrink: 0, marginTop: 1 }} /> {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" sx={{ mb: 2 }}>
            <FiCheckCircle style={{ flexShrink: 0, marginTop: 1 }} /> {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Field>
            <Label htmlFor="current_password">Current Password *</Label>
            <Input
              id="current_password" name="current_password" type="password"
              value={form.current_password} onChange={handleChange}
              placeholder="Enter current password" required
            />
          </Field>
          <Field>
            <Label htmlFor="new_password">New Password *</Label>
            <Input
              id="new_password" name="new_password" type="password"
              value={form.new_password} onChange={handleChange}
              placeholder="Min 6 characters" required
            />
          </Field>
          <Field>
            <Label htmlFor="confirm_password">Confirm New Password *</Label>
            <Input
              id="confirm_password" name="confirm_password" type="password"
              value={form.confirm_password} onChange={handleChange}
              placeholder="Re-enter new password" required
            />
          </Field>
          <Box sx={{ mt: 1 }}>
            <SubmitBtn type="submit" disabled={loading}>
              {loading ? 'Updating…' : 'Update Password'}
            </SubmitBtn>
          </Box>
        </Box>
      </Card>
    </AgentLayout>
  );
};

export default AgentSettings;
