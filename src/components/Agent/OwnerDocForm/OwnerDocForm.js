import { useState, useRef } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiUploadCloud, FiSend, FiShield } from 'react-icons/fi';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { useAgent } from '../../../context/AgentContext';
import { sendAadharOtp, verifyAadharOtp, submitOwnerDoc } from '../../../services/agentApi';

const t = {
  primary: '#0d5aa7', text: '#1e293b', textSec: '#64748b', textLight: '#94a3b8',
  bg: '#f1f5f9', bgWhite: '#ffffff', border: '#e2e8f0',
  success: '#10b981', danger: '#ef4444', shadow: '0 4px 24px rgba(0,0,0,0.18)',
};

const Overlay = styled(Box)({
  position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 1200, padding: 16, overflowY: 'auto',
});

const Modal = styled(Box)({
  background: t.bgWhite, borderRadius: 16, width: '100%', maxWidth: 600,
  boxShadow: t.shadow, maxHeight: '90vh', overflowY: 'auto', padding: '32px 28px',
  position: 'relative',
});

const CloseBtn = styled('button')({
  position: 'absolute', top: 16, right: 16, width: 32, height: 32, border: 'none',
  background: t.bg, borderRadius: '50%', cursor: 'pointer', display: 'flex',
  alignItems: 'center', justifyContent: 'center', color: t.textSec, fontSize: 16,
});

const Title = styled(Typography)({ fontSize: 20, fontWeight: 700, color: t.text, marginBottom: 4 });
const Subtitle = styled(Typography)({ fontSize: 13, color: t.textSec, marginBottom: 24 });

const Section = styled(Box)({ borderTop: `1px solid ${t.border}`, paddingTop: 20, marginTop: 20 });
const SectionTitle = styled(Typography)({
  fontSize: 13, fontWeight: 700, color: t.textSec, textTransform: 'uppercase',
  letterSpacing: 0.5, marginBottom: 14,
});

const Field = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 });
const Label = styled('label')({ fontSize: 13, fontWeight: 600, color: t.text });
const OptLabel = styled(Typography)({
  fontSize: 13, fontWeight: 600, color: t.text, display: 'flex', gap: 6,
  '& span': { color: t.textLight, fontWeight: 400 },
});

const Input = styled('input')({
  padding: '10px 12px', border: `1.5px solid ${t.border}`, borderRadius: 8,
  fontSize: 14, outline: 'none', fontFamily: 'inherit', color: t.text,
  '&:focus': { borderColor: t.primary, boxShadow: '0 0 0 3px rgba(13,90,167,0.08)' },
  '&::placeholder': { color: t.textLight },
  '&:disabled': { background: t.bg, color: t.textSec, cursor: 'not-allowed' },
});

const Select = styled('select')({
  padding: '10px 12px', border: `1.5px solid ${t.border}`, borderRadius: 8,
  fontSize: 14, outline: 'none', fontFamily: 'inherit', color: t.text,
  background: t.bgWhite, cursor: 'pointer', '&:focus': { borderColor: t.primary },
});

const Row = styled(Box)({ display: 'flex', gap: 10, alignItems: 'flex-end' });

const ActionBtn = styled('button')(({ variant }) => ({
  padding: '10px 16px', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', display: 'flex',
  alignItems: 'center', gap: 6,
  ...(variant === 'success'
    ? { background: 'rgba(16,185,129,0.1)', color: t.success, cursor: 'default' }
    : { background: t.primary, color: 'white', '&:hover': { background: '#0a4a8c' } }),
  '&:disabled': { opacity: 0.65, cursor: 'not-allowed' },
}));

const MaskedPhoneNote = styled(Box)({
  marginTop: 8, padding: '8px 12px', background: 'rgba(13,90,167,0.06)',
  border: `1px solid rgba(13,90,167,0.15)`, borderRadius: 8,
  display: 'flex', alignItems: 'center', gap: 8,
  fontSize: 13, color: t.primary,
});

const VerifyRow = styled(Box)({ display: 'flex', gap: 10, alignItems: 'flex-end', marginTop: 12 });

const DropZone = styled('label')({
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
  padding: '20px', border: `2px dashed ${t.border}`, borderRadius: 10,
  cursor: 'pointer', background: t.bg,
  '&:hover': { borderColor: t.primary, background: 'rgba(13,90,167,0.04)' },
});

