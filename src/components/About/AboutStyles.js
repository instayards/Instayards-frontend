// src/components/About/AboutStyles.js
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
  shadowLg: '0 20px 48px rgba(13,90,167,0.12), 0 8px 16px rgba(0,0,0,0.06)',
  shadowXl: '0 20px 25px -5px rgba(0,0,0,0.1)',

  rSm:   '10px',
  rMd:   '16px',
  rLg:   '24px',
  rXl:   '32px',
  rPill: '999px',
};

// ─── Root ────────────────────────────────────────────────────────────────────
export const AboutPage = styled(Box)({
  width: '100%',
  overflowX: 'hidden',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
});

export const Container = styled(Box)({
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 24px',
});

// ─── Hero ────────────────────────────────────────────────────────────────────
export const AboutHero = styled(Box)({
  position: 'relative',
  minHeight: '80vh',
  background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)),
               url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  padding: '100px 24px',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(45deg, rgba(13,90,167,0.3), rgba(16,185,129,0.15))',
    pointerEvents: 'none',
  },
  '@media (max-width: 480px)': {
    minHeight: '60vh',
    padding: '60px 20px',
    backgroundAttachment: 'scroll',
  },
});

export const HeroContent = styled(Box)({
  position: 'relative',
  zIndex: 2,
  maxWidth: 800,
  margin: '0 auto',
  textAlign: 'center',
});

export const HeroBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 20px',
  background: 'rgba(255,255,255,0.14)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  borderRadius: t.rPill,
  fontSize: 14,
  fontWeight: 600,
  marginBottom: 28,
  border: '1px solid rgba(255,255,255,0.2)',
  color: 'white',
});

export const BadgeDot = styled(Box)({
  width: 8,
  height: 8,
  background: t.secondary,
  borderRadius: '50%',
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.4 },
  },
  animation: 'pulse 2s infinite',
});

export const HeroTitle = styled(Typography)({
  fontSize: 'clamp(28px, 5vw, 56px)',
  fontWeight: 800,
  lineHeight: 1.2,
  marginBottom: 24,
  letterSpacing: '-0.5px',
  color: 'white',
});

export const HeroSubtitle = styled(Typography)({
  fontSize: 'clamp(16px, 2vw, 20px)',
  opacity: 0.9,
  lineHeight: 1.7,
  marginBottom: 50,
  maxWidth: 600,
  marginLeft: 'auto',
  marginRight: 'auto',
  color: '#cbd5e1',
});

export const HeroStatsRow = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: 24,
  flexWrap: 'wrap',
  '@media (max-width: 768px)': { gap: 16 },
});

export const StatCard = styled(Box)({
  textAlign: 'center',
  padding: '20px 28px',
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: t.rLg,
  border: '1px solid rgba(255,255,255,0.18)',
  transition: 'all 0.3s ease',
  minWidth: 130,
  '&:hover': {
    transform: 'translateY(-5px)',
    background: 'rgba(255,255,255,0.18)',
  },
  '@media (max-width: 768px)': { padding: '15px 20px' },
});

export const StatNumberAbout = styled(Typography)({
  fontSize: 36,
  fontWeight: 800,
  marginBottom: 6,
  color: 'white',
  lineHeight: 1,
  '@media (max-width: 768px)': { fontSize: 28 },
});

export const StatLabelAbout = styled(Typography)({
  fontSize: 13,
  opacity: 0.88,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: '#93c5fd',
  fontWeight: 500,
});

// ─── Section Shared ──────────────────────────────────────────────────────────
export const SectionHeader = styled(Box)({
  textAlign: 'center',
  marginBottom: 60,
});

export const SectionTitle = styled(Typography)({
  fontSize: 'clamp(28px, 4vw, 42px)',
  fontWeight: 800,
  color: t.text,
  marginBottom: 12,
  lineHeight: 1.2,
  letterSpacing: '-0.5px',
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 64,
    height: 4,
    background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
    borderRadius: 2,
  },
});

// ─── Company Overview ─────────────────────────────────────────────────────────
export const CompanyOverview = styled(Box)({
  padding: '100px 0',
  background: t.white,
  '@media (max-width: 768px)': { padding: '60px 0' },
});

export const OverviewGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 60,
  alignItems: 'center',
  '@media (max-width: 992px)': {
    gridTemplateColumns: '1fr',
    gap: 40,
  },
});

export const OverviewImageBox = styled(Box)({
  position: 'relative',
  borderRadius: t.rXl,
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  '&:hover img': { transform: 'scale(1.03)' },
});

export const CompanyPhoto = styled('img')({
  width: '100%',
  height: 500,
  objectFit: 'cover',
  borderRadius: t.rXl,
  display: 'block',
  transition: 'transform 0.5s ease',
  '@media (max-width: 992px)': { height: 400 },
  '@media (max-width: 480px)': { height: 300 },
});

