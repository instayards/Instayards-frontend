// src/components/NewlyLaunch/NewLaunchStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const t = {
  primary: '#0d5aa7',
  primaryDark: '#0a4a8c',
  text: '#1a202c',
  textMid: '#2d3748',
  textSec: '#6b7280',
  bg: '#ffffff',
  bgLight: '#f8fafc',
  bgLighter: '#f9fafb',
  bgConfig: '#f7fafc',
  border: '#e2e8f0',
  shadow: '0 4px 12px rgba(0,0,0,0.08)',
  shadowHover: '0 8px 24px rgba(0,0,0,0.12)',
};

export const NlContainer = styled(Box)({
  maxWidth: 1200,
  margin: '0 auto',
  padding: 20,
  '@media (max-width: 480px)': { padding: 15 },
});

export const NlPageTitle = styled(Typography)({
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: 700,
  color: t.text,
  marginBottom: 30,
  '@media (max-width: 768px)': { fontSize: '1.7rem' },
  '@media (max-width: 480px)': { fontSize: '1.5rem' },
});

export const NlGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 25,
  '@media (max-width: 1024px)': { gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 },
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr', maxWidth: 450, margin: '0 auto' },
});

export const NlCard = styled(Box)({
  background: t.bg,
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: t.shadow,
  transition: 'all 0.3s ease',
  border: `1px solid ${t.border}`,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: 520,
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: t.shadowHover,
  },
  '&:hover .nl-prop-img': {
    transform: 'scale(1.03)',
  },
  '&:hover .nl-carousel-btn': {
    opacity: 1,
  },
  '@media (max-width: 768px)': { minHeight: 'auto' },
});

export const NlImageCarousel = styled(Box)({
  position: 'relative',
  height: 180,
  overflow: 'hidden',
  flexShrink: 0,
  '@media (max-width: 1024px)': { height: 170 },
  '@media (max-width: 768px)': { height: 190 },
  '@media (max-width: 480px)': { height: 170 },
  '@media (max-width: 360px)': { height: 150 },
});

export const NlPropertyImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
});

export const NlImagePlaceholder = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: t.bgLight,
  color: t.textSec,
  fontSize: 14,
});

export const NlStatusBadge = styled(Box)({
  position: 'absolute',
  top: 12,
  right: 12,
  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
  color: 'white',
  padding: '6px 12px',
  borderRadius: 16,
  fontSize: '0.75rem',
  fontWeight: 600,
});

export const NlCarouselBtn = styled('button')(({ pos }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  ...(pos === 'prev' ? { left: 10 } : { right: 10 }),
  background: 'rgba(255,255,255,0.9)',
  border: 'none',
  width: 28,
  height: 28,
  borderRadius: '50%',
  cursor: 'pointer',
  opacity: 0,
  transition: '0.2s',
  fontSize: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
}));

export const NlImageCounter = styled(Box)({
  position: 'absolute',
  bottom: 8,
  right: 10,
  background: 'rgba(0,0,0,0.55)',
  color: 'white',
  fontSize: '0.7rem',
  padding: '3px 8px',
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const NlContents = styled(Box)({
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '@media (max-width: 480px)': { padding: 14 },
});

export const NlPropertyName = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: 700,
  color: t.textMid,
  marginBottom: 8,
});

export const NlConfigBadges = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 5,
  marginBottom: 12,
});

export const NlConfigBadge = styled('span')({
  background: t.bgConfig,
  padding: '4px 8px',
  fontSize: '0.7rem',
  borderRadius: 6,
  color: t.textMid,
});

export const NlPriceSection = styled(Box)({
  background: t.bgLight,
  padding: '8px 10px',
  borderRadius: 8,
  marginBottom: 15,
  borderLeft: `3px solid #3182ce`,
});

export const NlPriceLabel = styled(Box)({
  fontSize: '0.75rem',
  color: t.textSec,
  marginBottom: 2,
});

export const NlPriceValue = styled(Box)({
  fontSize: '1rem',
  fontWeight: 700,
  color: t.text,
});

export const NlStatsContainer = styled(Box)({
  flex: 1,
  marginBottom: 15,
});

export const NlStatsRow = styled(Box)({
  display: 'flex',
  gap: 10,
  marginBottom: 10,
  '@media (max-width: 768px)': { flexDirection: 'column' },
});

export const NlStatPair = styled(Box)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 8,
  background: t.bgLighter,
  borderRadius: 8,
});

export const NlStatIcon = styled(Box)({
  width: 28,
  height: 28,
  background: '#1f7a94',
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  flexShrink: 0,
  fontSize: '0.85rem',
});

export const NlStatValue = styled(Box)({
  fontSize: '0.8rem',
  fontWeight: 700,
  color: t.text,
  '@media (max-width: 360px)': { fontSize: '0.75rem' },
});

export const NlStatLabel = styled(Box)({
  fontSize: '0.65rem',
  color: t.textSec,
});

export const NlEnquiryBtn = styled('button')({
  background: '#1f7a94',
  color: 'white',
  border: 'none',
  padding: 12,
  borderRadius: 8,
  fontSize: '0.9rem',
  fontWeight: 600,
  cursor: 'pointer',
  width: '100%',
  marginTop: 'auto',
  transition: '0.3s',
  '&:hover': { background: '#166880' },
  '@media (max-width: 480px)': { padding: 10, fontSize: '0.85rem' },
});

export const NlLoading = styled(Box)({
  textAlign: 'center',
  padding: 40,
  color: t.textSec,
});

export const NlNoProperties = styled(Box)({
  textAlign: 'center',
  padding: 40,
  color: t.textSec,
  gridColumn: '1 / -1',
});
