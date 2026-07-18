// src/components/HotProperties/HotPropertiesStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const t = {
  primary: '#1f7a94',
  blue: '#1f7a94',
  // blue: '#51bddb',
  text: '#1e293b',
  textSec: '#64748b',
  textLight: '#94a3b8',
  bgLight: '#f8fafc',
  border: '#e2e8f0',
};

export const HpContainer = styled(Box)({
  maxWidth: 1300,
  margin: '0 auto',
  padding: '2rem 1rem',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  '@media (max-width: 992px)': { padding: '1.5rem 1rem' },
  '@media (max-width: 768px)': { padding: '1.25rem 0.75rem' },
  '@media (max-width: 576px)': { padding: '1rem 0.5rem' },
});

export const HpHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  '@media (max-width: 992px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
});

export const HpHeaderLeft = styled(Box)({
  flex: 1,
  '@media (max-width: 992px)': { width: '100%' },
});

export const HpSectionTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#333',
  '@media (max-width: 992px)': { fontSize: '1.35rem' },
  '@media (max-width: 768px)': { fontSize: '1.25rem' },
  '@media (max-width: 576px)': { fontSize: '1.125rem' },
});

export const HpViewAll = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '12px 24px',
  background: t.blue,
  border: `2px solid ${t.border}`,
  borderRadius: 12,
  color: 'white',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '0.9rem',
  transition: 'all 0.2s',
  '&:hover': {
    background: t.primary,
    borderColor: t.primary,
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  },
  '@media (max-width: 992px)': { alignSelf: 'flex-start', padding: '10px 20px', fontSize: '0.85rem' },
  '@media (max-width: 576px)': { width: '100%', justifyContent: 'center' },
});

export const HpGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1.5rem',
  '@media (max-width: 992px)': { gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' },
  '@media (max-width: 576px)': { gridTemplateColumns: '1fr', gap: '1rem' },
});

export const HpCardWrapper = styled(Box)({ position: 'relative' });

export const HpSoldStamp = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) rotate(-15deg)',
  width: 115,
  height: 115,
  borderRadius: '50%',
  background: 'rgba(204, 20, 20, 0.93)',
  border: '4px solid rgba(255,255,255,0.95)',
  boxShadow: '0 0 0 3px rgba(204,20,20,0.85), 0 6px 24px rgba(0,0,0,0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: 22,
  fontWeight: 900,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  zIndex: 20,
  pointerEvents: 'none',
  fontFamily: "'Inter', sans-serif",
  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
});

export const HpCardLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  width: '100%',
});

export const HpCard = styled(Box)({
  background: 'white',
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  border: '1px solid #e6e6e6',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  '&:hover img': { transform: 'scale(1.05)' },
});

export const HpImageSection = styled(Box)({
  position: 'relative',
  width: '100%',
  height: 300,
  overflow: 'hidden',
  contain: 'paint',
  '@media (max-width: 992px)': { height: 220 },
  '@media (max-width: 768px)': { height: 180 },
  '@media (max-width: 576px)': { height: 200 },
});

export const HpImageSkeleton = styled(Box)({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  background: 'linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'hpShimmer 1.4s ease infinite',
  '@keyframes hpShimmer': {
    '0%':   { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
  },
});

export const HpImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.5s ease',
});

export const HpCarouselControls = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  transform: 'translateY(-50%)',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 10px',
  zIndex: 10,
});

export const HpCarouselBtn = styled('button')({
  background: 'rgba(255,255,255,0.9)',
  border: 'none',
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#333',
  fontSize: '1.1rem',
  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  transition: 'all 0.2s',
  '&:hover': { background: 'white', transform: 'scale(1.1)' },
  '@media (max-width: 768px)': { width: 28, height: 28 },
});

export const HpCarouselDots = styled(Box)({
  position: 'absolute',
  bottom: 10,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  gap: 4,
});

export const HpCarouselDot = styled('button')(({ active }) => ({
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: active ? 'white' : 'rgba(255,255,255,0.5)',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
}));

export const HpImageOverlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 100,
  background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
});

export const HpBadges = styled(Box)({
  position: 'absolute',
  top: 12,
  left: 12,
  zIndex: 2,
  right: 20,
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
});

