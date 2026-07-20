// src/components/HeroSection/HeroSectionStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const InstaHero = styled('section')({
  marginTop: 70,
  minHeight: '90vh',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: "'Inter', sans-serif",
  '@media (max-width: 992px)': { minHeight: '75vh' },
  '@media (max-width: 768px)': { minHeight: '65vh' },
  '@media (max-width: 480px)': { minHeight: '60vh' },
  '@media (max-width: 360px)': { minHeight: '55vh' },
});

export const CarouselContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: 'inherit',
});

export const CarouselSlide = styled(Box)(({ active }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '90%',
  opacity: active ? 1 : 0,
  transition: 'opacity 1s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  '@media (max-width: 768px)': { padding: '20px' },
}));

export const CarouselBg = styled(Box)(({ bgimage }) => ({
  position: 'absolute',
  inset: 0,
  backgroundImage: `url("${bgimage}")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.55))',
  },
}));

export const HeroContentMain = styled(Box)({
  position: 'relative',
  zIndex: 2,
  maxWidth: 1100,
  width: '100%',
  textAlign: 'center',
  color: 'white',
  padding: '0 16px',
});

export const HeroTitle = styled(Typography)({
  fontSize: 'clamp(28px, 5vw, 56px)',
  fontWeight: 800,
  marginBottom: 20,
  lineHeight: 1.2,
  color: 'white',
  textShadow: '0 2px 12px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.7)',
});

export const HeroSubtitle = styled(Typography)({
  fontSize: 'clamp(15px, 2.5vw, 22px)',
  marginBottom: 35,
  maxWidth: 700,
  marginInline: 'auto',
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.95)',
  textShadow: '0 1px 8px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.7)',
  '@media (max-width: 480px)': { marginBottom: 25 },
});

export const CarouselIndicators = styled(Box)({
  position: 'absolute',
  bottom: 20,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  zIndex: 3,
  '@media (max-width: 480px)': { bottom: 15 },
});

export const Indicator = styled('button')(({ active }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  border: 'none',
  background: active ? '#0d5aa7' : 'rgba(255,255,255,0.4)',
  transform: active ? 'scale(1.2)' : 'scale(1)',
  cursor: 'pointer',
  padding: 0,
  transition: 'all 0.3s ease',
  '&:hover': { background: 'rgba(255,255,255,0.8)' },
}));
