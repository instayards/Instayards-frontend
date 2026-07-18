// src/components/Footer/FooterStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// ─── Tokens ──────────────────────────────────────────────────────────────────
const t = {
  bg:          '#080d1a',
  bgCard:      'rgba(255,255,255,0.03)',
  accent:      '#3b82f6',
  accentHover: '#2563eb',
  accentGlow:  'rgba(59,130,246,0.15)',
  text:        '#cbd5e1',
  textLight:   '#94a3b8',
  textWhite:   '#ffffff',
  border:      'rgba(255,255,255,0.08)',
  borderHover: 'rgba(59,130,246,0.4)',
};

// ─── Root ────────────────────────────────────────────────────────────────────
export const FooterRoot = styled('footer')({
  background: `linear-gradient(160deg, ${t.bg} 0%, #0f172a 100%)`,
  color: t.text,
  position: 'relative',
  borderTop: `1px solid ${t.border}`,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
});

// subtle top glow line
export const FooterGlow = styled(Box)({
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '60%',
  height: 1,
  background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
  opacity: 0.6,
});

export const FooterContainer = styled(Box)({
  maxWidth: 1280,
  margin: '0 auto',
  padding: '4rem 2rem 2rem',
  '@media (max-width: 768px)': { padding: '3rem 1.5rem 1.5rem' },
});

export const FooterMain = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '340px 1fr',
  gap: '4rem',
  marginBottom: '3rem',
  '@media (max-width: 1024px)': { gridTemplateColumns: '1fr', gap: '3rem' },
});

// ─── Brand ───────────────────────────────────────────────────────────────────
export const BrandSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.75rem',
});

export const BrandRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  width: 'fit-content',
});

export const FooterLogo = styled('img')({
  width: 52,
  height: 64,
  objectFit: 'contain',
  transition: 'transform 0.3s ease',
  '&:hover': { transform: 'scale(1.06)' },
});

export const BrandText = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const BrandName = styled(Typography)({
  fontSize: '1.6rem',
  fontWeight: 800,
  color: t.textWhite,
  margin: 0,
  letterSpacing: '-0.5px',
  lineHeight: 1,
});

export const BrandTagline = styled('span')({
  fontSize: '0.78rem',
  color: t.accent,
  fontWeight: 600,
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  marginTop: 3,
});

export const FooterDescription = styled(Typography)({
  fontSize: '0.93rem',
  lineHeight: 1.75,
  color: t.textLight,
  maxWidth: 320,
});

// Newsletter
export const NewsletterBox = styled(Box)({
  background: t.bgCard,
  borderRadius: 14,
  padding: '1.4rem',
  border: `1px solid ${t.border}`,
  backdropFilter: 'blur(10px)',
});

export const NewsletterTitle = styled(Typography)({
  color: t.textWhite,
  fontSize: '0.95rem',
  fontWeight: 600,
  marginBottom: '0.75rem',
});

export const NewsletterInput = styled(Box)({
  display: 'flex',
  gap: '0.5rem',
  '& input': {
    flex: 1,
    padding: '0.7rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${t.border}`,
    borderRadius: 8,
    color: t.textWhite,
    fontSize: '0.88rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.25s ease',
    '&:focus': {
      borderColor: t.accent,
      boxShadow: `0 0 0 3px ${t.accentGlow}`,
    },
    '&::placeholder': { color: t.textLight },
  },
});