export const HpBadge = styled('span')(({ statustype }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '4px 8px',
  background: statustype === 'sold' ? '#dc2626'
    : statustype === 'ready' ? '#16a34a'
    : t.blue,
  borderRadius: 4,
  fontSize: '0.75rem',
  fontWeight: 500,
  color: 'white',
  backdropFilter: 'blur(10px)',
}));

export const HpContent = styled(Box)({
  padding: '1rem',
  '@media (max-width: 768px)': { padding: '0.75rem' },
});

export const HpName = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
  color: '#333',
});

export const HpAddressLine = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 14,
  fontWeight: 600,
  color: t.text,
  marginBottom: '1rem',
});

export const HpSpecs = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  background: t.bgLight,
  borderRadius: 10,
  padding: 12,
  marginBottom: 16,
  border: `1px solid ${t.border}`,
});

export const HpSpecItem = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: 10,
});

export const HpSpecIcon = styled(Box)({
  fontSize: 18,
  color: t.primary,
  width: 30,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  borderRadius: 8,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
});

export const HpSpecDivider = styled(Box)({
  width: 1,
  height: 30,
  background: t.border,
  margin: '0 12px',
});

export const HpSpecContent = styled(Box)({ display: 'flex', flexDirection: 'column' });

export const HpSpecValue = styled('span')({
  fontSize: '1rem',
  fontWeight: 600,
  color: '#333',
  marginBottom: 4,
  lineHeight: 1,
});

export const HpFeatures = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
  gap: '0.5rem',
});

export const HpFeatureItem = styled(Box)({
  textAlign: 'center',
  padding: '8px 4px',
  background: t.bgLight,
  borderRadius: 6,
  border: `1px solid ${t.border}`,
  transition: 'all 0.3s ease',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': { background: 'white', borderColor: t.primary, transform: 'translateY(-2px)' },
});

export const HpFeatureInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  overflow: 'hidden',
});

export const HpFeatureValue = styled('span')({
  fontSize: 12,
  fontWeight: 700,
  color: t.text,
  marginBottom: 1,
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
});

export const HpFeatureLabel = styled('span')({ fontSize: '0.75rem', color: '#666' });

export const HpCta = styled(Box)({ display: 'flex', gap: '0.5rem', marginTop: 16 });

export const HpEnquireBtn = styled('button')({
  flex: 1,
  padding: '0.75rem',
  background: t.blue,
  color: 'white',
  border: 'none',
  borderRadius: 4,
  fontWeight: 600,
  fontSize: '0.875rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
  '&:hover': { background: '#165f73' },
});

export const HpBackdrop = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

export const HpModal = styled(Box)({
  background: 'white',
  padding: '2rem',
  borderRadius: 8,
  width: '90%',
  maxWidth: 400,
  '@media (max-width: 768px)': { padding: '1.5rem', maxWidth: 350 },
});

export const HpModalTitle = styled(Typography)({
  marginBottom: '1rem',
  color: '#333',
  fontWeight: 700,
  fontSize: '1.1rem',
});

export const HpModalInput = styled('input')({
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  border: '1px solid #ddd',
  borderRadius: 4,
  fontSize: '0.875rem',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
});

export const HpModalActions = styled(Box)({
  display: 'flex',
  gap: '0.5rem',
  justifyContent: 'flex-end',
});

export const HpBtnCancel = styled('button')({
  padding: '0.75rem 1.5rem',
  background: '#f5f5f5',
  border: '1px solid #ddd',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontFamily: 'inherit',
});

export const HpBtnSubmit = styled('button')({
  padding: '0.75rem 1.5rem',
  background: t.blue,
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontFamily: 'inherit',
  '&:disabled': { opacity: 0.6, cursor: 'not-allowed' },
});

export const HpLoadingBox = styled(Box)({ textAlign: 'center', padding: '4rem 2rem' });

export const HpSpinner = styled(Box)({
  border: '3px solid #f3f3f3',
  borderTop: `3px solid ${t.blue}`,
  borderRadius: '50%',
  width: 40,
  height: 40,
  animation: 'spin 1s linear infinite',
  margin: '0 auto 1rem',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
});

export const HpErrorMsg = styled(Typography)({ color: '#d32f2f', marginBottom: '1rem' });

export const HpRetryBtn = styled('button')({
  padding: '0.5rem 1rem',
  background: t.blue,
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  fontFamily: 'inherit',
});
