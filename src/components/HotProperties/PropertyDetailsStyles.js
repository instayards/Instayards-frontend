// src/components/HotProperties/PropertyDetailsStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const t = {
  primary: '#4361ee',
  primaryDark: '#3a56d4',
  primaryHover: '#0a4a8c',
  secondary: '#10b981',
  text: '#1f2937',
  textSec: '#6b7280',
  bg: '#f9fafb',
  border: '#e5e7eb',
  shadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  shadowLg: '0 10px 15px -3px rgba(0,0,0,0.1)',
};

/* ─── Layout ─────────────────────────────────────────────── */
export const PdContainer = styled(Box)({
  maxWidth: 1400,
  margin: '0 auto',
  padding: '40px 20px',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  color: t.text,
  '@media (max-width: 768px)': { padding: '20px 14px' },
  '@media (max-width: 576px)': { padding: '20px 16px' },
});

export const PdBackBtn = styled('button')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  background: 'none',
  border: 'none',
  color: t.primary,
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
  padding: '12px 0',
  marginBottom: 20,
  transition: 'all 0.3s ease',
  fontFamily: 'inherit',
  '&:hover': { gap: 12, opacity: 0.8 },
});

export const PdMainHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 30,
  flexWrap: 'wrap',
  gap: 20,
  '@media (max-width: 768px)': { flexDirection: 'column' },
});

export const PdMainTitle = styled('h1')({
  fontSize: 32,
  fontWeight: 800,
  color: t.text,
  lineHeight: 1.3,
  margin: 0,
  flex: 1,
  minWidth: 300,
  fontFamily: 'inherit',
  '@media (max-width: 992px)': { fontSize: 26 },
  '@media (max-width: 768px)': { fontSize: 22 },
});

export const PdActions = styled(Box)({ display: 'flex', gap: 12, flexWrap: 'wrap' });

export const PdActionBtn = styled('button')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 16px',
  background: 'white',
  border: `1px solid ${t.border}`,
  borderRadius: 8,
  color: t.text,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontFamily: 'inherit',
  '&:hover': { background: t.bg, borderColor: t.primary, transform: 'translateY(-2px)', boxShadow: t.shadow },
  '@media (max-width: 768px)': { padding: '8px 12px', fontSize: 13 },
});

/* ─── Gallery ────────────────────────────────────────────── */
export const PdGallery = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: 20,
  marginBottom: 40,
  '@media (max-width: 1200px)': { gridTemplateColumns: '1fr' },
});

export const PdMainMedia = styled(Box)({
  gridColumn: 1,
  gridRow: '1 / span 2',
  borderRadius: 16,
  overflow: 'hidden',
  position: 'relative',
  '@media (max-width: 1200px)': { gridColumn: 1, gridRow: 1, height: 'auto' },
});

export const PdImageSkeleton = styled(Box)({
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  borderRadius: 16,
  background: 'linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'pdShimmer 1.4s ease infinite',
  '@keyframes pdShimmer': {
    '0%':   { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
  },
});

export const PdMainImageWrap = styled(Box)({
  width: '100%',
  height: 700,
  position: 'relative',
  contain: 'paint',
  background: '#ffffff',
  '@media (max-width: 1400px)': { height: 550 },
  '@media (max-width: 1200px)': { height: 400 },
  '@media (max-width: 992px)': { height: 320 },
  '@media (max-width: 768px)': { height: 260 },
  '@media (max-width: 480px)': { height: 220 },
});

export const PdMainImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  transition: 'transform 0.5s ease',
});

export const PdImgOverlayControls = styled(Box)({
  position: 'absolute',
  top: 20,
  right: 20,
  display: 'flex',
  gap: 10,
});

export const PdImgNavBtn = styled('button')({
  width: 48,
  height: 48,
  background: 'rgba(255,255,255,0.9)',
  border: 'none',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: 20,
  color: t.text,
  fontFamily: 'inherit',
  '&:hover': { background: 'white', transform: 'scale(1.1)', boxShadow: t.shadow },
});

export const PdImgFullscreenBtn = styled('button')({
  position: 'absolute',
  bottom: 60,
  right: 20,
  width: 48,
  height: 48,
  background: 'rgba(255,255,255,0.9)',
  border: 'none',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: 20,
  color: t.text,
  fontFamily: 'inherit',
  '&:hover': { background: 'white', transform: 'scale(1.1)', boxShadow: t.shadow },
});

