// src/components/CustomerTestimonials/CustomerTestimonialsStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// ─── Tokens ──────────────────────────────────────────────────────────────────
const t = {
  primary:     '#1f7a94',
  primaryDark: '#165f73',
  primaryLight:'#e6f4f7',
  secondary:   '#10b981',
  text:        '#1e293b',
  textMuted:   '#64748b',
  textSubtle:  '#94a3b8',
  bg:          'linear-gradient(160deg, #f8faff 0%, #eef2f7 100%)',
  white:       '#ffffff',
  border:      '#e2e8f0',

  shadowSm:    '0 2px 4px rgba(0,0,0,0.05)',
  shadowMd:    '0 4px 12px rgba(31,122,148,0.08)',
  shadowHover: '0 12px 32px rgba(31,122,148,0.15)',

  rSm:  '8px',
  rMd:  '14px',
  rPill:'999px',
};

// ─── Root ────────────────────────────────────────────────────────────────────
export const TestimonialsSection = styled(Box)({
  padding: '80px 20px',
  background: t.bg,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  boxSizing: 'border-box',
  '@media (max-width: 768px)': { padding: '60px 16px' },
});

export const TestimonialsContainer = styled(Box)({
  maxWidth: 1200,
  margin: '0 auto',
});

// ─── Header ──────────────────────────────────────────────────────────────────
export const TestimonialsHeader = styled(Box)({
  textAlign: 'center',
  marginBottom: 60,
  '@media (max-width: 768px)': { marginBottom: 40 },
});

export const TestimonialsTitle = styled(Typography)({
  fontSize: 'clamp(24px, 4vw, 36px)',
  fontWeight: 700,
  color: t.text,
  marginBottom: 16,
  lineHeight: 1.2,
  '@media (max-width: 768px)': { fontSize: 26, lineHeight: 1.3 },
});

export const TestimonialsSubtitle = styled(Typography)({
  fontSize: 18,
  color: t.textMuted,
  maxWidth: 600,
  margin: '0 auto 40px',
  lineHeight: 1.6,
  fontWeight: 400,
  '@media (max-width: 768px)': { fontSize: 15, marginBottom: 24 },
});

export const HeaderStats = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: 20,
  marginTop: 40,
  flexWrap: 'wrap',
  '@media (max-width: 768px)': { gap: 10 },
  '@media (max-width: 480px)': { flexDirection: 'column', alignItems: 'center' },
});

export const StatPill = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 24px',
  background: t.white,
  borderRadius: t.rSm,
  boxShadow: t.shadowSm,
  border: `1px solid ${t.border}`,
  '@media (max-width: 768px)': { padding: '10px 14px' },
  '@media (max-width: 480px)': { width: '100%', maxWidth: 220, justifyContent: 'center' },
});

export const StatIcon = styled('span')({ fontSize: 20 });

export const StatContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const StatValue = styled('span')({
  fontSize: 18,
  fontWeight: 600,
  color: t.primary,
  lineHeight: 1,
  '@media (max-width: 768px)': { fontSize: 15 },
});

export const StatLabelTest = styled('span')({
  fontSize: 12,
  color: 'black',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

// ─── Grid ────────────────────────────────────────────────────────────────────
export const TestimonialsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 24,
  marginBottom: 40,
  alignItems: 'start',
  '@media (max-width: 768px)': { gap: 16 },
});