export const SubscribeBtn = styled('button')({
  padding: '0.7rem 1.1rem',
  background: t.accent,
  border: 'none',
  borderRadius: 8,
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  fontFamily: 'inherit',
  transition: 'all 0.25s ease',
  '&:hover': {
    background: t.accentHover,
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 16px ${t.accentGlow}`,
  },
});

// ─── Grid ────────────────────────────────────────────────────────────────────
export const FooterGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1.4fr',
  gap: '3rem',
  '@media (max-width: 1024px)': { gridTemplateColumns: '1fr 1fr' },
  '@media (max-width: 640px)': { gridTemplateColumns: '1fr', gap: '2.5rem' },
});

export const NavSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',
});

export const NavGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
});

export const FooterGroupTitle = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: t.textWhite,
  fontSize: '0.9rem',
  fontWeight: 700,
  margin: 0,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  '& span': { color: t.accent, fontSize: '1rem' },
});

export const NavLinks = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const FooterNavLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  color: t.textLight,
  textDecoration: 'none',
  fontSize: '0.93rem',
  padding: '0.4rem 0',
  transition: 'all 0.25s ease',
  position: 'relative',
  width: 'fit-content',
  '& svg': {
    fontSize: '0.8rem',
    transition: 'transform 0.25s ease',
    color: t.textLight,
  },
  '&:hover': {
    color: t.textWhite,
    paddingLeft: '0.35rem',
  },
  '&:hover svg': {
    transform: 'translateX(3px)',
    color: t.accent,
  },
});

// ─── Contact Section ──────────────────────────────────────────────────────────
export const ContactSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const ContactInfoList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const ContactItem = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.875rem',
  padding: '0.875rem',
  background: t.bgCard,
  borderRadius: 10,
  border: `1px solid transparent`,
  transition: 'all 0.25s ease',
  '&:hover': {
    borderColor: t.borderHover,
    background: 'rgba(59,130,246,0.04)',
    transform: 'translateY(-2px)',
  },
});

export const ContactIconBox = styled(Box)({
  width: 38,
  height: 38,
  background: 'rgba(59,130,246,0.1)',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  color: t.accent,
  fontSize: '1.1rem',
});

export const ContactDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

export const ContactLabel = styled('span')({
  fontSize: '0.73rem',
  color: t.textLight,
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
  fontWeight: 600,
});

export const ContactValue = styled(Typography)({
  color: t.textWhite,
  fontSize: '0.9rem',
  margin: 0,
  fontWeight: 500,
});

// ─── Social ──────────────────────────────────────────────────────────────────
export const SocialRow = styled(Box)({
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap',
});

export const SocialLink = styled('a')({
  position: 'relative',
  width: 44,
  height: 44,
  background: t.bgCard,
  border: `1px solid ${t.border}`,
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: t.text,
  textDecoration: 'none',
  transition: 'all 0.25s ease',
  overflow: 'visible',
  '& svg': {
    fontSize: '1.15rem',
    transition: 'transform 0.25s ease',
    position: 'relative',
    zIndex: 1,
  },
  '&:hover': {
    background: t.accent,
    borderColor: t.accent,
    color: 'white',
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 20px ${t.accentGlow}`,
  },
  '&:hover svg': { transform: 'scale(1.1)' },
  '&:hover .social-tooltip': { opacity: 1, bottom: -26 },
});

export const SocialTooltip = styled('span')({
  position: 'absolute',
  bottom: -32,
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '0.68rem',
  color: t.accent,
  fontWeight: 600,
  opacity: 0,
  transition: 'all 0.25s ease',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
});

// ─── Bottom Bar ───────────────────────────────────────────────────────────────
export const FooterBottom = styled(Box)({
  borderTop: `1px solid ${t.border}`,
  paddingTop: '1.75rem',
});

export const FooterBottomContent = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    textAlign: 'center',
  },
});

export const Copyright = styled(Typography)({
  color: t.textLight,
  fontSize: '0.88rem',
  margin: 0,
});

export const LegalLinks = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

export const LegalLink = styled(Link)({
  color: t.textLight,
  textDecoration: 'none',
  fontSize: '0.83rem',
  transition: 'color 0.25s ease',
  '&:hover': { color: t.accent },
});

export const LegalDivider = styled('span')({
  color: t.textLight,
  opacity: 0.35,
  fontSize: '0.8rem',
});

export const BackToTop = styled('button')({
  width: 42,
  height: 42,
  background: `linear-gradient(135deg, ${t.accent}, ${t.accentHover})`,
  border: 'none',
  borderRadius: 10,
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.15rem',
  fontFamily: 'inherit',
  transition: 'all 0.25s ease',
  boxShadow: `0 4px 14px ${t.accentGlow}`,
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 10px 24px rgba(59,130,246,0.35)`,
  },
  '& svg': { transition: 'transform 0.25s ease' },
  '&:hover svg': { transform: 'translateY(-2px)' },
});