export const PdMediaCounter = styled(Box)({
  position: 'absolute',
  bottom: 20,
  left: 20,
  background: 'rgba(0,0,0,0.7)',
  color: 'white',
  padding: '8px 16px',
  borderRadius: 20,
  fontSize: 14,
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
});

export const PdNoMedia = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  color: t.textSec,
  fontSize: 16,
  gap: 12,
});

/* ─── Thumbnail ──────────────────────────────────────────── */
export const PdThumbnailGallery = styled(Box)({
  gridColumn: 2,
  gridRow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  '@media (max-width: 1200px)': { gridColumn: 1, gridRow: 2 },
});

export const PdThumbnailHeader = styled(Box)({
  display: 'flex',
  gap: 10,
  marginBottom: 10,
  '@media (max-width: 576px)': { flexDirection: 'column' },
});

export const PdThumbnailTab = styled('button')(({ active }) => ({
  flex: 1,
  padding: 12,
  background: active ? t.primary : 'white',
  border: `1px solid ${active ? t.primary : t.border}`,
  borderRadius: 8,
  color: active ? 'white' : t.textSec,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  fontFamily: 'inherit',
  '&:hover': !active ? { borderColor: t.primary, color: t.primary } : {},
}));

export const PdThumbnailScroll = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 10,
  maxHeight: 240,
  overflowY: 'auto',
  paddingRight: 5,
  '@media (max-width: 1200px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
  '@media (max-width: 992px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
  '@media (max-width: 768px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
  '@media (max-width: 480px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
});

export const PdThumbnailItem = styled(Box)(({ active }) => ({
  borderRadius: 8,
  overflow: 'hidden',
  cursor: 'pointer',
  border: `2px solid ${active ? t.primary : 'transparent'}`,
  transition: 'all 0.3s ease',
  height: 120,
  '& img': { width: '100%', height: '100%', objectFit: 'cover' },
  '&:hover': { transform: 'scale(1.05)' },
  '@media (max-width: 768px)': { height: 90 },
  '@media (max-width: 480px)': { height: 70 },
}));

export const PdNoThumbnails = styled(Box)({ color: t.textSec, fontSize: 14, padding: 12 });

/* ─── Video ──────────────────────────────────────────────── */
export const PdVideoSection = styled(Box)({
  gridColumn: 2,
  gridRow: 2,
  '@media (max-width: 1200px)': { gridColumn: 1, gridRow: 3 },
});

export const PdVideoContainer = styled(Box)({
  // background: 'linear-gradient(135deg, #0d5aa7 0%, #0a4a8c 100%)',
  borderRadius: 16,
  overflow: 'hidden',
  height: 240,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': { transform: 'scale(1.02)' },
});

export const PdVideoPlaceholder = styled(Box)({
  textAlign: 'center',
  color: 'white',
  padding: 20,
  '& span': { display: 'block', fontSize: 16, fontWeight: 600 },
});

/* ─── Main Content ───────────────────────────────────────── */
export const PdMainContent = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: 40,
  '@media (max-width: 1200px)': { gridTemplateColumns: '1fr' },
});

export const PdContentLeft = styled(Box)({});

export const PdNavigation = styled(Box)({
  display: 'flex',
  gap: 20,
  marginBottom: 30,
  borderBottom: `1px solid ${t.border}`,
  paddingBottom: 20,
  '@media (max-width: 768px)': { overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: 10 },
});

export const PdNavTab = styled('button')(({ active }) => ({
  padding: '12px 24px',
  background: 'none',
  border: 'none',
  borderBottom: `3px solid ${active ? t.primary : 'transparent'}`,
  fontSize: 16,
  fontWeight: 600,
  color: active ? t.primary : t.textSec,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontFamily: 'inherit',
  '@media (max-width: 768px)': { padding: '10px 16px', fontSize: 14 },
}));

export const PdContentSections = styled(Box)({});

export const PdSectionContent = styled(Box)({
  marginBottom: 40,
  '& h2': { fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 24 },
  '& h3': { fontSize: 20, fontWeight: 600, color: t.text, margin: '30px 0 20px' },
  '& h4': { fontSize: 16, fontWeight: 600, color: t.text, margin: '16px 0 12px' },
});

