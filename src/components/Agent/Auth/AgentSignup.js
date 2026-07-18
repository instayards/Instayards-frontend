import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle, FiMail, FiPhone, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useAgent } from '../../../context/AgentContext';
import { agentSendOtp, agentSignup, agentVerifyRera } from '../../../services/agentApi';
import {
  AuthPage, AuthCard, AuthLogo, AuthLogoText, AuthLogoSub,
  AuthTitle, AuthSubtitle, AuthForm, AuthRow, AuthField, AuthLabel, AuthInput,
  AuthSubmitBtn, AuthDivider, AuthLink, AuthFooter, AuthAlert,
} from './AgentAuthStyles';
import { Box, Typography } from '@mui/material';

const OTP_RESEND_SECONDS = 60;

const AgentSignup = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', license_no: '',
  });
  const [otps, setOtps] = useState({ email_otp: '', phone_otp: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendTimer, setResendTimer] = useState(0);
  // rera: null | 'checking' | 'verified' | 'invalid' | 'not_found' | 'error'
  const [reraStatus, setReraStatus] = useState(null);
  const [reraMsg, setReraMsg] = useState('');
  const timerRef = useRef(null);

  const { login } = useAgent();
  const navigate = useNavigate();

  useEffect(() => () => clearInterval(timerRef.current), []);

  const startResendTimer = () => {
    setResendTimer(OTP_RESEND_SECONDS);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) { clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (e.target.name === 'license_no') { setReraStatus(null); setReraMsg(''); }
  };

  const handleVerifyRera = async () => {
    if (!form.license_no.trim()) return;
    setReraStatus('checking');
    setReraMsg('');
    try {
      const res = await agentVerifyRera(form.license_no.trim());
      const { valid, reason, manualReview } = res.data.data;
      if (valid && manualReview) {
        setReraStatus('verified');
        setReraMsg('Format accepted — RERA will be verified by our team within 24 hours');
      } else if (valid) {
        setReraStatus('verified');
        setReraMsg('Verified in Haryana RERA registry');
      } else {
        setReraStatus('not_found');
        setReraMsg(reason);
      }
    } catch (err) {
      setReraStatus('error');
      setReraMsg('Could not reach HRERA portal. Please try again.');
    }
  };
  const handleOtpChange = (e) => setOtps((p) => ({ ...p, [e.target.name]: e.target.value }));

  /* ── Step 1: send OTP ─────────────────────────────────────────── */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (reraStatus !== 'verified') return setError('Please verify your RERA number before proceeding.');
    setLoading(true);
    try {
      await agentSendOtp({ email: form.email, phone: form.phone });
      setStep(2);
      startResendTimer();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Resend OTP ───────────────────────────────────────────────── */
  const handleResend = async () => {
    if (resendTimer > 0) return;
    setError(null);
    setLoading(true);
    try {
      await agentSendOtp({ email: form.email, phone: form.phone });
      startResendTimer();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 2: verify OTP + create account ──────────────────────── */
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    if (otps.email_otp.length !== 6) return setError('Email OTP must be 6 digits.');
    if (otps.phone_otp.length !== 6) return setError('Phone OTP must be 6 digits.');
    setLoading(true);
    try {
      const res = await agentSignup({ ...form, ...otps });
      const { agent, token } = res.data.data;
      login(agent, token);
      navigate('/agent/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <AuthCard style={{ maxWidth: 540 }}>
        <AuthLogo>
          <AuthLogoText>Insta<span>yards</span></AuthLogoText>
          <AuthLogoSub>Realtor Portal</AuthLogoSub>
        </AuthLogo>

        {/* ── Step indicator ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          {[1, 2].map((s) => (
            <Box key={s} sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              <Box sx={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700,
                background: step >= s ? '#0d5aa7' : '#e2e8f0',
                color: step >= s ? '#fff' : '#94a3b8',
                flexShrink: 0,
              }}>
                {s}
              </Box>
              <Typography sx={{ fontSize: 12, color: step >= s ? '#0d5aa7' : '#94a3b8', fontWeight: 600 }}>
                {s === 1 ? 'Company Details' : 'Verify OTP'}
              </Typography>
              {s < 2 && (
                <Box sx={{ flex: 1, height: 2, background: step > s ? '#0d5aa7' : '#e2e8f0', borderRadius: 1 }} />
              )}
            </Box>
          ))}
        </Box>

        {error && (
          <AuthAlert variant="error" style={{ marginBottom: 16 }}>
            <FiAlertCircle style={{ flexShrink: 0, marginTop: 1 }} /> {error}
          </AuthAlert>
        )}

        {/* ══════════════════════ STEP 1 ══════════════════════ */}
        {step === 1 && (
          <>
            <AuthTitle>Create your account</AuthTitle>
            <AuthSubtitle>Register your company on Instayards and start listing properties.</AuthSubtitle>

            <AuthForm onSubmit={handleSendOtp}>
              <AuthRow>
                <AuthField>
                  <AuthLabel htmlFor="name">Company Name *</AuthLabel>
                  <AuthInput
                    type="text" id="name" name="name"
                    value={form.name} onChange={handleChange}
                    placeholder="Your company name" required
                  />
                </AuthField>
                <AuthField>
                  <AuthLabel htmlFor="phone">Company Phone *</AuthLabel>
                  <AuthInput
                    type="tel" id="phone" name="phone"
                    value={form.phone} onChange={handleChange}
                    placeholder="10-digit mobile" required
                  />
                </AuthField>
              </AuthRow>

              <AuthField>
                <AuthLabel htmlFor="email">Company Email *</AuthLabel>
                <AuthInput
                  type="email" id="email" name="email"
                  value={form.email} onChange={handleChange}
                  placeholder="you@company.com" required
                />
              </AuthField>

              <AuthField>
                <AuthLabel htmlFor="password">Password *</AuthLabel>
                <AuthInput
                  type="password" id="password" name="password"
                  value={form.password} onChange={handleChange}
                  placeholder="Minimum 6 characters" required
                />
              </AuthField>

              <AuthField>
                <AuthLabel htmlFor="license_no">RERA / License No. *</AuthLabel>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <AuthInput
                    type="text" id="license_no" name="license_no"
                    value={form.license_no} onChange={handleChange}
                    placeholder="e.g. RC/HARERA/GGM/13183/1277/8/2025/160"
                    required style={{ flex: 1, margin: 0 }}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyRera}
                    disabled={!form.license_no.trim() || reraStatus === 'checking'}
                    style={{
                      padding: '0 16px', borderRadius: 8, border: '1.5px solid #0d5aa7',
                      background: reraStatus === 'verified' ? '#0d5aa7' : '#fff',
                      color: reraStatus === 'verified' ? '#fff' : '#0d5aa7',
                      fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
                      opacity: (!form.license_no.trim() || reraStatus === 'checking') ? 0.5 : 1,
                    }}
                  >
                    {reraStatus === 'checking' ? 'Checking…' : reraStatus === 'verified' ? '✓ Verified' : 'Verify'}
                  </button>
                </Box>
                {reraStatus && reraStatus !== 'checking' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', mt: '6px', fontSize: 12 }}>
                    {reraStatus === 'verified'
                      ? <FiCheckCircle color="#16a34a" size={13} />
                      : <FiXCircle color="#dc2626" size={13} />}
                    <span style={{ color: reraStatus === 'verified' ? '#16a34a' : '#dc2626' }}>
                      {reraMsg}
                    </span>
                  </Box>
                )}
              </AuthField>

              <AuthSubmitBtn type="submit" disabled={loading}>
                {loading ? 'Sending OTP…' : 'Send OTP'}
              </AuthSubmitBtn>
            </AuthForm>
          </>
        )}

        {/* ══════════════════════ STEP 2 ══════════════════════ */}
        {step === 2 && (
          <>
            <AuthTitle>Verify your identity</AuthTitle>
            <AuthSubtitle>
              We sent a 6-digit OTP to <strong>{form.email}</strong> and a separate OTP to <strong>+91 {form.phone}</strong>. Enter both below.
            </AuthSubtitle>

            <AuthForm onSubmit={handleSignup}>
              <AuthField>
                <AuthLabel htmlFor="email_otp">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiMail size={14} /> Email OTP
                  </Box>
                </AuthLabel>
                <AuthInput
                  type="text" id="email_otp" name="email_otp"
                  value={otps.email_otp} onChange={handleOtpChange}
                  placeholder="6-digit OTP from email"
                  maxLength={6} inputMode="numeric" required
                  style={{ textAlign: 'center', letterSpacing: 8, fontSize: 22 }}
                />
              </AuthField>

              <AuthField>
                <AuthLabel htmlFor="phone_otp">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiPhone size={14} /> Phone OTP
                  </Box>
                </AuthLabel>
                <AuthInput
                  type="text" id="phone_otp" name="phone_otp"
                  value={otps.phone_otp} onChange={handleOtpChange}
                  placeholder="6-digit OTP from SMS"
                  maxLength={6} inputMode="numeric" required
                  style={{ textAlign: 'center', letterSpacing: 8, fontSize: 22 }}
                />
              </AuthField>

              <AuthSubmitBtn type="submit" disabled={loading}>
                {loading ? 'Creating account…' : 'Verify & Create Account'}
              </AuthSubmitBtn>
            </AuthForm>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography sx={{ fontSize: 13, color: '#64748b' }}>
                Didn't receive the OTP?{' '}
                {resendTimer > 0 ? (
                  <span style={{ color: '#94a3b8' }}>Resend in {resendTimer}s</span>
                ) : (
                  <span
                    onClick={handleResend}
                    style={{ color: '#0d5aa7', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Resend OTP
                  </span>
                )}
              </Typography>
              <Typography
                sx={{ fontSize: 13, color: '#0d5aa7', fontWeight: 600, cursor: 'pointer', mt: 1 }}
                onClick={() => { setStep(1); setError(null); setOtps({ email_otp: '', phone_otp: '' }); }}
              >
                ← Edit details
              </Typography>
            </Box>
          </>
        )}

        <AuthDivider style={{ marginTop: 24 }}>or</AuthDivider>
        <AuthFooter>
          Already have an account?{' '}
          <AuthLink to="/agent/login">Sign in</AuthLink>
        </AuthFooter>
      </AuthCard>
    </AuthPage>
  );
};

export default AgentSignup;
