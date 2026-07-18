// src/components/Careers/CareersStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// ─── Tokens ─────────────────────────────────────────────────────────────────
const t = {
  primary:      '#0d5aa7',
  primaryDark:  '#0a4a8c',
  primaryLight: '#1a6fc4',
  secondary:    '#10b981',
  accent:       '#f59e0b',
  text:         '#0f172a',
  textMuted:    '#64748b',
  textSubtle:   '#94a3b8',
  bg:           '#f8fafc',
  white:        '#ffffff',
  border:       '#e2e8f0',

  rSm:   '10px',
  rMd:   '16px',
  rLg:   '24px',
  rXl:   '32px',
  rPill: '999px',

  shadowSm:  '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)',
  shadowMd:  '0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
  shadowLg:  '0 20px 48px rgba(13,90,167,0.12), 0 8px 16px rgba(0,0,0,0.06)',
  shadowGlow:'0 0 0 3px rgba(13,90,167,0.15)',
};

// ─── Root ────────────────────────────────────────────────────────────────────
export const CareersContainer = styled(Box)({
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  color: t.text,
  overflowX: 'hidden',
});

export const Container = styled(Box)({
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 24px',
});

// ─── Hero ────────────────────────────────────────────────────────────────────
export const CareersHero = styled(Box)({
  position: 'relative',
  minHeight: '80vh',
  padding: '120px 24px 100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  backgroundSize: 'cover',
  backgroundPosition: 'center 30%',
  color: 'white',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.25,
    pointerEvents: 'none',
    width: 500,
    height: 500,
    background: t.primaryLight,
    top: -100,
    right: -100,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.25,
    pointerEvents: 'none',
    width: 400,
    height: 400,
    background: t.secondary,
    bottom: -80,
    left: -80,
  },
  '@media (max-width: 768px)': {
    padding: '100px 20px 80px',
    minHeight: '70vh',
  },
});

export const HeroOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(135deg, rgba(6,24,56,0.88) 0%, rgba(13,90,167,0.75) 50%, rgba(6,24,56,0.82) 100%)',
});

export const OverlayGradient = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 220,
  background: 'linear-gradient(to top, rgba(248,250,252,0.08), transparent)',
});

export const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
  maxWidth: 820,
  textAlign: 'center',
  padding: '0 16px',
});

export const HeroBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 22px',
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: t.rPill,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  marginBottom: 28,
  border: '1px solid rgba(255,255,255,0.22)',
  color: 'white',
  '& svg': { fontSize: 15, color: t.accent },
});

export const HeroTitle = styled(Typography)({
  fontSize: 'clamp(36px, 6vw, 64px)',
  fontWeight: 800,
  marginBottom: 22,
  lineHeight: 1.15,
  letterSpacing: '-1px',
  background: 'linear-gradient(135deg, #ffffff 0%, #d1e9ff 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const HeroSubtitle = styled(Typography)({
  fontSize: 'clamp(16px, 2vw, 20px)',
  opacity: 0.88,
  lineHeight: 1.7,
  maxWidth: 580,
  margin: '0 auto 52px',
  color: '#cbd5e1',
});

export const HeroCtaRow = styled(Box)({
  display: 'flex',
  gap: 16,
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: 64,
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export const HeroBtnPrimary = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '16px 34px',
  background: `linear-gradient(135deg, ${t.primaryLight}, ${t.primary})`,
  color: 'white',
  border: 'none',
  borderRadius: t.rPill,
  fontSize: 15,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
  boxShadow: '0 8px 24px rgba(13,90,167,0.45)',
  transition: 'all 0.25s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 14px 32px rgba(13,90,167,0.55)',
  },
});

export const HeroBtnSecondary = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '16px 34px',
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  border: '1.5px solid rgba(255,255,255,0.28)',
  borderRadius: t.rPill,
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 0.25s ease',
  '&:hover': {
    background: 'rgba(255,255,255,0.18)',
    transform: 'translateY(-3px)',
  },
});

