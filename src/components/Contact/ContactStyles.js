// src/components/Contact/ContactStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// ─── Tokens ──────────────────────────────────────────────────────────────────
const t = {
  primary:     '#0d5aa7',
  primaryDark: '#0a4a8c',
  primaryLight:'#1a6fc4',
  secondary:   '#10b981',
  accent:      '#f59e0b',
  text:        '#1e293b',
  textMuted:   '#64748b',
  textSubtle:  '#94a3b8',
  bg:          '#f8fafc',
  white:       '#ffffff',
  border:      '#e2e8f0',

  shadowSm: '0 2px 4px rgba(0,0,0,0.05)',
  shadowMd: '0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
  shadowLg: '0 10px 15px -3px rgba(0,0,0,0.1)',
  shadowGlow: '0 0 0 3px rgba(13,90,167,0.15)',

  rSm:   '10px',
  rMd:   '16px',
  rLg:   '20px',
  rXl:   '24px',
  rPill: '999px',
};

// ─── Root ────────────────────────────────────────────────────────────────────
export const ContactContainer = styled(Box)({
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  color: t.text,
  overflowX: 'hidden',
});

// ─── Hero ────────────────────────────────────────────────────────────────────
export const ContactHero = styled(Box)({
  position: 'relative',
  minHeight: '70vh',
  padding: '100px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  color: 'white',
  overflow: 'hidden',
  '@media (max-width: 768px)': {
    minHeight: '60vh',
    padding: '80px 20px',
    backgroundAttachment: 'scroll',
  },
  '@media (max-width: 480px)': {
    minHeight: '50vh',
    padding: '60px 20px',
  },
});

export const HeroOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.4))',
});

export const OverlayGradient = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 300,
  background: 'linear-gradient(to top, rgba(13,90,167,0.8), transparent)',
});

export const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
  maxWidth: 800,
  textAlign: 'center',
  padding: '0 20px',
  '@keyframes fadeInUp': {
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  animation: 'fadeInUp 0.8s ease-out',
});

export const HeroBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 24px',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: t.rPill,
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 28,
  border: '1px solid rgba(255,255,255,0.2)',
  color: 'white',
  '& svg': { fontSize: 16 },
});

export const HeroTitle = styled(Typography)({
  fontSize: 'clamp(28px, 5vw, 56px)',
  fontWeight: 800,
  marginBottom: 20,
  lineHeight: 1.2,
  letterSpacing: '-0.5px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  color: 'white',
});

export const HeroSubtitle = styled(Typography)({
  fontSize: 'clamp(16px, 2vw, 20px)',
  opacity: 0.9,
  lineHeight: 1.7,
  maxWidth: 600,
  margin: '0 auto 40px',
  color: '#cbd5e1',
});

export const HeroCta = styled(Box)({
  display: 'flex',
  gap: 16,
  justifyContent: 'center',
  flexWrap: 'wrap',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 12,
  },
});

