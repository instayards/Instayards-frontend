import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const t = {
  primary: '#1f7a94',
  primaryHover: '#165f73',
  secondary: '#10b981',
  accent: '#f59e0b',
  text: '#1e293b',
  textSec: '#64748b',
  textLight: '#94a3b8',
  bg: '#f8fafc',
  bgWhite: '#ffffff',
  border: '#e2e8f0',
  shadowSm: '0 2px 4px rgba(0,0,0,0.05)',
  shadowMd: '0 4px 6px -1px rgba(0,0,0,0.1)',
  shadowLg: '0 10px 15px -3px rgba(0,0,0,0.1)',
};

export const SpContainer = styled(Box)({
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
});

export const SpHero = styled('section')({
  position: 'relative',
  padding: '100px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  overflow: 'hidden',
  '@media (max-width: 992px)': { padding: '80px 20px' },
  '@media (max-width: 576px)': { padding: '50px 16px' },
});

export const SpHeroOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5))',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 200,
    background: `linear-gradient(to top, rgba(31,122,148,0.9), transparent)`,
  },
});

export const SpHeroContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
  maxWidth: 800,
  textAlign: 'center',
  padding: 40,
  '@media (max-width: 992px)': { padding: 20 },
  '@media (max-width: 768px)': { padding: 10 },
});

export const SpHeroBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 24px',
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: 50,
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 30,
  border: '1px solid rgba(255,255,255,0.2)',
  '& svg': { fontSize: 16 },
  '@media (max-width: 768px)': { fontSize: 12, padding: '8px 16px' },
});

export const SpHeroTitle = styled(Typography)({
  fontSize: 48,
  fontWeight: 800,
  marginBottom: 20,
  lineHeight: 1.2,
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  '@media (max-width: 992px)': { fontSize: 32 },
  '@media (max-width: 576px)': { fontSize: 24 },
});

export const SpHeroSubtitle = styled(Typography)({
  fontSize: 20,
  opacity: 0.9,
  lineHeight: 1.6,
  maxWidth: 600,
  margin: '0 auto 40px',
  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
  '@media (max-width: 992px)': { fontSize: 16 },
  '@media (max-width: 576px)': { fontSize: 14 },
});

export const SpHeroStats = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 40,
  flexWrap: 'wrap',
  '@media (max-width: 992px)': { flexDirection: 'column', gap: 20 },
});

export const SpStatItem = styled(Box)({ textAlign: 'center' });

export const SpStatNumber = styled(Box)({
  fontSize: 48,
  fontWeight: 800,
  marginBottom: 8,
  lineHeight: 1,
  '@media (max-width: 576px)': { fontSize: 28 },
});

export const SpStatLabel = styled(Box)({
  fontSize: 14,
  opacity: 0.9,
  textTransform: 'uppercase',
  letterSpacing: 1,
  color: 'white',
});

export const SpStatDivider = styled(Box)({
  width: 1,
  height: 40,
  background: 'rgba(255,255,255,0.3)',
  '@media (max-width: 992px)': { width: '100%', height: 1 },
});

export const SpMain = styled(Box)({
  paddingTop: 80,
  background: t.bg,
  '@media (max-width: 768px)': { padding: '40px 0' },
});

export const SpInner = styled(Box)({
  width: '100%',
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 16px',
});

export const SpWrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 40,
  marginBottom: 80,
  '@media (max-width: 1200px)': { gridTemplateColumns: '1fr', gap: 30 },
  '@media (max-width: 768px)': { gap: 20 },
});

export const SpFormSection = styled(Box)({
  position: 'sticky',
  top: 40,
  '@media (max-width: 1200px)': { position: 'static' },
});

export const SpFormCard = styled(Box)({
  background: t.bgWhite,
  borderRadius: 20,
  padding: 40,
  border: `1px solid ${t.border}`,
  boxShadow: t.shadowLg,
  '@media (max-width: 768px)': { padding: '30px 20px', marginTop: 20 },
  '@media (max-width: 576px)': { padding: '24px 16px' },
});

export const SpFormHeader = styled(Box)({
  textAlign: 'center',
  marginBottom: 40,
});

export const SpFormBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '8px 20px',
  background: `linear-gradient(135deg, rgba(13,90,167,0.1), rgba(13,90,167,0.05))`,
  borderRadius: 50,
  fontSize: 14,
  fontWeight: 600,
  color: t.primary,
  marginBottom: 20,
});

export const SpFormTitle = styled(Typography)({
  fontSize: 32,
  fontWeight: 700,
  color: t.text,
  marginBottom: 12,
  '@media (max-width: 768px)': { fontSize: 28 },
  '@media (max-width: 576px)': { fontSize: 22 },
});

export const SpFormSubtitle = styled(Typography)({
  fontSize: 16,
  color: t.textSec,
  lineHeight: 1.6,
});

export const SpSimpleForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

