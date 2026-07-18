// src/components/NewlyLaunch/PropertyStyles.js
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const t = {
  primary: '#2da2c2',
  primaryDark: '#1f7a94',
  primaryLight: '#6ec3e0',
  secondary: '#ffcf51',
  secondaryDark: '#e5b229',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  text: '#1e293b',
  textSec: '#64748b',
  textLight: '#94a3b8',
  bg: '#ffffff',
  bgSec: '#f8fafc',
  border: '#e2e8f0',
  shadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  shadowSm: '0 1px 2px 0 rgba(0,0,0,0.05)',
  shadowLg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
  shadowXl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
};

export const PrContainer = styled(Box)({
  maxWidth: 1440,
  margin: '0 auto',
  padding: '80px 1.5rem 1.5rem',
  position: 'relative',
  '@media (max-width: 768px)': { padding: '1rem' },
});

export const PrLoadingBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 400,
  textAlign: 'center',
  padding: '40px 20px',
  color: t.textSec,
});

export const PrErrorBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 400,
  textAlign: 'center',
  padding: '40px 20px',
  '& h2': { color: '#e53e3e', marginBottom: 20 },
});

export const PrBackBtn = styled('button')({
  position: 'relative',
  margin: '10px 0 5px 20px',
  padding: '8px 16px',
  color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  border: 'none',
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 500,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  zIndex: 100,
  background: 'none',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
  },
  '&:active': { transform: 'translateY(0)' },
});

export const PrHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '4rem',
  padding: '0 0.5rem',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-start',
    marginTop: '2rem',
  },
});

export const PrTitle = styled(Typography)({
  fontSize: '2.25rem',
  fontWeight: 680,
  color: 'black',
  letterSpacing: '-0.02em',
  marginTop: -65,
  '@media (max-width: 768px)': { fontSize: '1.75rem' },
  '@media (max-width: 480px)': { fontSize: '1.5rem' },
});

/* ─── CAROUSEL ─────────────────────────────────────────────── */
export const PrMediaSection = styled('section')({});

export const PrCarouselWrapper = styled(Box)({
  display: 'flex',
  gap: 12,
  height: 550,
  '@media (max-width: 768px)': { height: 350 },
  '@media (max-width: 480px)': { height: 250 },
});

export const PrCarouselMain = styled(Box)({
  position: 'relative',
  flex: 1,
  borderRadius: 12,
  overflow: 'hidden',
});

export const PrCarouselSlide = styled(Box)(({ active }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: active ? 1 : 0,
  transition: 'opacity 0.4s ease',
}));

export const PrCarouselMedia = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const PrCarouselVideo = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const PrCarouselBtn = styled('button')(({ pos }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  ...(pos === 'prev' ? { left: 15 } : { right: 15 }),
  width: 45,
  height: 45,
  background: 'white',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  zIndex: 10,
  fontSize: '1.2rem',
  '@media (max-width: 768px)': { width: 36, height: 36, fontSize: '1rem' },
}));

export const PrCarouselCounter = styled(Box)({
  position: 'absolute',
  bottom: 15,
  right: 15,
  background: 'rgba(0,0,0,0.6)',
  color: 'white',
  padding: '5px 10px',
  borderRadius: 15,
  fontSize: '0.85rem',
});

export const PrThumbsWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const PrThumbScrollBtn = styled('button')({
  width: '100%',
  border: 'none',
  background: '#eee',
  cursor: 'pointer',
  padding: 5,
  '&:hover': { background: '#ddd' },
});

export const PrThumbnails = styled(Box)({
  width: 120,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  overflowY: 'auto',
  maxHeight: '100%',
  paddingRight: 5,
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
});

export const PrThumbnail = styled(Box)(({ active }) => ({
  minHeight: 80,
  height: 80,
  flexShrink: 0,
  borderRadius: 10,
  overflow: 'hidden',
  cursor: 'pointer',
  opacity: active ? 1 : 0.6,
  border: `2px solid ${active ? 'orange' : 'transparent'}`,
  transition: 'all 0.3s ease',
  '& img, & video': { width: '100%', height: '100%', objectFit: 'cover' },
}));

/* ─── MAIN GRID ─────────────────────────────────────────────── */
export const PrMain = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 380px',
  gap: '2rem',
  '@media (max-width: 1200px)': { gridTemplateColumns: '1fr 320px' },
  '@media (max-width: 1024px)': { gridTemplateColumns: '1fr' },
});

