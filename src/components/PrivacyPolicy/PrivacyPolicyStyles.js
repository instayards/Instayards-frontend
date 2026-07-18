import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const t = {
  primary: '#0d5aa7',
  primaryHover: '#0a4a8c',
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
};

export const PpContainer = styled(Box)({
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  background: t.bg,
  width: '100%',
  overflowX: 'hidden',
});

export const PpMain = styled(Box)({
  maxWidth: 1200,
  margin: '20px auto 0',
  padding: '60px 20px',
  width: '100%',
  overflowX: 'hidden',
  '@media (max-width: 768px)': { padding: '30px 16px', marginTop: 30 },
});

export const PpWrapper = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '280px 1fr',
  gap: 40,
  '@media (max-width: 992px)': { gridTemplateColumns: '1fr', gap: 30 },
});

export const PpSidebar = styled(Box)({
  position: 'sticky',
  top: 40,
  height: 'fit-content',
  marginTop: 10,
  '@media (max-width: 992px)': { position: 'static', width: '100%', marginTop: 0 },
  '@media (max-width: 768px)': { marginTop: 15 },
});

export const PpSidebarSection = styled(Box)({
  background: t.bgWhite,
  borderRadius: 16,
  padding: 24,
  border: `1px solid ${t.border}`,
  boxShadow: t.shadowSm,
  marginBottom: 24,
  '@media (max-width: 992px)': { padding: 18 },
});

export const PpSidebarTitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  fontSize: 16,
  fontWeight: 700,
  color: t.text,
  marginBottom: 20,
  '& svg': { color: t.primary },
  '@media (max-width: 768px)': { fontSize: 15 },
});

export const PpSidebarNav = styled('nav')({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const PpSidebarLink = styled('a')({
  padding: '12px 16px',
  color: t.textSec,
  textDecoration: 'none',
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 500,
  transition: 'all 0.3s ease',
  borderLeft: '3px solid transparent',
  '&:hover': {
    background: t.bg,
    color: t.primary,
    borderLeftColor: t.primary,
    paddingLeft: 20,
  },
  '@media (max-width: 768px)': { fontSize: 13, padding: '10px 12px' },
});

export const PpHighlightsList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
});

export const PpHighlightItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  fontSize: 14,
  color: t.text,
  fontWeight: 500,
  '& svg': { color: t.secondary },
});

export const PpContent = styled(Box)({
  background: t.bgWhite,
  borderRadius: 16,
  padding: 40,
  border: `1px solid ${t.border}`,
  boxShadow: t.shadowSm,
  marginTop: 38,
  '@media (max-width: 768px)': { padding: 20, marginTop: 15 },
  '@media (max-width: 480px)': { padding: 16 },
});

export const PpIntro = styled(Box)({
  marginBottom: 40,
  paddingBottom: 30,
  borderBottom: `1px solid ${t.border}`,
});

export const PpIntroTitle = styled(Typography)({
  fontSize: 32,
  fontWeight: 700,
  color: t.text,
  marginBottom: 20,
  '@media (max-width: 480px)': { fontSize: 22 },
});

export const PpIntroText = styled(Typography)({
  fontSize: 18,
  color: t.textSec,
  lineHeight: 1.6,
});

export const PpSections = styled(Box)({
  marginBottom: 40,
});

export const PpSection = styled('section')({
  marginBottom: 40,
  paddingBottom: 40,
  borderBottom: `1px solid ${t.border}`,
  '&:last-child': { borderBottom: 'none', marginBottom: 0 },
});

export const PpSectionHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  marginBottom: 24,
  '@media (max-width: 768px)': { flexDirection: 'column', alignItems: 'flex-start', gap: 12 },
});