const Alert = styled(Box)(({ variant }) => ({
  padding: '10px 14px', borderRadius: 8, fontSize: 13, display: 'flex', gap: 8,
  alignItems: 'flex-start', marginBottom: 16,
  ...(variant === 'success'
    ? { background: 'rgba(16,185,129,0.08)', color: t.success, border: '1px solid rgba(16,185,129,0.2)' }
    : { background: 'rgba(239,68,68,0.08)', color: t.danger, border: '1px solid rgba(239,68,68,0.2)' }),
}));

const SubmitBtn = styled('button')({
  width: '100%', padding: '13px', background: t.primary, color: 'white', border: 'none',
  borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
  marginTop: 8, '&:hover': { background: '#0a4a8c' }, '&:disabled': { opacity: 0.7, cursor: 'not-allowed' },
});

const SkipBtn = styled('button')({
  width: '100%', padding: '11px', background: 'none', border: `1.5px solid ${t.border}`,
  borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
  color: t.textSec, marginTop: 8, '&:hover': { borderColor: t.text, color: t.text },
});

const LETTER_TYPES = [
  { value: 'allotment_letter', label: 'Allotment Letter' },
  { value: 'conveyance_deed',  label: 'Conveyance Deed' },
  { value: 'sale_deed',        label: 'Sale Deed' },
];