export const PrLeftSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const PrRightSection = styled('aside')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  position: 'sticky',
  top: 20,
  height: 'fit-content',
  marginTop: 30,
  '@media (max-width: 1024px)': {
    position: 'static',
    width: '100%',
    maxWidth: 500,
    margin: '0 auto',
  },
});

export const PrSectionCard = styled(Box)({
  background: t.bg,
  borderRadius: 16,
  padding: '1.75rem',
  boxShadow: t.shadow,
  border: `1px solid ${t.border}`,
  transition: 'all 0.3s ease',
  marginTop: 30,
  '&:hover': { boxShadow: t.shadowLg, borderColor: t.primary },
  '@media (max-width: 480px)': { padding: '1rem' },
});

export const PrSectionTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '1.5rem',
  color: t.primaryDark,
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  borderBottom: `2px solid ${t.border}`,
  paddingBottom: '0.75rem',
  '& svg': { color: t.secondary },
});

/* ─── HIGHLIGHTS ────────────────────────────────────────────── */
export const PrHighlightsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '1.25rem',
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const PrHighlightItem = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
  padding: '1rem',
  background: t.bgSec,
  borderRadius: 12,
  transition: 'all 0.3s ease',
  '&:hover': { background: 'white', boxShadow: t.shadow, transform: 'translateY(-2px)' },
});

/* ─── STATS OVERVIEW ────────────────────────────────────────── */
export const PrStatsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1rem',
  '@media (max-width: 1024px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const PrStatCard = styled(Box)({
  background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
  padding: '1.25rem 1rem',
  borderRadius: 12,
  textAlign: 'center',
  border: `1px solid ${t.border}`,
  boxShadow: t.shadowSm,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
  },
});

export const PrStatLabel = styled(Box)({
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: t.textSec,
  marginBottom: '0.25rem',
});

export const PrStatValue = styled(Box)({
  fontSize: '1.1rem',
  fontWeight: 700,
  color: t.primaryDark,
});

/* ─── BHK TABS ──────────────────────────────────────────────── */
export const PrBhkTabs = styled(Box)({
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '1.5rem',
  flexWrap: 'wrap',
});

export const PrBhkTab = styled('button')(({ active }) => ({
  padding: '0.75rem 1.5rem',
  background: active ? t.primary : t.bgSec,
  border: `1px solid ${active ? t.primary : t.border}`,
  borderRadius: 30,
  fontWeight: 600,
  color: active ? 'white' : t.textSec,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: active ? t.shadow : 'none',
  '&:hover': { background: t.primary, color: 'white', borderColor: t.primary },
}));

/* ─── LAYOUT CARDS ──────────────────────────────────────────── */
export const PrLayoutGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1.5rem',
  '@media (max-width: 1024px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const PrLayoutCard = styled(Box)(({ active }) => ({
  background: t.bg,
  border: `${active ? 2 : 1}px solid ${active ? t.primary : t.border}`,
  borderRadius: 12,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: active ? t.shadowLg : 'none',
  '&:hover': { transform: 'translateY(-4px)', boxShadow: t.shadowLg, borderColor: t.primary },
  '&:hover img': { transform: 'scale(1.05)' },
}));

export const PrLayoutCardImg = styled(Box)({
  position: 'relative',
  height: 160,
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    pointerEvents: 'none',
  },
});

export const PrViewLayoutBtn = styled('button')({
  position: 'absolute',
  bottom: 10,
  right: 10,
  zIndex: 2,
  background: 'rgba(0,0,0,0.7)',
  color: 'white',
  border: 'none',
  borderRadius: 20,
  padding: '0.5rem 1rem',
  fontSize: '0.8rem',
  cursor: 'pointer',
  backdropFilter: 'blur(4px)',
  transition: 'all 0.3s ease',
  '&:hover': { background: t.primary },
});

export const PrLayoutCardDetails = styled(Box)({
  padding: '1rem',
  '& h4': { fontSize: '1rem', marginBottom: '0.5rem', color: t.primaryDark },
});

export const PrLayoutArea = styled(Box)({
  fontSize: '0.9rem',
  color: t.textSec,
  marginBottom: '0.25rem',
});

