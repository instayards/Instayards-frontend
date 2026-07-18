import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const t = {
  primary: '#0d5aa7', primaryDark: '#0a4a8c', primaryLight: '#e8f1fb',
  sidebar: '#0f1f3d', sidebarHover: '#1a3260', sidebarActive: '#0d5aa7',
  text: '#1e293b', textSec: '#64748b', bg: '#f1f5f9', bgWhite: '#ffffff',
  border: '#e2e8f0', success: '#10b981', warning: '#f59e0b', danger: '#ef4444',
  shadow: '0 1px 3px rgba(0,0,0,0.1)',
};

export const AgShell = styled(Box)({
  display: 'flex', minHeight: '100vh', background: t.bg,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
});

export const AgSidebar = styled(Box)(({ open }) => ({
  width: 260, flexShrink: 0, background: t.sidebar, color: 'white',
  display: 'flex', flexDirection: 'column', position: 'fixed',
  top: 0, left: 0, height: '100vh', zIndex: 100,
  transition: 'transform 0.3s ease',
  '@media (max-width: 768px)': {
    transform: open ? 'translateX(0)' : 'translateX(-100%)',
  },
}));

export const AgSidebarOverlay = styled(Box)(({ open }) => ({
  display: 'none',
  '@media (max-width: 768px)': {
    display: open ? 'block' : 'none',
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99,
  },
}));

export const AgLogoBox = styled(Box)({
  padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)',
  display: 'flex', alignItems: 'center', gap: 12,
});

export const AgLogoText = styled(Typography)({
  fontSize: 20, fontWeight: 800, color: 'white', letterSpacing: '-0.5px',
  '& span': { color: '#ffcf51' },
});

export const AgLogoSub = styled(Typography)({
  fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1,
});

export const AgNav = styled('nav')({
  flex: 1, padding: '16px 12px', overflowY: 'auto',
});

export const AgNavSection = styled(Box)({
  marginBottom: 24,
});

export const AgNavLabel = styled(Typography)({
  fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
  textTransform: 'uppercase', letterSpacing: 1.5, padding: '0 8px', marginBottom: 6,
});

export const AgNavLink = styled(NavLink)({
  display: 'flex', alignItems: 'center', gap: 12,
  padding: '10px 12px', borderRadius: 8, color: 'rgba(255,255,255,0.7)',
  textDecoration: 'none', fontSize: 14, fontWeight: 500,
  transition: 'all 0.2s ease', marginBottom: 2,
  '& svg': { fontSize: 18, flexShrink: 0 },
  '&:hover': { background: t.sidebarHover, color: 'white' },
  '&.active': { background: t.sidebarActive, color: 'white', fontWeight: 600 },
});

export const AgLogoutBtn = styled('button')({
  display: 'flex', alignItems: 'center', gap: 12,
  padding: '10px 12px', borderRadius: 8, color: 'rgba(255,255,255,0.6)',
  background: 'none', border: 'none', fontSize: 14, fontWeight: 500,
  cursor: 'pointer', width: '100%', transition: 'all 0.2s ease',
  '& svg': { fontSize: 18 },
  '&:hover': { background: 'rgba(239,68,68,0.15)', color: '#ef4444' },
});

export const AgSidebarFooter = styled(Box)({
  padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)',
});

export const AgMain = styled(Box)({
  flex: 1, marginLeft: 260, display: 'flex', flexDirection: 'column', minHeight: '100vh',
  '@media (max-width: 768px)': { marginLeft: 0 },
});

export const AgTopbar = styled(Box)({
  height: 64, background: t.bgWhite, borderBottom: `1px solid ${t.border}`,
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '0 24px', position: 'sticky', top: 0, zIndex: 50,
  boxShadow: t.shadow,
});

export const AgTopbarLeft = styled(Box)({
  display: 'flex', alignItems: 'center', gap: 12,
});

export const AgHamburger = styled('button')({
  display: 'none', background: 'none', border: 'none', cursor: 'pointer',
  fontSize: 22, color: t.text, padding: 4, borderRadius: 6,
  '&:hover': { background: t.bg },
  '@media (max-width: 768px)': { display: 'flex', alignItems: 'center' },
});

export const AgPageTitle = styled(Typography)({
  fontSize: 18, fontWeight: 700, color: t.text,
});

export const AgTopbarRight = styled(Box)({
  display: 'flex', alignItems: 'center', gap: 12,
});

export const AgAgentBadge = styled(Box)({
  display: 'flex', alignItems: 'center', gap: 10,
  padding: '6px 12px', background: t.primaryLight, borderRadius: 8,
});

export const AgAgentAvatar = styled(Box)({
  width: 32, height: 32, borderRadius: '50%', background: t.primary,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'white', fontWeight: 700, fontSize: 13,
});

export const AgAgentName = styled(Typography)({
  fontSize: 13, fontWeight: 600, color: t.primary,
  '@media (max-width: 480px)': { display: 'none' },
});

export const AgContent = styled(Box)({
  flex: 1, padding: '24px', overflowY: 'auto',
  '@media (max-width: 576px)': { padding: 16 },
});