const OwnerDocForm = ({ residentialId, propertyLabel, onClose, onSubmitted }) => {
  const { token } = useAgent();

  const [form, setForm] = useState({
    owner_name: '', owner_aadhar_number: '',
    owner_pan_number: '', owner_email: '', owner_address: '', letter_type: '',
  });
  const [letterFile, setLetterFile] = useState(null);

  // Aadhaar OTP state — txnId comes from backend after OTP is dispatched
  const [txnId, setTxnId]               = useState(null);
  const [maskedPhone, setMaskedPhone]   = useState(null);
  const [otpInput, setOtpInput]         = useState('');
  const [aadharVerified, setAadharVerified] = useState(false);

  const [sendingOtp, setSendingOtp]     = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [alert, setAlert]               = useState(null);

  const fileInputRef = useRef();
  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSendOtp = async () => {
    if (form.owner_aadhar_number.length !== 12) {
      return setAlert({ type: 'error', msg: 'Enter a valid 12-digit Aadhaar number first' });
    }
    setAlert(null);
    setSendingOtp(true);
    try {
      const res = await sendAadharOtp(residentialId, form.owner_aadhar_number, token);
      const { txnId: tid, maskedPhone: mp } = res.data.data;
      setTxnId(tid);
      setMaskedPhone(mp);
      setAlert({ type: 'success', msg: 'OTP sent to the mobile number registered with your Aadhaar' });
    } catch (err) {
      setAlert({ type: 'error', msg: err.response?.data?.message || 'Failed to send OTP' });
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpInput || otpInput.length !== 6) {
      return setAlert({ type: 'error', msg: 'Enter the 6-digit OTP' });
    }
    setAlert(null);
    setVerifyingOtp(true);
    try {
      await verifyAadharOtp(residentialId, form.owner_aadhar_number, txnId, otpInput, token);
      setAadharVerified(true);
      setAlert({ type: 'success', msg: 'Aadhaar verified successfully' });
    } catch (err) {
      setAlert({ type: 'error', msg: err.response?.data?.message || 'Invalid OTP. Please try again.' });
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.owner_name.trim())           return setAlert({ type: 'error', msg: 'Owner name is required' });
    if (form.owner_aadhar_number.length !== 12) return setAlert({ type: 'error', msg: 'Aadhaar number is required' });
    if (!aadharVerified)                   return setAlert({ type: 'error', msg: 'Aadhaar OTP verification is required before submitting' });
    if (!form.owner_email.trim())          return setAlert({ type: 'error', msg: 'Owner email is required' });

    setAlert(null);
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (letterFile) fd.append('document', letterFile);
      await submitOwnerDoc(residentialId, fd, token);
      onSubmitted && onSubmitted();
    } catch (err) {
      setAlert({ type: 'error', msg: err.response?.data?.message || 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Overlay>
      <Modal>
        <CloseBtn onClick={onClose}><FiX /></CloseBtn>

        <Title>Owner Information</Title>
        <Subtitle>
          Property listed: <strong>{propertyLabel}</strong>. Submit owner details to start the verification process.
        </Subtitle>

        {alert && (
          <Alert variant={alert.type}>
            {alert.type === 'success'
              ? <FiCheckCircle style={{ marginTop: 2, flexShrink: 0 }} />
              : <FiAlertCircle style={{ marginTop: 2, flexShrink: 0 }} />}
            {alert.msg}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>

          {/* ── Owner Identity ─────────────────────────── */}
          <Section style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
            <SectionTitle>Owner Identity</SectionTitle>

            <Field>
              <Label>Owner Full Name *</Label>
              <Input
                value={form.owner_name}
                onChange={e => set('owner_name', e.target.value)}
                placeholder="As on Aadhaar / PAN card"
              />
            </Field>

            <Field>
              <Label>Owner Email *</Label>
              <Input
                type="email"
                value={form.owner_email}
                onChange={e => set('owner_email', e.target.value)}
                placeholder="owner@example.com"
              />
            </Field>

            <Field>
              <OptLabel>Owner PAN Card Number <span>(Opt)</span></OptLabel>
              <Input
                value={form.owner_pan_number}
                onChange={e => set('owner_pan_number', e.target.value.toUpperCase())}
                placeholder="e.g. ABCDE1234F"
                maxLength={10}
              />
            </Field>
          </Section>

          {/* ── Aadhaar Verification ───────────────────── */}
          <Section>
            <SectionTitle>Aadhaar Verification</SectionTitle>

            <Field style={{ marginBottom: 0 }}>
              <Label>Aadhaar Card Number *</Label>
              <Row>
                <Input
                  style={{ flex: 1 }}
                  value={form.owner_aadhar_number}
                  onChange={e => set('owner_aadhar_number', e.target.value.replace(/\D/g, '').slice(0, 12))}
                  placeholder="12-digit Aadhaar number"
                  maxLength={12}
                  disabled={aadharVerified}
                />
                <ActionBtn
                  type="button"
                  variant={aadharVerified ? 'success' : 'primary'}
                  disabled={sendingOtp || aadharVerified}
                  onClick={handleSendOtp}
                >
                  {aadharVerified
                    ? <><FiCheckCircle />Verified</>
                    : sendingOtp
                      ? 'Sending...'
                      : <><FiSend />Send OTP</>}
                </ActionBtn>
              </Row>

              {/* Show masked phone after OTP is sent */}
              {maskedPhone && !aadharVerified && (
                <MaskedPhoneNote>
                  <FiShield style={{ flexShrink: 0 }} />
                  OTP sent to Aadhaar-linked mobile: <strong>{maskedPhone}</strong>
                </MaskedPhoneNote>
              )}
            </Field>

            {/* OTP input — shown once OTP is dispatched */}
            {txnId && !aadharVerified && (
              <VerifyRow>
                <Input
                  style={{ flex: 1 }}
                  type="text"
                  inputMode="numeric"
                  value={otpInput}
                  onChange={e => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
                <ActionBtn type="button" disabled={verifyingOtp} onClick={handleVerifyOtp}>
                  {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </ActionBtn>
              </VerifyRow>
            )}
          </Section>

          {/* ── Property Address ───────────────────────── */}
          <Section>
            <SectionTitle>Property Address</SectionTitle>
            <Field>
              <Label>Owner Property Address *</Label>
              <Input
                value={form.owner_address}
                onChange={e => set('owner_address', e.target.value)}
                placeholder="Full address as per ownership document"
              />
            </Field>
          </Section>

          {/* ── Ownership Document ─────────────────────── */}
          <Section>
            <SectionTitle>Ownership Document</SectionTitle>

            <Field>
              <Label>Document Type</Label>
              <Select value={form.letter_type} onChange={e => set('letter_type', e.target.value)}>
                <option value="">— Select document type —</option>
                {LETTER_TYPES.map(lt => <option key={lt.value} value={lt.value}>{lt.label}</option>)}
              </Select>
            </Field>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              style={{ display: 'none' }}
              onChange={e => setLetterFile(e.target.files[0] || null)}
            />
            <DropZone onClick={() => fileInputRef.current?.click()}>
              <FiUploadCloud style={{ fontSize: 26, color: t.textSec }} />
              <Typography sx={{ fontSize: 13, color: t.textSec }}>
                {letterFile ? letterFile.name : 'Click to upload document (PDF / Image)'}
              </Typography>
            </DropZone>
          </Section>

          <Box sx={{ mt: 3 }}>
            <SubmitBtn type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Owner Documents'}
            </SubmitBtn>
            <SkipBtn type="button" onClick={onClose}>
              Skip for now — I'll submit documents later
            </SkipBtn>
          </Box>
        </form>
      </Modal>
    </Overlay>
  );
};

export default OwnerDocForm;