export const ContactLink = styled('a')(({ variant }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  padding: '15px 28px',
  background: 'white',
  borderRadius: t.rMd,
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: 16,
  color: t.text,
  border: `2px solid ${t.border}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    borderColor: variant === 'phone' ? t.primary : t.secondary,
    color: variant === 'phone' ? t.primary : t.secondary,
  },
  '& svg': { fontSize: 18 },
  '@media (max-width: 768px)': {
    width: '100%',
    fontSize: 15,
    padding: '14px',
  },
  '@media (max-width: 480px)': {
    fontSize: 14,
    padding: '12px',
  },
}));

// ─── Main ────────────────────────────────────────────────────────────────────
export const ContactMain = styled(Box)({
  maxWidth: 1200,
  margin: '0 auto',
  padding: '60px 24px',
  '@media (max-width: 768px)': { padding: '40px 20px' },
});

export const ContactGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1.5fr',
  gap: 40,
  marginBottom: 60,
  '@media (max-width: 1200px)': { gridTemplateColumns: '1fr' },
});

// ─── Info Card ───────────────────────────────────────────────────────────────
export const ContactInfoSection = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 24,
});

export const InfoCard = styled(Box)({
  background: t.white,
  borderRadius: t.rLg,
  padding: 30,
  border: `1.5px solid ${t.border}`,
  boxShadow: t.shadowMd,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: t.shadowLg,
    borderColor: t.primary,
  },
  '@media (max-width: 768px)': { padding: 22 },
});

export const InfoIconWrapper = styled(Box)({
  width: 60,
  height: 60,
  background: 'linear-gradient(135deg, rgba(13,90,167,0.1), rgba(13,90,167,0.05))',
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
  fontSize: 28,
  color: t.primary,
});

export const InfoCardTitle = styled(Typography)({
  fontSize: 20,
  fontWeight: 700,
  color: t.text,
  marginBottom: 16,
});

export const InfoMain = styled(Typography)({
  fontSize: 17,
  fontWeight: 600,
  color: t.text,
  marginBottom: 6,
});

export const InfoSub = styled(Typography)({
  fontSize: 14,
  color: t.textMuted,
  lineHeight: 1.6,
});

export const InfoAction = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '12px 24px',
  background: t.primary,
  color: 'white',
  border: 'none',
  borderRadius: t.rSm,
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
  marginTop: 20,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: t.primaryDark,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(13,90,167,0.25)',
  },
});

// ─── Form Section ────────────────────────────────────────────────────────────
export const ContactFormSection = styled(Box)({
  background: t.white,
  borderRadius: t.rLg,
  padding: 40,
  border: `1.5px solid ${t.border}`,
  boxShadow: t.shadowLg,
  '@media (max-width: 768px)': { padding: 22 },
});

export const FormHeader = styled(Box)({ marginBottom: 36 });

export const FormTitle = styled(Typography)({
  fontSize: 'clamp(22px, 3vw, 30px)',
  fontWeight: 700,
  color: t.text,
  marginBottom: 10,
  letterSpacing: '-0.3px',
});

export const FormSubtitle = styled(Typography)({
  fontSize: 15,
  color: t.textMuted,
  lineHeight: 1.6,
});

export const ContactForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 22,
});

export const FormRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 18,
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const FormGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const FormLabel = styled('label')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 13,
  fontWeight: 600,
  color: t.text,
  '& svg': { color: t.primary, fontSize: 15 },
});

const inputBase = {
  padding: '13px 16px',
  border: `1.5px solid ${t.border}`,
  borderRadius: t.rSm,
  fontSize: 15,
  fontFamily: 'inherit',
  color: t.text,
  background: t.bg,
  outline: 'none',
  transition: 'all 0.2s ease',
  width: '100%',
  boxSizing: 'border-box',
  '&:focus': {
    borderColor: t.primary,
    background: t.white,
    boxShadow: '0 0 0 3px rgba(13,90,167,0.12)',
  },
  '&::placeholder': { color: t.textSubtle },
};

export const StyledInput = styled('input')(inputBase);

export const StyledTextarea = styled('textarea')({
  ...inputBase,
  resize: 'vertical',
  minHeight: 130,
});

export const SubmitBtn = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  padding: 18,
  background: `linear-gradient(135deg, ${t.primaryLight}, ${t.primary})`,
  color: 'white',
  border: 'none',
  borderRadius: t.rMd,
  fontSize: 17,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
  marginTop: 8,
  transition: 'all 0.25s ease',
  boxShadow: '0 6px 20px rgba(13,90,167,0.28)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 28px rgba(13,90,167,0.38)',
  },
  '&:hover svg': { transform: 'translateX(4px)' },
  '& svg': { transition: 'transform 0.25s ease' },
});

// ─── Success ─────────────────────────────────────────────────────────────────
export const SuccessMessage = styled(Box)({
  textAlign: 'center',
  padding: '60px 40px',
  background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.03))',
  borderRadius: t.rLg,
  border: `2px solid ${t.secondary}`,
});

export const SuccessIcon = styled(Box)({
  fontSize: 64,
  color: t.secondary,
  marginBottom: 20,
  display: 'flex',
  justifyContent: 'center',
  '& svg': { fontSize: 'inherit' },
});

export const SuccessTitle = styled(Typography)({
  fontSize: 26,
  fontWeight: 700,
  color: t.text,
  marginBottom: 12,
});

export const SuccessText = styled(Typography)({
  fontSize: 15,
  color: t.textMuted,
  maxWidth: 380,
  margin: '0 auto',
  lineHeight: 1.7,
});

// ─── WhatsApp ────────────────────────────────────────────────────────────────
export const WhatsappSection = styled(Box)({
  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
  borderRadius: t.rLg,
  padding: 40,
  marginBottom: 60,
  color: 'white',
  '@media (max-width: 768px)': { padding: 28 },
});

export const WhatsappContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 28,
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    textAlign: 'center',
  },
});

export const WhatsappIconBox = styled(Box)({
  fontSize: 52,
  flexShrink: 0,
  '& svg': { fontSize: 'inherit' },
});

export const WhatsappInfo = styled(Box)({ flex: 1 });

export const WhatsappTitle = styled(Typography)({
  fontSize: 22,
  fontWeight: 700,
  marginBottom: 6,
  color: 'white',
});

export const WhatsappSubtitle = styled(Typography)({
  opacity: 0.9,
  fontSize: 15,
  color: 'white',
});

export const WhatsappBtn = styled('a')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '15px 32px',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(8px)',
  color: 'white',
  border: '2px solid rgba(255,255,255,0.35)',
  borderRadius: t.rMd,
  fontSize: 15,
  fontWeight: 700,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  transition: 'all 0.25s ease',
  fontFamily: 'inherit',
  '&:hover': {
    background: 'rgba(255,255,255,0.25)',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  },
  '@media (max-width: 768px)': { width: '100%' },
});