export const HeroStats = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: t.rLg,
  padding: '28px 40px',
  maxWidth: 560,
  margin: '0 auto',
  '@media (max-width: 576px)': {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    padding: 24,
  },
});

export const StatItem = styled(Box)({
  flex: 1,
  textAlign: 'center',
  padding: '0 24px',
  minWidth: 120,
  '@media (max-width: 576px)': { padding: 0 },
});

export const StatNumber = styled(Typography)({
  fontSize: 42,
  fontWeight: 800,
  lineHeight: 1,
  color: 'white',
  letterSpacing: '-1px',
  marginBottom: 6,
  '@media (max-width: 576px)': { fontSize: 32 },
});

export const StatLabel = styled(Typography)({
  fontSize: 12,
  opacity: 0.8,
  textTransform: 'uppercase',
  letterSpacing: '1.2px',
  color: '#94c4f5',
  fontWeight: 500,
});

export const StatDivider = styled(Box)({
  width: 1,
  height: 44,
  background: 'rgba(255,255,255,0.2)',
  flexShrink: 0,
  '@media (max-width: 576px)': { width: 60, height: 1 },
});

// ─── Section Shared ──────────────────────────────────────────────────────────
export const SectionHeader = styled(Box)({
  textAlign: 'center',
  marginBottom: 64,
  '@media (max-width: 576px)': { marginBottom: 44 },
});

export const SectionEyebrow = styled(Box)(({ light }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '7px 18px',
  background: light ? 'rgba(255,255,255,0.12)' : 'rgba(13,90,167,0.08)',
  color: light ? '#93c5fd' : t.primary,
  borderRadius: t.rPill,
  fontSize: 12,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: 20,
  border: light ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(13,90,167,0.15)',
  '& svg': { fontSize: 14 },
}));

export const SectionTitle = styled(Typography)(({ light }) => ({
  fontSize: 'clamp(28px, 4vw, 44px)',
  fontWeight: 800,
  color: light ? 'white' : t.text,
  marginBottom: 16,
  letterSpacing: '-0.5px',
  lineHeight: 1.2,
}));

export const SectionSubtitle = styled(Typography)(({ light }) => ({
  fontSize: 17,
  color: light ? 'rgba(255,255,255,0.75)' : t.textMuted,
  maxWidth: 560,
  margin: '0 auto',
  lineHeight: 1.7,
}));

// ─── Culture ─────────────────────────────────────────────────────────────────
export const CultureSection = styled(Box)({
  padding: '100px 0',
  background: t.white,
});

export const CultureGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: 24,
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const CultureCard = styled(Box)({
  textAlign: 'center',
  padding: '44px 32px',
  background: t.bg,
  borderRadius: t.rLg,
  border: `1.5px solid ${t.border}`,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(13,90,167,0.04), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: t.shadowLg,
    borderColor: t.primary,
    background: t.white,
  },
  '&:hover::before': { opacity: 1 },
  '&:hover .culture-icon-inner': {
    background: `linear-gradient(135deg, ${t.primary}, ${t.primaryLight})`,
    color: 'white',
    borderColor: 'transparent',
    boxShadow: '0 8px 24px rgba(13,90,167,0.3)',
  },
});

export const CultureIconBox = styled(Box)({
  width: 72,
  height: 72,
  margin: '0 auto 28px',
  background: 'linear-gradient(135deg, rgba(13,90,167,0.12), rgba(13,90,167,0.05))',
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 28,
  color: t.primary,
  transition: 'all 0.3s ease',
  border: '1.5px solid rgba(13,90,167,0.1)',
});

export const CultureCardTitle = styled(Typography)({
  fontSize: 19,
  fontWeight: 700,
  color: t.text,
  marginBottom: 14,
});

export const CultureCardText = styled(Typography)({
  fontSize: 14,
  color: t.textMuted,
  lineHeight: 1.7,
});

