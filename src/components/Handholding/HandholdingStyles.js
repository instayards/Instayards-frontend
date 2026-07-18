// src/components/Handholding/HandholdingStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const gradients = {
  orange: 'linear-gradient(135deg, #ff7a18, #ffb347)',
  purple: 'linear-gradient(135deg, #a855f7, #ec4899)',
  green:  'linear-gradient(135deg, #22c55e, #16a34a)',
};

export const HhWrapper = styled('section')({
  padding: '5rem 1.5rem',
  background: 'linear-gradient(180deg, #ffffff, #f7f8fc)',
  textAlign: 'center',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
});

export const HhTitle = styled(Typography)({
  fontSize: 'clamp(1.9rem, 4vw, 2.4rem)',
  fontWeight: 800,
  color: '#1f2937',
  lineHeight: 1.2,
});

export const HhSubtitle = styled(Typography)({
  marginTop: '0.6rem',
  color: '#6b7280',
  fontSize: '1.05rem',
});

export const HhCards = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2rem',
  marginTop: '3.5rem',
});

export const HhCard = styled(Box)(({ variant }) => ({
  position: 'relative',
  background: '#ffffff',
  padding: '2.5rem 2rem',
  borderRadius: 20,
  boxShadow: '0 18px 45px rgba(0,0,0,0.08)',
  transition: 'all 0.35s ease',
  overflow: 'hidden',
  textAlign: 'left',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: gradients[variant] || gradients.orange,
    opacity: 0.07,
    pointerEvents: 'none',
  },
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 28px 65px rgba(0,0,0,0.12)',
  },
}));

export const HhIcon = styled(Box)(({ variant }) => ({
  width: 58,
  height: 58,
  margin: '0 0 1.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 16,
  fontSize: '1.9rem',
  color: '#ffffff',
  background: gradients[variant] || gradients.orange,
  position: 'relative',
  zIndex: 1,
}));

export const HhCardTitle = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#111827',
  marginBottom: '1.1rem',
  position: 'relative',
  zIndex: 1,
});

export const HhList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  position: 'relative',
  zIndex: 1,
});

export const HhListItem = styled('li')({
  fontSize: '0.95rem',
  color: '#4b5563',
  marginBottom: '0.65rem',
  paddingLeft: '1.2rem',
  position: 'relative',
  lineHeight: 1.6,
  '&::before': {
    content: '"→"',
    position: 'absolute',
    left: 0,
    color: '#9ca3af',
    fontSize: '0.8rem',
    top: 2,
  },
});
