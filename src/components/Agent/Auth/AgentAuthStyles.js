import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const t = {
  primary: '#0d5aa7', primaryDark: '#0a4a8c', primaryLight: '#e8f1fb',
  text: '#1e293b', textSec: '#64748b', textLight: '#94a3b8',
  bg: '#f1f5f9', bgWhite: '#ffffff', border: '#e2e8f0',
  success: '#10b981', danger: '#ef4444',
  shadow: '0 4px 24px rgba(13,90,167,0.12)',
};

export const AuthPage = styled(Box)({
  minHeight: '100vh', background: `linear-gradient(135deg, #0f1f3d 0%, #0d5aa7 100%)`,
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px',
});

export const AuthCard = styled(Box)({
  background: t.bgWhite, borderRadius: 20, padding: '48px 40px',
  width: '100%', maxWidth: 480, boxShadow: t.shadow,
  '@media (max-width: 480px)': { padding: '32px 24px', borderRadius: 16 },
});

export const AuthLogo = styled(Box)({
  textAlign: 'center', marginBottom: 32,
});

export const AuthLogoText = styled(Typography)({
  fontSize: 28, fontWeight: 800, color: t.primary, letterSpacing: '-0.5px',
  '& span': { color: '#ffcf51' },
});

export const AuthLogoSub = styled(Typography)({
  fontSize: 12, color: t.textSec, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 4,
});

export const AuthTitle = styled(Typography)({
  fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 6,
});

export const AuthSubtitle = styled(Typography)({
  fontSize: 14, color: t.textSec, marginBottom: 28, lineHeight: 1.6,
});

export const AuthForm = styled('form')({
  display: 'flex', flexDirection: 'column', gap: 18,
});

export const AuthRow = styled(Box)({
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
  '@media (max-width: 480px)': { gridTemplateColumns: '1fr' },
});

export const AuthField = styled(Box)({
  display: 'flex', flexDirection: 'column', gap: 6,
});

export const AuthLabel = styled('label')({
  fontSize: 13, fontWeight: 600, color: t.text,
});

export const AuthInput = styled('input')({
  padding: '12px 14px', border: `2px solid ${t.border}`, borderRadius: 10,
  fontSize: 14, outline: 'none', fontFamily: 'inherit', color: t.text,
  transition: 'border-color 0.2s ease',
  '&:focus': { borderColor: t.primary, boxShadow: '0 0 0 3px rgba(13,90,167,0.1)' },
  '&::placeholder': { color: t.textLight },
});

export const AuthSubmitBtn = styled('button')({
  padding: '14px', background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 100%)`,
  color: 'white', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600,
  cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: 'inherit', marginTop: 4,
  '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 20px rgba(13,90,167,0.3)' },
  '&:disabled': { opacity: 0.7, cursor: 'not-allowed', transform: 'none' },
});

export const AuthDivider = styled(Box)({
  textAlign: 'center', color: t.textSec, fontSize: 13, margin: '4px 0',
  '&::before, &::after': {
    content: '""', display: 'inline-block', width: '35%',
    height: 1, background: t.border, verticalAlign: 'middle', margin: '0 10px',
  },
});

export const AuthLink = styled(Link)({
  color: t.primary, fontWeight: 600, textDecoration: 'none', fontSize: 14,
  '&:hover': { textDecoration: 'underline' },
});

export const AuthFooter = styled(Box)({
  textAlign: 'center', marginTop: 20, fontSize: 14, color: t.textSec,
});

export const AuthAlert = styled(Box)(({ variant }) => ({
  padding: '12px 14px', borderRadius: 8, fontSize: 13, lineHeight: 1.5,
  display: 'flex', alignItems: 'flex-start', gap: 8,
  ...(variant === 'error'
    ? { background: 'rgba(239,68,68,0.08)', color: t.danger, border: `1px solid rgba(239,68,68,0.2)` }
    : { background: 'rgba(16,185,129,0.08)', color: t.success, border: `1px solid rgba(16,185,129,0.2)` }),
}));

export const AuthOptLabel = styled(Typography)({
  fontSize: 13, fontWeight: 600, color: t.text,
  display: 'flex', justifyContent: 'space-between',
  '& span': { color: t.textLight, fontWeight: 400 },
});