export const ImageBadge = styled(Box)({
  position: 'absolute',
  bottom: 28,
  left: 28,
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '12px 22px',
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: t.rMd,
  fontWeight: 700,
  fontSize: 14,
  color: t.primary,
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  '& svg': { fontSize: 18, color: t.accent },
  '@media (max-width: 480px)': {
    bottom: 18,
    left: 18,
    padding: '10px 16px',
    fontSize: 13,
  },
});

export const OverviewContent = styled(Box)({
  '@media (max-width: 992px)': { paddingLeft: 0 },
});

export const DescriptionCard = styled(Box)({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  borderRadius: t.rLg,
  border: `1px solid ${t.border}`,
  boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
  padding: 40,
  position: 'relative',
  overflow: 'hidden',
  marginTop: 24,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    background: `linear-gradient(to bottom, ${t.primary}, ${t.secondary})`,
    borderRadius: '4px 0 0 4px',
  },
  '@media (max-width: 768px)': { padding: '28px 24px' },
  '@media (max-width: 480px)': { padding: '22px 18px' },
});

export const CompanyDescription = styled(Typography)({
  fontSize: 17,
  lineHeight: 1.8,
  color: '#334155',
  fontWeight: 400,
  margin: 0,
  '& strong': { color: t.primary, fontWeight: 600 },
  '@media (max-width: 768px)': { fontSize: 15, lineHeight: 1.7 },
});

// ─── Mission & Vision ─────────────────────────────────────────────────────────
export const MissionVision = styled(Box)({
  padding: '80px 0',
  background: t.white,
});

export const MvGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 28,
});

export const MvCard = styled(Box)(({ variant }) => {
  const styles = {
    mission: {
      bg: 'linear-gradient(135deg, rgba(13,90,167,0.08), rgba(13,90,167,0.03))',
      border: 'rgba(13,90,167,0.12)',
      iconColor: t.primary,
    },
    vision: {
      bg: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.03))',
      border: 'rgba(16,185,129,0.12)',
      iconColor: t.secondary,
    },
    values: {
      bg: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.03))',
      border: 'rgba(245,158,11,0.12)',
      iconColor: t.accent,
    },
  };
  const s = styles[variant] || styles.mission;
  return {
    padding: 40,
    borderRadius: t.rLg,
    textAlign: 'center',
    background: s.bg,
    border: `1.5px solid ${s.border}`,
    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: t.shadowLg,
    },
    '& .mv-icon-box': {
      width: 70,
      height: 70,
      margin: '0 auto 24px',
      background: t.white,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 28,
      color: s.iconColor,
      boxShadow: t.shadowMd,
    },
    '@media (max-width: 480px)': { padding: 24 },
  };
});

export const MvTitle = styled(Typography)({
  fontSize: 22,
  fontWeight: 700,
  color: t.text,
  marginBottom: 14,
});

export const MvText = styled(Typography)({
  color: t.textMuted,
  lineHeight: 1.7,
  fontSize: 15,
});

export const ValuesList = styled('ul')({
  listStyle: 'none',
  textAlign: 'left',
  marginTop: 20,
  padding: 0,
  '& li': {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    color: t.text,
    fontWeight: 500,
    fontSize: 15,
    '& svg': { color: t.secondary, flexShrink: 0 },
  },
});

// ─── Team ─────────────────────────────────────────────────────────────────────
export const TeamSection = styled(Box)({
  padding: '100px 0',
  background: t.bg,
});

export const TeamGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 28,
});

export const TeamCard = styled(Box)({
  background: t.white,
  padding: 32,
  borderRadius: t.rLg,
  textAlign: 'center',
  transition: 'all 0.3s ease',
  boxShadow: t.shadowMd,
  border: `1.5px solid ${t.border}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: t.shadowXl,
    borderColor: t.primary,
  },
  '@media (max-width: 480px)': { padding: 22 },
});

export const TeamAvatarBox = styled(Box)({
  position: 'relative',
  width: 120,
  height: 120,
  margin: '0 auto 22px',
});

export const TeamAvatarImg = styled('img')({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  objectFit: 'cover',
  border: `4px solid ${t.white}`,
  boxShadow: t.shadowMd,
  display: 'block',
});

export const AvatarBadge = styled(Box)({
  position: 'absolute',
  bottom: 8,
  right: 8,
  width: 20,
  height: 20,
  background: t.secondary,
  borderRadius: '50%',
  border: `3px solid ${t.white}`,
});

export const TeamName = styled(Typography)({
  fontSize: 20,
  fontWeight: 700,
  color: t.text,
  marginBottom: 6,
});

export const TeamRole = styled(Typography)({
  color: t.primary,
  fontWeight: 600,
  marginBottom: 14,
  fontSize: 14,
});

export const TeamBio = styled(Typography)({
  color: t.textMuted,
  fontSize: 14,
  lineHeight: 1.7,
  marginBottom: 18,
});

export const TeamSocial = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: 8,
  fontSize: 13,
  color: t.textSubtle,
});

export const SocialItem = styled('span')({
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  fontWeight: 500,
  '&:hover': { color: t.primary },
});

export const SocialDivider = styled('span')({ opacity: 0.4 });
