import { useState, useEffect, useRef } from 'react';
import { FiUsers, FiPlus, FiAlertCircle, FiCheckCircle, FiMail, FiLock, FiX, FiStar, FiUser, FiKey } from 'react-icons/fi';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import AgentLayout from '../AgentLayout';
import { useAgent } from '../../../context/AgentContext';
import { getMembers, memberSendOtp, addMember, changeMemberPassword } from '../../../services/agentApi';

/* ── Design tokens (match dashboard) ───────────────────────────────────── */
const t = {
  primary: '#0d5aa7', success: '#10b981', warning: '#f59e0b', danger: '#ef4444',
  text: '#1e293b', textSec: '#64748b', textLight: '#94a3b8',
  bg: '#f1f5f9', bgWhite: '#ffffff', border: '#e2e8f0',
  shadow: '0 1px 3px rgba(0,0,0,0.08)',
};

/* ── Styled components ──────────────────────────────────────────────────── */
const Card = styled(Box)({
  background: t.bgWhite, borderRadius: 12, boxShadow: t.shadow,
  border: `1px solid ${t.border}`, overflow: 'hidden',
});

const QuotaBar = styled(Box)({
  background: t.bgWhite, borderRadius: 12, padding: '20px 24px',
  boxShadow: t.shadow, border: `1px solid ${t.border}`,
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  flexWrap: 'wrap', gap: 16,
  borderLeft: `4px solid ${t.primary}`,
});

const ProgressTrack = styled(Box)({
  height: 8, background: '#e2e8f0', borderRadius: 4, flex: 1, minWidth: 120,
});
const ProgressFill = styled(Box)(({ pct, danger }) => ({
  height: '100%', borderRadius: 4,
  width: `${Math.min(pct, 100)}%`,
  background: danger ? t.danger : pct >= 80 ? t.warning : t.primary,
  transition: 'width 0.4s ease',
}));

const AddBtn = styled('button')({
  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
  background: t.primary, color: 'white', border: 'none', borderRadius: 8,
  fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
  transition: 'all 0.2s ease',
  '&:hover': { background: '#0a4a8c', transform: 'translateY(-1px)' },
  '&:disabled': { opacity: 0.6, cursor: 'not-allowed', transform: 'none' },
});

const UpgradeBanner = styled(Box)({
  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
  border: `1px solid #f59e0b`, borderRadius: 10, padding: '14px 20px',
  display: 'flex', alignItems: 'center', gap: 12,
});

const TableHead = styled(Box)({
  display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr 80px',
  padding: '12px 20px', background: t.bg, borderBottom: `1px solid ${t.border}`,
  '& span': { fontSize: 12, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 },
  '@media (max-width: 768px)': { gridTemplateColumns: '2fr 2fr 1fr 60px' },
});

const TableRow = styled(Box)({
  display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr 80px',
  padding: '14px 20px', borderBottom: `1px solid ${t.border}`, alignItems: 'center',
  '&:last-child': { borderBottom: 'none' },
  '&:hover': { background: t.bg },
  '@media (max-width: 768px)': { gridTemplateColumns: '2fr 2fr 1fr 60px' },
});

const IconBtn = styled('button')({
  display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px',
  background: 'rgba(13,90,167,0.08)', color: t.primary, border: 'none',
  borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
  '&:hover': { background: 'rgba(13,90,167,0.16)' },
  '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
});

const RoleBadge = styled(Box)(({ role }) => ({
  display: 'inline-flex', alignItems: 'center', gap: 4,
  padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
  ...(role === 'OWNER'
    ? { background: 'rgba(13,90,167,0.1)', color: t.primary }
    : { background: 'rgba(16,185,129,0.1)', color: t.success }),
}));

const FormCard = styled(Box)({
  background: t.bgWhite, borderRadius: 12, boxShadow: t.shadow,
  border: `1px solid ${t.border}`, padding: '28px 28px',
  '@media (max-width: 576px)': { padding: '20px 16px' },
});