/* ─── Property Description ───────────────────────────────── */
export const PdDescSection = styled(Box)({ marginBottom: 24 });

export const PdDescContent = styled(Box)({});

export const PdDescText = styled('p')({
  color: t.textSec,
  lineHeight: 1.7,
  fontSize: 15,
  margin: 0,
  fontFamily: 'inherit',
});

/* ─── Spec Card ──────────────────────────────────────────── */
export const PdSpecCard = styled(Box)({
  background: '#ffffff',
  borderRadius: 20,
  border: `1px solid ${t.border}`,
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  padding: 28,
  marginTop: 50,
  transition: 'all 0.3s ease',
  '&:hover': { boxShadow: '0 8px 30px rgba(0,0,0,0.08)', transform: 'translateY(-2px)' },
  '@media (max-width: 768px)': { padding: 20 },
});

export const PdHeaderTitle = styled(Box)({
  marginBottom: 28,
  paddingBottom: 20,
  borderBottom: '2px solid #F3F4F6',
  '& h3': {
    fontSize: 22,
    fontWeight: 700,
    color: '#111827',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    '&::before': { content: '"🏠"', fontSize: 28 },
  },
});

export const PdSpecGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 28,
  '@media (max-width: 1200px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr', gap: 24 },
});

export const PdSpecColumn = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 24 });

export const PdSpecSection = styled(Box)({
  background: '#F9FAFB',
  borderRadius: 16,
  padding: 20,
  border: `1px solid ${t.border}`,
  transition: 'all 0.3s ease',
  '&:hover': { borderColor: '#3B82F6', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(59,130,246,0.1)' },
});

export const PdSpecSectionTitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 16,
  fontSize: 16,
  fontWeight: 600,
  color: '#374151',
});

export const PdTitleIcon = styled(Box)({
  width: 44,
  height: 44,
  background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  '& span': { fontSize: 24, display: 'block', lineHeight: 1 },
});

export const PdConfigItems = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 10 });

export const PdConfigItem = styled(Box)({
  background: 'white',
  borderRadius: 12,
  padding: '14px 16px',
  border: `1px solid ${t.border}`,
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  '&:hover': { borderColor: '#3B82F6', transform: 'translateY(-1px)', boxShadow: '0 2px 8px rgba(59,130,246,0.1)' },
});

export const PdConfigText = styled('div')({ fontSize: 15, fontWeight: 500, color: '#374151' });

/* ─── Area Details ───────────────────────────────────────── */
export const PdAreaDetails = styled(Box)({
  background: 'white',
  borderRadius: 16,
  padding: 20,
  border: `1px solid ${t.border}`,
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  transition: 'all 0.3s ease',
  '&:hover': { borderColor: '#10B981', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(16,185,129,0.1)' },
});

export const PdAreaItem = styled(Box)({ display: 'flex', alignItems: 'center', gap: 16 });

export const PdAreaIcon = styled(Box)({
  width: 56,
  height: 56,
  background: '#F3F4F6',
  borderRadius: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  '& span': { fontSize: 28 },
});

export const PdAreaLabel = styled('div')({ fontSize: 13, color: '#6B7280', marginBottom: 4, fontWeight: 500 });

export const PdAreaValue = styled('div')({ fontSize: 20, fontWeight: 700, color: '#111827' });

export const PdAreaDivider = styled(Box)({
  height: 1,
  background: 'linear-gradient(90deg, transparent, #E5E7EB, transparent)',
  margin: '0 10px',
});

/* ─── Spec Detail Items ──────────────────────────────────── */
export const PdSpecDetails = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 16 });

export const PdDetailItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: 16,
  background: 'white',
  borderRadius: 14,
  border: `1px solid ${t.border}`,
  transition: 'all 0.2s ease',
  minHeight: 76,
  '&:hover': { borderColor: '#3B82F6', background: '#F8FAFC', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(59,130,246,0.1)' },
});

export const PdDetailIcon = styled(Box)({
  width: 52,
  height: 52,
  borderRadius: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  '& span': { fontSize: 28 },
  '@media (max-width: 768px)': { width: 48, height: 48, '& span': { fontSize: 24 } },
});

export const PdDetailContent = styled(Box)({ flex: 1 });

export const PdDetailLabel = styled('div')({ fontSize: 13, color: '#6B7280', marginBottom: 4, fontWeight: 500 });