// ─── Card ────────────────────────────────────────────────────────────────────
export const TestimonialCard = styled(Box)({
  background: t.white,
  borderRadius: t.rMd,
  padding: '28px 24px 20px',
  boxShadow: t.shadowMd,
  border: `1px solid ${t.border}`,
  borderTop: `3px solid ${t.primary}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  flexShrink: 0,
  '&:hover': {
    boxShadow: t.shadowHover,
    transform: 'translateY(-5px)',
  },
  '@media (max-width: 768px)': { padding: '22px 18px 16px' },
});

// ─── Decorative Quote Mark ────────────────────────────────────────────────────
export const QuoteMark = styled('span')({
  fontSize: 64,
  color: t.primary,
  opacity: 0.13,
  lineHeight: 0.7,
  fontFamily: 'Georgia, "Times New Roman", serif',
  display: 'block',
  marginBottom: 8,
  userSelect: 'none',
  letterSpacing: '-2px',
});

// ─── Customer Info ────────────────────────────────────────────────────────────
export const CustomerInfo = styled(Box)({
  display: 'flex',
  gap: 14,
  marginBottom: 18,
  alignItems: 'center',
});

export const AvatarWrapper = styled(Box)({
  position: 'relative',
  flexShrink: 0,
});

export const CustomerAvatar = styled('img')({
  width: 56,
  height: 56,
  borderRadius: '50%',
  objectFit: 'cover',
  border: `3px solid ${t.primary}`,
  boxShadow: `0 0 0 2px ${t.primaryLight}`,
  display: 'block',
  '@media (max-width: 768px)': { width: 48, height: 48 },
});

export const CustomerDetails = styled(Box)({
  flex: 1,
  minWidth: 0,
});

export const CustomerMetaTop = styled(Box)({ marginBottom: 4 });

export const CustomerName = styled(Typography)({
  fontSize: 15,
  fontWeight: 700,
  color: t.text,
  margin: '0 0 4px 0',
  '@media (max-width: 768px)': { fontSize: 14 },
});

export const RatingStars = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  marginBottom: 4,
});

export const RatingNumber = styled('span')({
  fontSize: 12,
  color: t.textSubtle,
  marginLeft: 6,
  fontWeight: 500,
});

export const CompactInfo = styled('span')({
  fontSize: 12,
  color: t.textMuted,
  fontStyle: 'italic',
});

// ─── Feedback ────────────────────────────────────────────────────────────────
export const FeedbackContainer = styled(Box)({
  flex: 1,
  marginBottom: 20,
  padding: '14px 0 0',
  borderTop: `1px dashed ${t.border}`,
});

export const FeedbackText = styled(Typography)({
  fontSize: 14,
  color: t.text,
  lineHeight: 1.75,
  margin: 0,
  '@media (max-width: 768px)': { fontSize: 13 },
});

// ─── Footer ──────────────────────────────────────────────────────────────────
export const TestimonialFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 14,
  borderTop: `1px solid ${t.border}`,
  fontSize: 12,
  marginTop: 'auto',
  '@media (max-width: 480px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
  },
});

export const FooterLeft = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const FeedbackDate = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: t.textSubtle,
  fontSize: 12,
  '& svg': { width: 12, height: 12 },
});

export const TransactionAmount = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 12,
});

export const AmountLabel = styled('span')({ color: t.textSubtle });

export const AmountValue = styled('span')({
  fontWeight: 600,
  color: t.primary,
  fontSize: 13,
});

export const VerifiedBadge = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: t.secondary,
  fontWeight: 600,
  fontSize: 11,
  padding: '4px 10px',
  background: 'rgba(16,185,129,0.1)',
  borderRadius: t.rPill,
  border: '1px solid rgba(16,185,129,0.2)',
  '& svg': { width: 12, height: 12 },
});

// ─── Controls ────────────────────────────────────────────────────────────────
export const TestimonialsControls = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20,
  marginTop: 8,
  '@media (max-width: 480px)': { gap: 12 },
});

export const NavBtn = styled('button')({
  width: 44,
  height: 44,
  borderRadius: '50%',
  background: t.white,
  border: `1px solid ${t.border}`,
  color: t.text,
  fontSize: 18,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  fontFamily: 'inherit',
  '&:hover:not(:disabled)': {
    background: t.primary,
    color: 'white',
    borderColor: t.primary,
  },
  '&:disabled': {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  '@media (max-width: 480px)': { width: 38, height: 38, fontSize: 16 },
});

export const SlideIndicator = styled(Typography)({
  fontSize: 14,
  color: t.textMuted,
  fontWeight: 500,
  '@media (max-width: 480px)': { fontSize: 13 },
});

// ─── Carousel ─────────────────────────────────────────────────────────────────
export const CarouselWrapper = styled(Box)({
  overflow: 'hidden',
  width: '100%',
  marginBottom: 32,
});

export const CarouselTrack = styled(Box)({
  display: 'flex',
  gap: 24,
  alignItems: 'stretch',
  transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'transform',
  '@media (max-width: 768px)': { gap: 0 },
});

// ─── Dots ─────────────────────────────────────────────────────────────────────
export const DotsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const Dot = styled('button')(({ active }) => ({
  width: active ? 24 : 8,
  height: 8,
  borderRadius: 999,
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  transition: 'width 0.3s ease, background 0.3s ease',
  background: active ? t.primary : t.border,
  '&:hover': {
    background: active ? t.primary : t.textSubtle,
  },
}));
