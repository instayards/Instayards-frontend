// src/components/FAQ/FAQStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const t = {
  primary:   '#0d5aa7',
  accent:    '#6366f1',
  accentBg:  'rgba(99,102,241,0.12)',
  text:      '#111827',
  textMuted: '#6b7280',
  textBody:  '#4b5563',
  bg:        '#f9fafb',
  white:     '#ffffff',
  border:    '#e5e7eb',
};

export const FaqWrapper = styled('section')({
  padding: '5rem 1.5rem',
  background: t.white,
  maxWidth: 900,
  margin: '0 auto',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
});

export const FaqTitle = styled(Typography)({
  textAlign: 'center',
  fontSize: 'clamp(1.9rem, 4vw, 2.3rem)',
  fontWeight: 800,
  color: t.text,
  lineHeight: 1.2,
});

export const FaqSubtitle = styled(Typography)({
  textAlign: 'center',
  marginTop: '0.6rem',
  color: t.textMuted,
  fontSize: '1.05rem',
});

export const FaqList = styled(Box)({ marginTop: '3rem' });

export const FaqItem = styled(Box)(({ open }) => ({
  border: `1px solid ${open ? t.accent : t.border}`,
  borderRadius: 14,
  marginBottom: '1rem',
  overflow: 'hidden',
  transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
  boxShadow: open ? '0 10px 30px rgba(99,102,241,0.15)' : 'none',
}));

export const FaqQuestion = styled('button')(({ open }) => ({
  width: '100%',
  background: open ? t.accentBg : t.bg,
  border: 'none',
  padding: '1.25rem 1.5rem',
  fontSize: '1.05rem',
  fontWeight: 600,
  color: t.text,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  fontFamily: 'inherit',
  textAlign: 'left',
  transition: 'background 0.25s ease',
  '& svg': {
    fontSize: '1.2rem',
    color: t.accent,
    flexShrink: 0,
    marginLeft: 12,
  },
}));

export const FaqAnswer = styled(Box)(({ open }) => ({
  maxHeight: open ? 300 : 0,
  overflow: 'hidden',
  background: t.white,
  transition: 'max-height 0.35s ease',
}));

export const FaqAnswerText = styled(Typography)({
  padding: '1rem 1.5rem 1.4rem',
  color: t.textBody,
  fontSize: '0.95rem',
  lineHeight: 1.7,
});