export const PdDetailValue = styled('div')({ fontSize: 16, fontWeight: 600, color: '#111827', display: 'flex', alignItems: 'baseline', gap: 4 });

export const PdFurnishingBadge = styled('span')({
  display: 'inline-block',
  padding: '6px 16px',
  background: '#FEF3C7',
  color: '#92400E',
  borderRadius: 20,
  fontSize: 14,
  fontWeight: 600,
  border: '1px solid #FBBF24',
});

/* ─── Floor Plan ─────────────────────────────────────────── */
export const PdFloorPlanSection = styled(Box)({
  margin: '40px 0',
  padding: 30,
  background: 'white',
  border: `1px solid ${t.border}`,
  borderRadius: 16,
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
});

export const PdFloorPlanHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 22,
  flexWrap: 'wrap',
  gap: 12,
  '& h3': { fontSize: 20, fontWeight: 700, margin: 0, color: t.text },
  '@media (max-width: 768px)': { flexDirection: 'column', alignItems: 'flex-start' },
});

export const PdFloorPlanStats = styled(Box)({
  display: 'flex',
  gap: 20,
  background: '#f8fafc',
  padding: '10px 16px',
  borderRadius: 10,
  border: `1px solid ${t.border}`,
  '& span': { fontSize: 14, color: t.textSec, whiteSpace: 'nowrap' },
  '& strong': { fontSize: 15, fontWeight: 700, color: t.primary, marginLeft: 4 },
  '@media (max-width: 768px)': { width: '100%', justifyContent: 'space-between' },
});

export const PdFloorPlanImageWrap = styled(Box)({
  position: 'relative',
  borderRadius: 12,
  overflow: 'hidden',
  border: `1px solid ${t.border}`,
  background: '#f8fafc',
  marginBottom: 30,
  height: 500,
  '@media (max-width: 768px)': { height: 300 },
  '@media (max-width: 480px)': { height: 250 },
});

export const PdFloorPlanImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  background: 'white',
  padding: 20,
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': { transform: 'scale(1.01)' },
});

export const PdFloorPlanOverlay = styled(Box)({
  position: 'absolute',
  bottom: 20,
  right: 20,
  display: 'flex',
  gap: 10,
});

export const PdDownloadBtn = styled('button')({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '8px 16px',
  background: 'white',
  border: `1px solid ${t.border}`,
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.25s ease',
  fontFamily: 'inherit',
  '&:hover': { background: t.primary, color: 'white', borderColor: t.primary },
});

/* ─── Furnishing ─────────────────────────────────────────── */
export const PdFurnishingSection = styled(Box)({ margin: '30px 0' });

export const PdFurnishingCards = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 12,
  '@media (max-width: 992px)': { gridTemplateColumns: '1fr' },
});

export const PdFurnishingCard = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: 12,
  background: 'white',
  borderRadius: 8,
  border: `1px solid ${t.border}`,
  fontWeight: 500,
  '& .check-icon': { color: '#10b981', flexShrink: 0 },
});

/* ─── Society ────────────────────────────────────────────── */
export const PdSocietyHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 20,
  flexWrap: 'wrap',
  gap: 15,
  '@media (max-width: 576px)': { flexDirection: 'column' },
});

export const PdSocietyTitle = styled(Box)({ flex: 1 });

export const PdSectorBadge = styled('span')({
  display: 'inline-block',
  padding: '4px 12px',
  background: t.bg,
  border: `1px solid ${t.border}`,
  borderRadius: 20,
  fontSize: 14,
  fontWeight: 500,
  color: t.textSec,
  marginLeft: 12,
});

export const PdReraBadge = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 16px',
  background: '#dcfce7',
  border: '1px solid #86efac',
  borderRadius: 8,
  color: '#166534',
  fontSize: 14,
  fontWeight: 600,
});

export const PdSocietyAddress = styled('p')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: t.textSec,
  fontSize: 15,
  marginBottom: 24,
  fontFamily: 'inherit',
  '& svg': { color: t.primary },
});

export const PdSocietyStats = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 15,
  margin: '24px 0',
  '@media (max-width: 1200px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const PdStatCard = styled(Box)({
  padding: 20,
  border: '2px solid #95a4b3',
  borderRadius: 12,
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': { transform: 'translateY(-2px)', boxShadow: t.shadow },
});