const FormRow = styled(Box)({
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
  '@media (max-width: 576px)': { gridTemplateColumns: '1fr' },
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

const OTP_RESEND = 60;
const BLANK_FORM = { name: '', email: '', phone: '', password: '', license_no: '' };

/* ── Component ──────────────────────────────────────────────────────────── */
const AgentMembers = () => {
  const { token, agent } = useAgent();
  const isOwner = agent?.role === 'OWNER';

  const [data, setData]         = useState({ members: [], total: 0, max_users: 5 });
  const [loadingList, setLoadingList] = useState(true);

  const [showForm, setShowForm] = useState(false); // false | 'step1' | 'step2'
  const [form, setForm]         = useState(BLANK_FORM);
  const [otp, setOtp]           = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [success, setSuccess]   = useState(null);
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef(null);

  // Change member password modal
  const [pwdModal, setPwdModal] = useState(null); // null | { id, name }
  const [newPwd, setNewPwd]     = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError]     = useState(null);
  const [pwdSuccess, setPwdSuccess] = useState(null);

  const openPwdModal  = (m) => { setPwdModal(m); setNewPwd(''); setPwdError(null); setPwdSuccess(null); };
  const closePwdModal = () => { setPwdModal(null); setNewPwd(''); setPwdError(null); setPwdSuccess(null); };

  const handleChangeMemberPwd = async (e) => {
    e.preventDefault();
    setPwdError(null);
    if (newPwd.length < 6) return setPwdError('Password must be at least 6 characters.');
    setPwdLoading(true);
    try {
      await changeMemberPassword(pwdModal.id, { new_password: newPwd }, token);
      setPwdSuccess('Password updated successfully.');
      setTimeout(closePwdModal, 1500);
    } catch (err) {
      setPwdError(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setPwdLoading(false);
    }
  };

  const fetchMembers = () => {
    setLoadingList(true);
    getMembers(token)
      .then(res => setData(res.data.data || { members: [], total: 0, max_users: 5 }))
      .catch(() => {})
      .finally(() => setLoadingList(false));
  };

  useEffect(() => { fetchMembers(); }, [token]);
  useEffect(() => () => clearInterval(timerRef.current), []);

  const startTimer = () => {
    setResendTimer(OTP_RESEND);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer(t => { if (t <= 1) { clearInterval(timerRef.current); return 0; } return t - 1; });
    }, 1000);
  };

  const resetForm = () => {
    setShowForm(false); setForm(BLANK_FORM); setOtp('');
    setError(null); setSuccess(null); clearInterval(timerRef.current);
  };

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  /* ── Step 1: send OTP ─────────────────────────────────────── */
  const handleSendOtp = async e => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    setLoading(true);
    try {
      await memberSendOtp({ email: form.email, phone: form.phone }, token);
      setShowForm('step2');
      startTimer();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Resend OTP ───────────────────────────────────────────── */
  const handleResend = async () => {
    if (resendTimer > 0) return;
    setError(null);
    setLoading(true);
    try {
      await memberSendOtp({ email: form.email, phone: form.phone }, token);
      startTimer();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 2: add member ───────────────────────────────────── */
  const handleAdd = async e => {
    e.preventDefault();
    setError(null);
    if (otp.length !== 6) return setError('OTP must be 6 digits.');
    setLoading(true);
    try {
      await addMember({ ...form, otp }, token);
      setSuccess(`${form.name} has been added as a realtor.`);
      fetchMembers();
      setTimeout(resetForm, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add realtor.');
    } finally {
      setLoading(false);
    }
  };

  const pct = Math.round((data.total / data.max_users) * 100);
  const atLimit = data.total >= data.max_users;

  return (
    <AgentLayout pageTitle="Team">
      <Typography sx={{ fontSize: 14, color: t.textSec, mb: 3 }}>
        Manage realtors in your organization.
      </Typography>

      {/* ── Quota bar ── */}
      <QuotaBar sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: 2, background: 'rgba(13,90,167,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.primary }}>
            <FiUsers size={20} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: t.text, lineHeight: 1 }}>
              {data.total} <Typography component="span" sx={{ fontSize: 14, fontWeight: 500, color: t.textSec }}>/ {data.max_users} realtors</Typography>
            </Typography>
            <Typography sx={{ fontSize: 12, color: t.textSec, mt: 0.5 }}>Free plan · Upgrade for more</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 160, maxWidth: 280 }}>
          <ProgressTrack>
            <ProgressFill pct={pct} danger={atLimit ? 1 : 0} />
          </ProgressTrack>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: atLimit ? t.danger : t.textSec, whiteSpace: 'nowrap' }}>
            {pct}%
          </Typography>
        </Box>
        {isOwner && !atLimit && !showForm && (
          <AddBtn onClick={() => setShowForm('step1')}>
            <FiPlus size={16} /> Add Realtor
          </AddBtn>
        )}
      </QuotaBar>

      {/* ── Upgrade banner when at limit ── */}
      {atLimit && isOwner && (
        <UpgradeBanner sx={{ mb: 3 }}>
          <FiLock size={20} style={{ color: t.warning, flexShrink: 0 }} />
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#92400e' }}>Realtor limit reached</Typography>
            <Typography sx={{ fontSize: 13, color: '#92400e', mt: 0.3 }}>
              You've used all {data.max_users} realtor slots. Upgrade your plan to add more team members.
            </Typography>
          </Box>
        </UpgradeBanner>
      )}

      {/* ── Add Realtor form ── */}
      {isOwner && showForm && (
        <FormCard sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
            <Box>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: t.text }}>Add Realtor</Typography>
              <Typography sx={{ fontSize: 13, color: t.textSec, mt: 0.3 }}>
                {showForm === 'step1' ? 'Fill in the realtor\'s details. An OTP will be sent to verify.' : `Enter the OTP sent to ${form.email} and +91 ${form.phone}.`}
              </Typography>
            </Box>
            <Box onClick={resetForm} sx={{ cursor: 'pointer', color: t.textSec, '&:hover': { color: t.danger } }}>
              <FiX size={20} />
            </Box>
          </Box>

          {/* Step indicators */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            {[1, 2].map(s => (
              <Box key={s} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                  width: 24, height: 24, borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
                  background: (showForm === 'step1' ? s === 1 : true) ? t.primary : '#e2e8f0',
                  color: (showForm === 'step1' ? s === 1 : true) ? 'white' : t.textLight,
                }}>
                  {s}
                </Box>
                <Typography sx={{ fontSize: 12, color: t.textSec }}>
                  {s === 1 ? 'Details' : 'Verify OTP'}
                </Typography>
                {s < 2 && <Box sx={{ width: 32, height: 2, background: showForm === 'step2' ? t.primary : '#e2e8f0', borderRadius: 1 }} />}
              </Box>
            ))}
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

          {/* ── Step 1 form ── */}
          {showForm === 'step1' && (
            <Box component="form" onSubmit={handleSendOtp} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormRow>
                <Field>
                  <Label>Full Name *</Label>
                  <Input name="name" value={form.name} onChange={handleChange} placeholder="Realtor's name" required />
                </Field>
                <Field>
                  <Label>Phone Number *</Label>
                  <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="10-digit mobile" required />
                </Field>
              </FormRow>
              <Field>
                <Label>Email Address *</Label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="realtor@example.com" required />
              </Field>
              <Field>
                <Label>Password *</Label>
                <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" required />
              </Field>
              <Field>
                <Label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  RERA / License No. <span style={{ fontWeight: 400, color: t.textLight }}>Optional</span>
                </Label>
                <Input name="license_no" value={form.license_no} onChange={handleChange} placeholder="RERA / license no." />
              </Field>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <SubmitBtn type="submit" disabled={loading}>
                  {loading ? 'Sending OTP…' : 'Send OTP'}
                </SubmitBtn>
                <SubmitBtn type="button" onClick={resetForm} style={{ background: 'transparent', color: t.textSec, border: `1px solid ${t.border}` }}>
                  Cancel
                </SubmitBtn>
              </Box>
            </Box>
          )}

          {/* ── Step 2 OTP ── */}
          {showForm === 'step2' && (
            <Box component="form" onSubmit={handleAdd} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Field>
                <Label>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiMail size={13} /> Enter OTP
                  </Box>
                </Label>
                <Input
                  type="text" value={otp} onChange={e => setOtp(e.target.value)}
                  placeholder="6-digit OTP" maxLength={6} inputMode="numeric"
                  required style={{ textAlign: 'center', letterSpacing: 8, fontSize: 22, maxWidth: 240 }}
                />
              </Field>
              <Typography sx={{ fontSize: 13, color: t.textSec }}>
                Didn't receive it?{' '}
                {resendTimer > 0 ? (
                  <span style={{ color: t.textLight }}>Resend in {resendTimer}s</span>
                ) : (
                  <span onClick={handleResend} style={{ color: t.primary, fontWeight: 600, cursor: 'pointer' }}>
                    Resend OTP
                  </span>
                )}
                {' · '}
                <span onClick={() => { setShowForm('step1'); setOtp(''); setError(null); }} style={{ color: t.primary, fontWeight: 600, cursor: 'pointer' }}>
                  ← Edit details
                </span>
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <SubmitBtn type="submit" disabled={loading}>
                  {loading ? 'Adding…' : 'Add Realtor'}
                </SubmitBtn>
              </Box>
            </Box>
          )}
        </FormCard>
      )}

      {/* ── Members table ── */}
      <Card>
        <Box sx={{ padding: '16px 20px', borderBottom: `1px solid ${t.border}` }}>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: t.text }}>Team Members</Typography>
        </Box>
        <TableHead>
          <span>Name</span>
          <span>Email</span>
          <span className="hide-sm">Phone</span>
          <span>Role</span>
          <span className="hide-sm">Joined</span>
          <span>{isOwner ? 'Action' : ''}</span>
        </TableHead>

        {loadingList ? (
          <Box sx={{ padding: '40px 20px', textAlign: 'center', color: t.textSec, fontSize: 14 }}>Loading…</Box>
        ) : data.members.length === 0 ? (
          <Box sx={{ padding: '40px 20px', textAlign: 'center', color: t.textSec, fontSize: 14 }}>
            No realtors yet.{isOwner && ' Use the "Add Realtor" button to add your first team member.'}
          </Box>
        ) : (
          data.members.map(m => (
            <TableRow key={m.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Box sx={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: m.role === 'OWNER' ? 'rgba(13,90,167,0.12)' : 'rgba(16,185,129,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: m.role === 'OWNER' ? t.primary : t.success, fontSize: 14, fontWeight: 700,
                }}>
                  {m.role === 'OWNER' ? <FiStar size={15} /> : <FiUser size={15} />}
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: t.text }}>{m.name}</Typography>
                  {m.license_no && <Typography sx={{ fontSize: 11, color: t.textSec }}>RERA: {m.license_no}</Typography>}
                </Box>
              </Box>
              <Typography sx={{ fontSize: 13, color: t.textSec }}>{m.email}</Typography>
              <Typography sx={{ fontSize: 13, color: t.textSec }}>{m.phone}</Typography>
              <RoleBadge role={m.role}>
                {m.role === 'OWNER' ? <FiStar size={10} /> : <FiUser size={10} />}
                {m.role}
              </RoleBadge>
              <Typography sx={{ fontSize: 12, color: t.textSec }}>
                {new Date(m.created_at).toLocaleDateString('en-IN')}
              </Typography>
              <Box>
                {isOwner && (
                  <IconBtn onClick={() => openPwdModal(m)}>
                    <FiKey size={12} /> Pwd
                  </IconBtn>
                )}
              </Box>
            </TableRow>
          ))
        )}
      </Card>
      {/* ── Change member password modal ── */}
      {pwdModal && (
        <Box sx={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1200,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2,
        }}>
          <Box sx={{
            background: '#fff', borderRadius: 3, padding: '28px 28px', width: '100%', maxWidth: 400,
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: t.text }}>
                Change Password
              </Typography>
              <Box onClick={closePwdModal} sx={{ cursor: 'pointer', color: t.textSec, '&:hover': { color: t.danger } }}>
                <FiX size={20} />
              </Box>
            </Box>
            <Typography sx={{ fontSize: 13, color: t.textSec, mb: 2.5 }}>
              Set a new password for <strong>{pwdModal.name}</strong>.
            </Typography>

            {pwdError && (
              <Alert variant="error" sx={{ mb: 2 }}>
                <FiAlertCircle style={{ flexShrink: 0 }} /> {pwdError}
              </Alert>
            )}
            {pwdSuccess && (
              <Alert variant="success" sx={{ mb: 2 }}>
                <FiCheckCircle style={{ flexShrink: 0 }} /> {pwdSuccess}
              </Alert>
            )}

            <Box component="form" onSubmit={handleChangeMemberPwd} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Field>
                <Label>New Password *</Label>
                <Input
                  type="password" value={newPwd}
                  onChange={e => setNewPwd(e.target.value)}
                  placeholder="Min 6 characters" required
                />
              </Field>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <SubmitBtn type="submit" disabled={pwdLoading}>
                  {pwdLoading ? 'Updating…' : 'Update Password'}
                </SubmitBtn>
                <SubmitBtn type="button" onClick={closePwdModal} style={{ background: 'transparent', color: t.textSec, border: `1px solid ${t.border}` }}>
                  Cancel
                </SubmitBtn>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </AgentLayout>
  );
};

export default AgentMembers;