// ─── Benefits ────────────────────────────────────────────────────────────────
export const BenefitsSection = styled(Box)({
  padding: '100px 0',
  background: 'linear-gradient(135deg, #0d5aa7 0%, #0a3d7c 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -200,
    right: -200,
    width: 600,
    height: 600,
    background: 'rgba(255,255,255,0.04)',
    borderRadius: '50%',
  },
});

export const BenefitsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 24,
  position: 'relative',
  zIndex: 1,
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const BenefitCard = styled(Box)({
  padding: '36px 30px',
  background: 'rgba(255,255,255,0.07)',
  backdropFilter: 'blur(10px)',
  borderRadius: t.rLg,
  border: '1px solid rgba(255,255,255,0.12)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255,255,255,0.12)',
    transform: 'translateY(-6px)',
    borderColor: 'rgba(255,255,255,0.22)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
  },
});

export const BenefitIconSpan = styled('span')({
  fontSize: 44,
  marginBottom: 22,
  display: 'block',
});

export const BenefitTitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  color: 'white',
  marginBottom: 12,
});

export const BenefitDescription = styled(Typography)({
  fontSize: 14,
  color: 'rgba(255,255,255,0.72)',
  lineHeight: 1.7,
});

// ─── Application ─────────────────────────────────────────────────────────────
export const ApplicationSection = styled(Box)({
  padding: '100px 0',
  background: t.bg,
});

export const ApplicationWrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '420px 1fr',
  background: t.white,
  borderRadius: t.rXl,
  overflow: 'hidden',
  boxShadow: t.shadowLg,
  border: `1.5px solid ${t.border}`,
  '@media (max-width: 1100px)': { gridTemplateColumns: '1fr' },
});

export const ApplicationInfo = styled(Box)({
  padding: '56px 44px',
  background: 'linear-gradient(160deg, #0d5aa7 0%, #06245a 100%)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -80,
    right: -80,
    width: 280,
    height: 280,
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '50%',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 200,
    height: 200,
    background: 'rgba(16,185,129,0.12)',
    borderRadius: '50%',
  },
  '@media (max-width: 768px)': { padding: '40px 28px' },
});

export const InfoBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 18px',
  background: 'rgba(255,255,255,0.14)',
  borderRadius: t.rPill,
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 28,
  border: '1px solid rgba(255,255,255,0.2)',
  position: 'relative',
  zIndex: 1,
  color: 'white',
});

export const InfoTitle = styled(Typography)({
  fontSize: 30,
  fontWeight: 800,
  marginBottom: 16,
  lineHeight: 1.3,
  letterSpacing: '-0.5px',
  position: 'relative',
  zIndex: 1,
  color: 'white',
});

export const InfoSubtitle = styled(Typography)({
  fontSize: 15,
  opacity: 0.85,
  lineHeight: 1.7,
  marginBottom: 36,
  position: 'relative',
  zIndex: 1,
  color: 'white',
});

export const TipsBox = styled(Box)({
  background: 'rgba(255,255,255,0.08)',
  borderRadius: t.rMd,
  padding: 24,
  marginBottom: 28,
  position: 'relative',
  zIndex: 1,
  border: '1px solid rgba(255,255,255,0.1)',
});

export const TipsTitle = styled(Typography)({
  fontSize: 12,
  fontWeight: 700,
  marginBottom: 16,
  color: '#93c5fd',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

export const TipItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '9px 0',
  fontSize: 14,
  color: 'white',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  '&:last-child': { borderBottom: 'none', paddingBottom: 0 },
  '& svg': { color: t.secondary, flexShrink: 0, fontSize: 16 },
});

export const ContactBox = styled(Box)({
  background: 'rgba(255,255,255,0.08)',
  borderRadius: t.rMd,
  padding: 24,
  position: 'relative',
  zIndex: 1,
  border: '1px solid rgba(255,255,255,0.1)',
});