export const SpFormGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  '& label': {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    fontWeight: 600,
    color: t.text,
    '& svg': { color: t.primary },
  },
  '& input': {
    padding: 16,
    border: `2px solid ${t.border}`,
    borderRadius: 10,
    fontSize: 16,
    transition: 'all 0.3s ease',
    outline: 'none',
    fontFamily: 'inherit',
    '&:focus': {
      borderColor: t.primary,
      boxShadow: '0 0 0 3px rgba(13,90,167,0.1)',
    },
    '@media (max-width: 768px)': { padding: 14, fontSize: 14 },
  },
});

export const SpInputHint = styled(Typography)({
  fontSize: 12,
  color: t.textLight,
  marginTop: 4,
});

export const SpFormAgreement = styled(Box)({
  display: 'flex',
  gap: 12,
  margin: '10px 0',
  '& input[type="checkbox"]': { marginTop: 4 },
  '& label': { fontSize: 14, color: t.textSec, lineHeight: 1.5, cursor: 'pointer' },
});

export const SpSubmitBtn = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  padding: 18,
  background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryHover} 100%)`,
  color: 'white',
  border: 'none',
  borderRadius: 12,
  fontSize: 18,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginTop: 10,
  fontFamily: 'inherit',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(13,90,167,0.3)',
    '& svg': { transform: 'translateX(4px)' },
  },
  '& svg': { transition: 'transform 0.3s ease' },
  '@media (max-width: 768px)': { fontSize: 16, padding: 14 },
});

export const SpFormAssurance = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: 16,
  background: 'rgba(16,185,129,0.1)',
  borderRadius: 10,
  fontSize: 14,
  color: t.textSec,
  marginTop: 20,
  '& svg': { color: t.secondary, flexShrink: 0 },
});

export const SpSuccessMessage = styled(Box)({
  textAlign: 'center',
  padding: '40px 20px',
});

export const SpSuccessIcon = styled(Box)({
  fontSize: 64,
  color: t.secondary,
  marginBottom: 24,
  display: 'flex',
  justifyContent: 'center',
  '& svg': { fontSize: 64 },
});

export const SpSuccessTitle = styled(Typography)({
  fontSize: 28,
  fontWeight: 700,
  color: t.text,
  marginBottom: 16,
});

export const SpSuccessText = styled(Typography)({
  fontSize: 16,
  color: t.textSec,
  marginBottom: 30,
  lineHeight: 1.6,
});

export const SpSuccessDetails = styled(Box)({
  background: t.bg,
  borderRadius: 12,
  padding: 24,
  textAlign: 'left',
  marginTop: 30,
  '& p': { fontWeight: 600, color: t.text, marginBottom: 12 },
  '& ul': { listStyle: 'none', padding: 0, margin: 0 },
  '& li': {
    padding: '8px 0 8px 24px',
    position: 'relative',
    color: t.textSec,
    '&::before': { content: '"✓"', position: 'absolute', left: 0, color: t.secondary, fontWeight: 'bold' },
  },
});

export const SpSupportInfo = styled(Box)({
  marginTop: 40,
  paddingTop: 30,
  borderTop: `1px solid ${t.border}`,
});

export const SpSupportItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 15,
  padding: 16,
  background: t.bg,
  borderRadius: 10,
  marginBottom: 12,
  '&:last-child': { marginBottom: 0 },
  '& svg': { color: t.primary, fontSize: 20, flexShrink: 0 },
  '& > div': { display: 'flex', flexDirection: 'column', gap: 4 },
  '& span': { fontSize: 12, color: t.textLight, textTransform: 'uppercase', letterSpacing: 0.5 },
  '& strong': { fontSize: 16, color: t.text, fontWeight: 600 },
});

export const SpBenefitsSection = styled(Box)({
  position: 'sticky',
  top: 40,
  '@media (max-width: 1200px)': { position: 'static' },
});

export const SpBenefitsCard = styled(Box)({
  background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryHover} 100%)`,
  borderRadius: 20,
  padding: 40,
  color: 'white',
  height: '100%',
  '@media (max-width: 768px)': { padding: 30, marginTop: 20 },
  '@media (max-width: 576px)': { padding: '30px 20px' },
});

export const SpBenefitsTitle = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  fontSize: 24,
  fontWeight: 700,
  marginBottom: 30,
  color: 'white',
  '@media (max-width: 576px)': { fontSize: 20 },
});

export const SpBenefitsGrid = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

export const SpBenefitItem = styled(Box)({
  display: 'flex',
  gap: 16,
  alignItems: 'flex-start',
  '@media (max-width: 576px)': { flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
});

export const SpBenefitIcon = styled(Box)({
  fontSize: 24,
  background: 'rgba(255,255,255,0.2)',
  width: 48,
  height: 48,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const SpBenefitContent = styled(Box)({
  '& h4': { fontSize: 18, fontWeight: 600, marginBottom: 6, color: 'white' },
  '& p': { fontSize: 14, opacity: 0.9, lineHeight: 1.5, margin: 0, color: 'white' },
});