export const PrLayoutPrice = styled(Box)({
  fontSize: '0.9rem',
  color: t.textSec,
});

/* ─── LAYOUT MODAL ──────────────────────────────────────────── */
export const PrLayoutModalOverlay = styled(Box)({
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
});

export const PrLayoutModal = styled(Box)({
  position: 'relative',
  background: '#fff',
  borderRadius: 8,
  maxWidth: '90%',
  maxHeight: '90%',
  padding: 10,
  '& img': { maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' },
});

export const PrLayoutModalClose = styled('button')({
  position: 'absolute',
  top: 8,
  right: 8,
  background: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: 28,
  height: 28,
  cursor: 'pointer',
  fontSize: '0.9rem',
});

/* ─── CURRENT PHASE ─────────────────────────────────────────── */
export const PrCurrentPhase = styled(Box)({
  background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 100%)`,
  color: 'white',
  borderRadius: 16,
  padding: '1.75rem',
  boxShadow: t.shadow,
  border: `1px solid ${t.border}`,
  marginTop: 30,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,207,81,0.1) 0%, transparent 70%)',
    animation: 'prRotate 20s linear infinite',
  },
  '@keyframes prRotate': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
  '@media (max-width: 480px)': { padding: '1rem' },
});

export const PrPhaseSectionTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '1.5rem',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  borderBottom: '2px solid rgba(255,255,255,0.2)',
  paddingBottom: '0.75rem',
  position: 'relative',
  zIndex: 1,
  '& svg': { color: t.secondary },
});

export const PrPhaseContent = styled(Box)({ position: 'relative', zIndex: 1 });

export const PrPhaseStatsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1rem',
  marginBottom: '2rem',
  '@media (max-width: 1024px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const PrPhaseStat = styled(Box)({
  background: 'rgba(255,255,255,0.15)',
  padding: '1rem',
  borderRadius: 12,
  backdropFilter: 'blur(4px)',
  textAlign: 'center',
  border: '1px solid rgba(255,255,255,0.2)',
  '& span:first-of-type': {
    display: 'block',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    opacity: 0.9,
    marginBottom: '0.5rem',
  },
  '& span:last-of-type': {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: 700,
  },
});

export const PrSubsectionTitle = styled(Typography)({
  fontSize: '1.2rem',
  fontWeight: 600,
  margin: '1.5rem 0 1rem',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  position: 'relative',
  zIndex: 1,
});

export const PrTableResponsive = styled(Box)({
  overflowX: 'auto',
  marginBottom: '1.5rem',
  borderRadius: 12,
  position: 'relative',
  zIndex: 1,
});

export const PrPaymentTable = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  background: 'rgba(255,255,255,0.95)',
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: t.shadowLg,
  '& th': {
    background: t.secondary,
    color: t.primaryDark,
    fontWeight: 700,
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.9rem',
  },
  '& td': {
    padding: '1rem',
    borderBottom: `1px solid ${t.border}`,
    color: t.text,
  },
  '& tr:last-child td': { borderBottom: 'none' },
  '& tr:hover td': { background: 'rgba(45,162,194,0.1)' },
  '@media (max-width: 480px)': {
    '& th, & td': { padding: '0.5rem' },
    fontSize: '0.8rem',
  },
});

export const PrOffersGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
  position: 'relative',
  zIndex: 1,
  '@media (max-width: 1024px)': { gridTemplateColumns: '1fr' },
});

export const PrOfferCard = styled(Box)({
  background: 'rgba(255,255,255,0.95)',
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: t.shadow,
  backdropFilter: 'blur(4px)',
});

export const PrOfferHeader = styled(Box)({
  background: t.secondary,
  padding: '0.75rem',
  textAlign: 'center',
  '& span': { color: t.primaryDark, fontWeight: 700, fontSize: '1rem' },
});

export const PrOfferTable = styled('table')({
  width: '100%',
  '& td': {
    padding: '0.75rem',
    borderBottom: `1px solid ${t.border}`,
    color: t.text,
    fontSize: '0.9rem',
  },
  '& td:first-of-type': {
    fontWeight: 600,
    color: t.primaryDark,
    background: 'rgba(45,162,194,0.05)',
  },
  '& tr:last-child td': { borderBottom: 'none' },
});

export const PrMaintenanceSection = styled(Box)({ marginTop: '1rem' });

export const PrMaintenanceTableContainer = styled(Box)({
  overflowX: 'auto',
  borderRadius: 12,
  boxShadow: t.shadow,
});

export const PrMaintenanceTable = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  background: 'white',
  fontSize: '0.9rem',
  minWidth: 800,
  '& th': {
    background: t.secondary,
    color: t.primaryDark,
    fontWeight: 600,
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  '& td': {
    padding: '1rem',
    borderBottom: `1px solid ${t.border}`,
    color: t.text,
  },
  '& td:first-of-type': { fontWeight: 600, color: t.primaryDark },
  '& tbody tr:hover td': { background: 'rgba(45,162,194,0.05)' },
  '& tbody tr:last-child td': { borderBottom: 'none' },
  '@media (max-width: 768px)': {
    fontSize: '0.8rem',
    '& th, & td': { padding: '0.75rem' },
  },
});

/* ─── AMENITIES ─────────────────────────────────────────────── */
export const PrAmenitiesCategories = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const PrAmenityCategory = styled(Box)({
  background: t.bgSec,
  borderRadius: 12,
  padding: '1.25rem',
});

export const PrCategoryTitle = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '1rem',
  fontSize: '1.1rem',
  fontWeight: 600,
  color: t.primaryDark,
  '& svg': { color: t.secondary },
});

export const PrSubCategories = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
  marginBottom: '1.5rem',
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const PrSubCategory = styled(Box)({
  background: 'white',
  borderRadius: 12,
  padding: '1rem',
  '& h4': {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: t.primary,
    marginBottom: '0.75rem',
    paddingBottom: '0.5rem',
    borderBottom: `2px solid ${t.secondary}`,
  },
});

export const PrAmenitiesMiniGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '0.5rem',
});

export const PrAmenityMiniItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.85rem',
  padding: '0.25rem 0',
  '& i': { color: t.primary, fontSize: '0.8rem' },
});

/* ─── NEARBY FACILITIES ─────────────────────────────────────── */
export const PrFacilitiesGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem',
});

export const PrFacilityCard = styled(Box)({
  padding: '1.5rem',
  background: t.bgSec,
  borderRadius: 12,
  border: `1px solid ${t.border}`,
});

export const PrFacilityHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '1rem',
  color: t.primary,
  fontSize: '1.1rem',
  '& i': { color: t.secondary },
});

export const PrFacilityList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  '& li': {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem 0',
    borderBottom: `1px solid ${t.border}`,
    '&:last-child': { borderBottom: 'none' },
  },
});

export const PrPlaceName = styled('span')({ fontWeight: 500, color: t.text });

export const PrPlaceDistance = styled('span')({
  color: t.textSec,
  fontWeight: 600,
  fontSize: '0.9rem',
});

/* ─── FLAGS SECTION ─────────────────────────────────────────── */
export const PrFlagsSection = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1.5rem',
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
});

export const PrGreenFlags = styled(Box)({
  padding: '1.5rem',
  borderRadius: 12,
  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
  border: '1px solid #bbf7d0',
  '& h3': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
    fontSize: '1.2rem',
    color: t.primaryDark,
    '& i': { color: '#10b981' },
  },
  '& ul': { listStyle: 'none', padding: 0 },
  '& li': {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    marginBottom: '0.75rem',
    fontSize: '0.95rem',
    lineHeight: 1.4,
    '& i': { color: '#10b981', marginTop: '0.2rem' },
  },
});

export const PrRedFlags = styled(Box)({
  padding: '1.5rem',
  borderRadius: 12,
  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
  border: '1px solid #fecaca',
  '& h3': {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
    fontSize: '1.2rem',
    color: t.primaryDark,
    '& i': { color: '#ef4444' },
  },
  '& ul': { listStyle: 'none', padding: 0 },
  '& li': {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    marginBottom: '0.75rem',
    fontSize: '0.95rem',
    lineHeight: 1.4,
    '& i': { color: '#ef4444', marginTop: '0.2rem' },
  },
});

/* ─── ADDITIONAL INFO ───────────────────────────────────────── */
export const PrInfoGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '1rem',
  marginTop: '1rem',
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
  '@media (max-width: 480px)': { gridTemplateColumns: '1fr' },
});

export const PrInfoItem = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.75rem',
  padding: '1rem',
  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
  borderRadius: 12,
  fontSize: '0.95rem',
  border: '1px solid rgba(0,0,0,0.05)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
  transition: 'all 0.2s ease',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  '& span': {
    flex: '0 0 100px',
    fontWeight: 600,
    color: t.primaryDark,
    fontSize: '0.9rem',
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
  },
  '& strong': {
    flex: 1,
    color: t.text,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    lineHeight: 1.5,
    fontWeight: 500,
  },
  '@media (max-width: 480px)': {
    flexDirection: 'column',
    '& span': { flex: 'none', width: '100%' },
    '& strong': { maxWidth: '100%', width: '100%' },
  },
});

/* ─── RIGHT SIDEBAR ─────────────────────────────────────────── */
export const PrPriceCard = styled(Box)({
  background: `linear-gradient(135deg, ${t.primary} 0%, ${t.primaryDark} 100%)`,
  borderRadius: 12,
  padding: '1.5rem',
  color: 'white',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,207,81,0.2) 0%, transparent 70%)',
    animation: 'prRotate 20s linear infinite',
  },
});

export const PrPriceBadge = styled(Box)({
  display: 'inline-block',
  padding: '0.25rem 1rem',
  background: 'rgba(255,255,255,0.2)',
  borderRadius: 20,
  fontSize: '0.8rem',
  marginBottom: '1rem',
  position: 'relative',
  zIndex: 1,
});

export const PrPriceValue = styled(Box)({
  fontSize: '2rem',
  fontWeight: 800,
  marginBottom: '0.5rem',
  letterSpacing: '-0.02em',
  position: 'relative',
  zIndex: 1,
});

export const PrPriceSub = styled(Box)({
  fontSize: '0.8rem',
  opacity: 0.8,
  position: 'relative',
  zIndex: 1,
});

export const PrHighlightsCard = styled(Box)({
  background: t.bg,
  borderRadius: 12,
  padding: '1.5rem',
  boxShadow: t.shadow,
  border: `1px solid ${t.border}`,
  '& h3': {
    color: t.primaryDark,
    marginBottom: '1rem',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
});

export const PrApartmentHighlightItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.75rem 0',
  borderBottom: `1px solid ${t.border}`,
  '&:last-child': { borderBottom: 'none' },
  '& svg': { color: t.secondary, flexShrink: 0 },
});

export const PrContactButtons = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

export const PrContactBtn = styled('button')(({ btntype }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.75rem',
  padding: '1rem',
  border: 'none',
  borderRadius: 12,
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  ...(btntype === 'whatsapp'
    ? {
        background: '#25D366',
        color: 'white',
        '&:hover': { background: '#128C7E', transform: 'translateY(-2px)', boxShadow: t.shadow },
      }
    : {
        background: t.primary,
        color: 'white',
        '&:hover': { background: t.primaryDark, transform: 'translateY(-2px)', boxShadow: t.shadow },
      }),
}));

/* ─── CALL FORM MODAL ───────────────────────────────────────── */
export const PrCallFormModal = styled(Box)({
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
  padding: '1rem',
  backdropFilter: 'blur(4px)',
});

export const PrModalContent = styled(Box)({
  background: 'white',
  borderRadius: 16,
  padding: '2rem',
  maxWidth: 400,
  width: '100%',
  position: 'relative',
  '& h3': { color: t.primaryDark, marginBottom: '1.5rem', fontSize: '1.5rem' },
});

export const PrModalClose = styled('button')({
  position: 'absolute',
  top: 10,
  right: 10,
  width: 40,
  height: 40,
  background: 'rgba(0,0,0,0.5)',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  fontSize: '1.5rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': { background: '#ef4444', transform: 'rotate(90deg)' },
});

export const PrFormGroup = styled(Box)({
  marginBottom: '1rem',
  '& label': { display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: t.text },
  '& input': {
    width: '100%',
    padding: '0.75rem',
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
    '&:focus': {
      borderColor: t.primary,
      boxShadow: 'none',
    },
  },
});

export const PrSubmitBtn = styled('button')({
  width: '100%',
  padding: '1rem',
  background: t.primary,
  color: 'white',
  border: 'none',
  borderRadius: 12,
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginTop: '1rem',
  '&:hover': { background: t.primaryDark, transform: 'translateY(-2px)', boxShadow: t.shadow },
});