export const PdStatValue = styled('div')({ fontSize: 24, fontWeight: 700, color: t.primary, marginBottom: 8 });

export const PdStatLabel = styled('div')({
  fontSize: 13,
  color: t.textSec,
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: 1,
});

export const PdDetailGrids = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 15,
  margin: '20px 0',
});

export const PdGridDetailItem = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  background: t.bg,
  borderRadius: 10,
  border: `1px solid ${t.border}`,
});

export const PdGridDetailLabel = styled('span')({ color: t.textSec, fontWeight: 500, fontSize: 14 });

export const PdGridDetailValue = styled('span')({ color: t.text, fontWeight: 600, fontSize: 15 });

/* ─── BHK Configurations ─────────────────────────────────── */
export const PdBhkSection = styled(Box)({
  margin: '30px 0',
  '& h2': { fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${t.border}` },
});

export const PdBhkCardRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 16,
  marginBottom: 24,
  '@media (max-width: 1200px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
  '@media (max-width: 900px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 600px)': { gridTemplateColumns: '1fr' },
});

export const PdBhkCard = styled(Box)(({ active }) => ({
  background: active ? '#eff6ff' : '#ffffff',
  border: `${active ? 2 : 1}px solid ${active ? '#3b82f6' : t.border}`,
  borderRadius: 12,
  padding: 18,
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 160,
  cursor: 'pointer',
  boxShadow: active ? '0 0 0 2px rgba(59,130,246,0.2)' : 'none',
  '&:hover': { borderColor: '#3b82f6', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(59,130,246,0.1)' },
  '@media (max-width: 600px)': { minHeight: 140, padding: 16 },
}));

export const PdBhkHeader = styled(Box)({
  marginBottom: 12,
  '& h3': {
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    '&::before': { content: '"🏠"', fontSize: 16 },
  },
});

export const PdBhkContent = styled(Box)({ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' });

export const PdBhkDetail = styled(Box)({ marginBottom: 12 });

export const PdBhkLabel = styled('span')({ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 4, fontWeight: 500 });

export const PdBhkValue = styled('span')({ display: 'block', fontSize: 16, fontWeight: 600, color: '#111827' });

export const PdLayoutBtn = styled('button')(({ isActive }) => ({
  width: '100%',
  padding: '10px 16px',
  background: isActive ? '#059669' : '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginTop: 8,
  fontFamily: 'inherit',
  '&:hover': { background: isActive ? '#047857' : '#2563eb', transform: 'translateY(-1px)' },
}));

export const PdSelectedLayout = styled(Box)({
  marginTop: 30,
  padding: 24,
  background: '#ffffff',
  borderRadius: 16,
  border: `1px solid ${t.border}`,
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  '@media (max-width: 600px)': { padding: 16 },
});

export const PdLayoutHeader = styled(Box)({
  marginBottom: 24,
  paddingBottom: 16,
  borderBottom: `1px solid ${t.border}`,
  '& h3': {
    fontSize: 20,
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    '&::before': { content: '"📐"', fontSize: 20 },
  },
});

export const PdLayoutPreview = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 24 });

export const PdLayoutImageWrap = styled(Box)({
  width: '100%',
  background: '#f8fafc',
  borderRadius: 12,
  padding: 20,
  border: `1px solid ${t.border}`,
  position: 'relative',
  minHeight: 400,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 900px)': { minHeight: 300, padding: 16 },
  '@media (max-width: 600px)': { minHeight: 250, padding: 12 },
});

export const PdLayoutImage = styled('img')({
  maxWidth: '100%',
  maxHeight: 400,
  objectFit: 'contain',
  borderRadius: 8,
  background: 'white',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  '@media (max-width: 900px)': { maxHeight: 300 },
  '@media (max-width: 600px)': { maxHeight: 250 },
});

export const PdZoomBtn = styled('button')({
  position: 'absolute',
  bottom: 20,
  right: 20,
  padding: '10px 20px',
  background: 'rgba(255,255,255,0.95)',
  border: `1px solid ${t.border}`,
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 500,
  color: '#374151',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  transition: 'all 0.2s ease',
  backdropFilter: 'blur(4px)',
  fontFamily: 'inherit',
  '&:hover': { background: '#3b82f6', color: 'white', borderColor: '#3b82f6', transform: 'translateY(-1px)' },
  '@media (max-width: 600px)': { position: 'relative', bottom: 'auto', right: 'auto', marginTop: 12, width: '100%', justifyContent: 'center' },
});

export const PdNoConfigs = styled('p')({
  textAlign: 'center',
  padding: 20,
  color: '#9ca3af',
  fontStyle: 'italic',
  background: '#f9fafb',
  borderRadius: 8,
  border: '1px dashed #d1d5db',
  fontFamily: 'inherit',
});

/* ─── Amenities ──────────────────────────────────────────── */
export const PdSectionCard = styled(Box)({
  background: 'white',
  borderRadius: 12,
  padding: '1.5rem',
  marginBottom: '1.5rem',
  border: `1px solid ${t.border}`,
  '& h2': { fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: t.text },
});

export const PdAmenitiesCategory = styled(Box)({
  marginBottom: 24,
  '&:last-child': { marginBottom: 0 },
  '& h4': { fontSize: '1.1rem', fontWeight: 600, margin: '1.5rem 0 1rem', color: t.textSec },
  '&:first-of-type h4': { marginTop: 0 },
});

export const PdAmenitiesGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '1rem',
});

export const PdAmenityItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  background: '#f8fafc',
  borderRadius: 8,
  transition: 'all 0.3s ease',
  textAlign: 'center',
  '&:hover': { transform: 'translateY(-2px)', boxShadow: t.shadow },
});

export const PdAmenityIcon = styled(Box)({
  fontSize: '1.5rem',
  color: '#3b82f6',
  marginBottom: '0.5rem',
  '& svg': { width: '1.5rem', height: '1.5rem' },
});

export const PdAmenityName = styled('span')({ fontSize: 14, color: t.textSec, fontWeight: 500 });

/* ─── Nearby Facilities ──────────────────────────────────── */
export const PdNearbyFacilities = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
  margin: '24px 0',
  '@media (max-width: 992px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const PdFacilityCategory = styled(Box)({
  background: 'white',
  border: `1px solid ${t.border}`,
  borderRadius: 12,
  padding: 20,
  '& h4': { display: 'flex', alignItems: 'center', gap: 8, marginTop: 0, marginBottom: 16 },
  '& ul': { listStyle: 'none', padding: 0, margin: 0 },
  '& li': { padding: '8px 0', borderBottom: `1px solid ${t.border}`, color: t.text, fontSize: 14 },
  '& li:last-child': { borderBottom: 'none' },
});

/* ─── Flags ──────────────────────────────────────────────── */
export const PdFlagsSection = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 24,
  margin: '24px 0',
  '@media (max-width: 992px)': { gridTemplateColumns: '1fr' },
});

export const PdGreenFlags = styled(Box)({
  padding: 20,
  borderRadius: 12,
  background: '#f0fdf4',
  border: '1px solid #86efac',
  '& h4': { margin: '0 0 16px' },
});

export const PdRedFlags = styled(Box)({
  padding: 20,
  borderRadius: 12,
  background: '#fef2f2',
  border: '1px solid #fca5a5',
  '& h4': { margin: '0 0 16px' },
});

export const PdFlagsList = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 12 });

export const PdFlagItem = styled(Box)({ display: 'flex', alignItems: 'center', gap: 10, '& svg': { flexShrink: 0 } });

/* ─── Additional Info ────────────────────────────────────── */
export const PdAdditionalInfos = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 15,
  margin: '20px 0',
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const PdInfoItem = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 12,
  background: t.bg,
  borderRadius: 8,
  border: `1px solid ${t.border}`,
});

export const PdInfoLabel = styled('span')({ color: t.textSec, fontWeight: 500, fontSize: 14 });

export const PdInfoValue = styled('span')({ color: t.text, fontWeight: 600, fontSize: 15 });

/* ─── Right Sidebar ──────────────────────────────────────── */
export const PdContentRight = styled(Box)({
  position: 'sticky',
  top: 20,
  height: 'fit-content',
  '@media (max-width: 1200px)': { position: 'static' },
});

export const PdPriceCard = styled(Box)({
  position: 'relative',
  background: 'linear-gradient(145deg, #0d5aa7 0%, #083f7a 60%, #051f40 100%)',
  borderRadius: 20,
  padding: '32px 28px 28px',
  color: 'white',
  marginBottom: 20,
  overflow: 'hidden',
  boxShadow: '0 20px 50px rgba(13,90,167,0.35)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.05)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -40,
    left: -40,
    width: 150,
    height: 150,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)',
    pointerEvents: 'none',
  },
  '@media (max-width: 480px)': { padding: '24px 20px 20px' },
});

export const PdPriceDisplay = styled(Box)({
  position: 'relative',
  zIndex: 1,
  marginBottom: 20,
  paddingBottom: 20,
  borderBottom: '1px solid rgba(255,255,255,0.15)',
});

export const PdPriceLabel = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.65)',
  marginBottom: 10,
  background: 'rgba(255,255,255,0.1)',
  padding: '4px 10px',
  borderRadius: 20,
  border: '1px solid rgba(255,255,255,0.15)',
});

export const PdPriceValue = styled('div')({
  fontSize: 38,
  fontWeight: 800,
  lineHeight: 1.1,
  color: 'white',
  letterSpacing: '-0.02em',
  textShadow: '0 2px 12px rgba(0,0,0,0.2)',
  '@media (max-width: 480px)': { fontSize: 30 },
});

export const PdPriceDetails = styled(Box)({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const PdPriceDetail = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: 13,
  padding: '8px 12px',
  background: 'rgba(255,255,255,0.08)',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.1)',
  '& span:first-of-type': { color: 'rgba(255,255,255,0.7)', fontWeight: 500 },
  '& span:last-of-type': { color: 'white', fontWeight: 700, fontSize: 14 },
});

export const PdContactButtons = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 });

export const PdCallBtn = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  padding: 18,
  border: 'none',
  borderRadius: 12,
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
  background: '#10b981',
  color: 'white',
  transition: 'all 0.3s ease',
  fontFamily: 'inherit',
  '&:hover': { background: '#0da871', transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(16,185,129,0.3)' },
});

export const PdWhatsappBtn = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  padding: 18,
  border: 'none',
  borderRadius: 12,
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
  background: '#25D366',
  color: 'white',
  transition: 'all 0.3s ease',
  fontFamily: 'inherit',
  '&:hover': { background: '#1da851', transform: 'translateY(-2px)', boxShadow: '0 8px 20px rgba(37,211,102,0.3)' },
});

export const PdCallModal = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: 20,
});

export const PdModalContent = styled(Box)({
  background: 'white',
  borderRadius: 20,
  padding: 40,
  maxWidth: 500,
  width: '100%',
  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
  '& h3': { fontSize: 24, fontWeight: 700, color: t.text, marginBottom: 30, textAlign: 'center' },
  '@media (max-width: 576px)': { padding: 20 },
});

export const PdFormGroup = styled(Box)({
  marginBottom: 20,
  '& label': { display: 'block', fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 8 },
  '& input': {
    width: '100%',
    padding: 14,
    border: `2px solid ${t.border}`,
    borderRadius: 10,
    fontSize: 16,
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    '&:focus': { outline: 'none', borderColor: t.primary },
  },
});

export const PdFormActions = styled(Box)({ display: 'flex', gap: 12, marginTop: 30 });

export const PdSubmitBtn = styled('button')({
  flex: 1,
  padding: 16,
  borderRadius: 10,
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.3s ease',
  background: t.primary,
  color: 'white',
  fontFamily: 'inherit',
  '&:hover': { background: t.primaryDark, transform: 'translateY(-2px)' },
});

export const PdCancelBtn = styled('button')({
  flex: 1,
  padding: 16,
  borderRadius: 10,
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
  background: t.bg,
  color: t.textSec,
  border: `2px solid ${t.border}`,
  transition: 'all 0.3s ease',
  fontFamily: 'inherit',
  '&:hover': { background: 'white', borderColor: t.textSec },
});

export const PdHighlightsCard = styled(Box)({
  background: 'white',
  borderRadius: 16,
  padding: 24,
  border: `1px solid ${t.border}`,
  boxShadow: t.shadow,
  marginBottom: 20,
  '& h3': { fontSize: 18, fontWeight: 700, color: t.text, marginBottom: 20, display: 'flex', alignItems: 'center' },
});

export const PdHighlightItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 0',
  borderBottom: `1px solid ${t.border}`,
  '&:last-child': { borderBottom: 'none' },
  '& span': { fontWeight: 500, color: t.text },
});

export const PdSocietyDescSection = styled(Box)({ marginBottom: 20 });