export const PpSectionNumber = styled(Box)({
  width: 40,
  height: 40,
  background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryHover} 100%)`,
  color: 'white',
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  fontWeight: 700,
  flexShrink: 0,
});

export const PpSectionTitle = styled(Typography)({
  fontSize: 22,
  fontWeight: 700,
  color: t.text,
  lineHeight: 1.3,
  '@media (max-width: 768px)': { fontSize: 20 },
  '@media (max-width: 480px)': { fontSize: 18 },
  '@media (max-width: 360px)': { fontSize: 16 },
});

export const PpSectionContent = styled(Box)({
  paddingLeft: 60,
  '@media (max-width: 768px)': { paddingLeft: 0 },
});

export const PpSectionText = styled(Typography)({
  fontSize: 16,
  color: t.textSec,
  lineHeight: 1.7,
  marginBottom: 20,
  '@media (max-width: 768px)': { fontSize: 15 },
  '@media (max-width: 480px)': { fontSize: 14 },
});

export const PpList = styled(Box)({
  margin: '20px 0',
  '& ul': { listStyle: 'none', padding: 0, margin: 0 },
  '& li': {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '12px 0',
    fontSize: 15,
    color: t.textSec,
    lineHeight: 1.5,
    borderBottom: `1px solid ${t.bg}`,
    '&:last-child': { borderBottom: 'none' },
  },
  '@media (max-width: 768px)': { '& li': { fontSize: 14 } },
});

export const PpListIcon = styled('span')({
  color: t.secondary,
  fontSize: 16,
  marginTop: 2,
  flexShrink: 0,
  display: 'flex',
});

export const PpNote = styled(Box)({
  display: 'flex',
  gap: 12,
  padding: 16,
  background: 'rgba(245,158,11,0.1)',
  borderRadius: 8,
  borderLeft: `4px solid ${t.accent}`,
  margin: '20px 0',
  '& svg': { color: t.accent, fontSize: 20, flexShrink: 0, marginTop: 2 },
  '& p': { fontSize: 14, color: t.text, margin: 0, lineHeight: 1.5 },
});

export const PpContactDetails = styled(Box)({
  borderRadius: 12,
  padding: 24,
  marginTop: 20,
});

export const PpContactItem = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 15,
  padding: '12px 0',
  borderBottom: `1px solid ${t.border}`,
  '&:last-child': { borderBottom: 'none' },
  '& svg': { color: t.primary, fontSize: 18, marginTop: 2, flexShrink: 0 },
  '& > div': { display: 'flex', flexDirection: 'column', gap: 4 },
  '& strong': { fontSize: 14, color: t.text, fontWeight: 600 },
  '& span': { fontSize: 15, color: t.textSec, lineHeight: 1.5 },
  '@media (max-width: 480px)': { flexDirection: 'column', gap: 6, '& span': { fontSize: 14 } },
});

export const PpRightsSummary = styled(Box)({
  background: 'linear-gradient(135deg, rgba(13,90,167,0.05), rgba(13,90,167,0.02))',
  borderRadius: 16,
  padding: 40,
  margin: '60px 0',
  border: `2px solid ${t.border}`,
  '@media (max-width: 768px)': { padding: '25px 16px' },
});

export const PpRightsHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 15,
  marginBottom: 30,
  justifyContent: 'center',
  '& svg': { fontSize: 36, color: t.primary },
  '& h3': {
    fontSize: 28,
    fontWeight: 700,
    color: t.text,
    margin: 0,
    '@media (max-width: 768px)': { fontSize: 24, textAlign: 'center' },
    '@media (max-width: 480px)': { fontSize: 20, textAlign: 'center' },
  },
});

export const PpRightsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 24,
  '@media (max-width: 992px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const PpRightCard = styled(Box)({
  background: t.bgWhite,
  borderRadius: 12,
  padding: 24,
  textAlign: 'center',
  border: `1px solid ${t.border}`,
  transition: 'all 0.3s ease',
  '&:hover': { transform: 'translateY(-4px)', boxShadow: t.shadowMd, borderColor: t.primary },
  '@media (max-width: 480px)': { padding: 18 },
});

export const PpRightIcon = styled(Box)({
  width: 60,
  height: 60,
  background: 'linear-gradient(135deg, rgba(13,90,167,0.1), rgba(13,90,167,0.05))',
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  fontSize: 24,
  color: t.primary,
  '& svg': { fontSize: 24 },
});

export const PpRightCardTitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  color: t.text,
  marginBottom: 12,
});

export const PpRightCardText = styled(Typography)({
  fontSize: 14,
  color: t.textSec,
  lineHeight: 1.5,
  margin: 0,
});
