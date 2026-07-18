import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const t = {
  primary: '#0d5aa7',
  text: '#1e293b',
  textSec: '#64748b',
  bg: '#f8fafc',
  bgWhite: '#ffffff',
  border: '#e2e8f0',
  accent: '#f59e0b',
};

export const TmMain = styled(Box)({
  background: t.bg,
  padding: '100px 20px 60px',
  '@media (max-width: 480px)': { padding: '90px 15px 40px' },
});

export const TmWrapper = styled(Box)({
  maxWidth: 900,
  margin: '0 auto',
});

export const TmContent = styled(Box)({
  background: t.bgWhite,
  padding: '40px 32px',
  borderRadius: 8,
  border: `1px solid ${t.border}`,
  '@media (max-width: 768px)': { padding: '30px 20px' },
});

export const TmIntro = styled(Box)({});

export const TmIntroTitle = styled(Typography)({
  fontSize: 32,
  fontWeight: 700,
  color: t.text,
  marginBottom: 10,
  '@media (max-width: 768px)': { fontSize: 26 },
  '@media (max-width: 480px)': { fontSize: 22 },
});

export const TmIntroText = styled(Typography)({
  fontSize: 16,
  color: t.textSec,
  lineHeight: 1.7,
  marginBottom: 30,
});

export const TmSection = styled(Box)({
  marginBottom: 32,
});

export const TmSectionHeader = styled(Box)({
  marginBottom: 10,
});

export const TmSectionTitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 600,
  color: t.text,
  '@media (max-width: 480px)': { fontSize: 16 },
});

export const TmSectionContents = styled(Box)({
  '& p': {
    fontSize: 15,
    color: t.textSec,
    lineHeight: 1.7,
    '@media (max-width: 480px)': { fontSize: 14 },
  },
});

export const TmSectionDetails = styled(Box)({
  marginTop: 15,
  paddingLeft: 10,
  '& h4': { fontSize: 15, fontWeight: 600, marginBottom: 8, color: t.text },
  '& ul': { paddingLeft: 18 },
  '& li': { fontSize: 14, color: t.textSec, marginBottom: 6 },
});

export const TmNotice = styled(Box)({
  marginTop: 40,
  padding: 20,
  borderLeft: `4px solid ${t.accent}`,
  background: '#fff7ed',
  display: 'flex',
  gap: 16,
  alignItems: 'flex-start',
  '& svg': { color: t.accent, fontSize: 22, flexShrink: 0, marginTop: 2 },
});

export const TmNoticeContent = styled(Box)({
  '& h3': { fontSize: 16, fontWeight: 600, marginBottom: 6, color: t.text },
  '& p': { fontSize: 14, color: t.textSec, lineHeight: 1.6, margin: 0 },
});