export const ContactTitle = styled(Typography)({
  fontSize: 12,
  fontWeight: 700,
  marginBottom: 14,
  color: '#93c5fd',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

export const ContactText = styled(Typography)({
  fontSize: 13,
  opacity: 0.88,
  marginBottom: 6,
  lineHeight: 1.6,
  color: 'white',
  '& strong': { color: 'white', fontWeight: 600 },
});

// ─── Form ─────────────────────────────────────────────────────────────────────
export const ApplicationFormBox = styled(Box)({
  padding: '56px 48px',
  '@media (max-width: 768px)': { padding: '40px 28px' },
});

export const FormTitle = styled(Typography)({
  fontSize: 22,
  fontWeight: 800,
  color: t.text,
  marginBottom: 8,
  letterSpacing: '-0.3px',
});

export const FormDesc = styled(Typography)({
  fontSize: 14,
  color: t.textMuted,
  marginBottom: 36,
  lineHeight: 1.6,
});

export const FormDivider = styled(Box)({
  height: 1,
  background: t.border,
  marginBottom: 32,
});

export const FormGroup = styled(Box)({ marginBottom: 22 });

export const FormLabel = styled('label')({
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: t.text,
  marginBottom: 8,
  letterSpacing: '0.2px',
});

const inputBase = {
  width: '100%',
  padding: '13px 16px',
  border: `1.5px solid ${t.border}`,
  borderRadius: t.rSm,
  fontSize: 15,
  fontFamily: 'inherit',
  color: t.text,
  background: t.bg,
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
  outline: 'none',
  '&:focus': {
    borderColor: t.primary,
    background: t.white,
    boxShadow: '0 0 0 3px rgba(13,90,167,0.15)',
  },
  '&::placeholder': { color: t.textSubtle },
};

export const StyledInput = styled('input')(inputBase);

export const StyledSelect = styled('select')({
  ...inputBase,
  appearance: 'none',
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
  paddingRight: 40,
  backgroundColor: t.bg,
  cursor: 'pointer',
});

export const StyledTextarea = styled('textarea')({
  ...inputBase,
  resize: 'vertical',
  minHeight: 110,
});

export const FormRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 18,
  '@media (max-width: 992px)': { gridTemplateColumns: '1fr' },
});

export const FileUploadBox = styled(Box)({
  position: 'relative',
  '& input[type="file"]': {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
    zIndex: 2,
  },
});

export const FileLabel = styled('label')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  padding: 18,
  background: t.bg,
  border: `2px dashed ${t.border}`,
  borderRadius: t.rSm,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: 14,
  color: t.textMuted,
  fontWeight: 500,
  '&::before': { content: '"📎"', fontSize: 18 },
  '&:hover': {
    borderColor: t.primary,
    background: 'rgba(13,90,167,0.04)',
    color: t.primary,
  },
});

export const FileHint = styled(Typography)({
  fontSize: 12,
  color: t.textSubtle,
  marginTop: 7,
});

export const FormCheckboxRow = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  margin: '24px 0',
  '& input[type="checkbox"]': {
    width: 18,
    height: 18,
    marginTop: 2,
    accentColor: t.primary,
    flexShrink: 0,
    cursor: 'pointer',
  },
  '& label': {
    fontSize: 13,
    color: t.textMuted,
    lineHeight: 1.6,
    cursor: 'pointer',
  },
});

export const SubmitButton = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  width: '100%',
  padding: 17,
  background: `linear-gradient(135deg, ${t.primaryLight}, ${t.primary})`,
  color: 'white',
  border: 'none',
  borderRadius: t.rMd,
  fontSize: 16,
  fontWeight: 700,
  fontFamily: 'inherit',
  cursor: 'pointer',
  letterSpacing: '0.3px',
  boxShadow: '0 6px 20px rgba(13,90,167,0.3)',
  transition: 'all 0.25s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 32px rgba(13,90,167,0.45)',
  },
  '&:active': { transform: 'translateY(0)' },
});
