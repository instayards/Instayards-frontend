// src/components/Navbar/NavbarStyles.js
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const t = {
  primary: '#1f7a94',
  primaryHover: '#1f7a94',
  text: '#1e293b',
  textSec: '#64748b',
  bg: '#ffffff',
  bgLight: '#f8fafc',
  border: '#e2e8f0',
  shadow: '0 1px 3px rgba(0,0,0,0.12)',
  shadowMd: '0 4px 6px -1px rgba(0,0,0,0.1)',
};

export const NavRoot = styled('nav')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  background: t.bg,
  boxShadow: t.shadow,
  borderBottom: `1px solid ${t.border}`,
  zIndex: 1000,
  fontFamily: "'Inter', sans-serif",
});

export const NavContainer = styled(Box)({
  maxWidth: 1400,
  margin: '0 auto',
  padding: '0 20px',
  height: 70,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media (max-width: 768px)': { height: 65, padding: '0 16px', marginTop: 5 },
});

export const NavLogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  textDecoration: 'none',
});

export const NavLogoImg = styled('img')({
  height: 40,
  '@media (max-width: 768px)': { height: 32 },
});

export const NavLogoText = styled('span')({
  fontSize: 22,
  fontWeight: 700,
  color: t.text,
  '@media (max-width: 768px)': { fontSize: 18 },
});

export const NavLinks = styled(Box)({
  display: 'flex',
  gap: 30,
  alignItems: 'center',
  '@media (max-width: 900px)': { display: 'none' },
});

export const NavLinkItem = styled(Link)(({ active }) => ({
  textDecoration: 'none',
  color: active ? t.primary : t.text,
  fontSize: 15,
  fontWeight: 600,
  position: 'relative',
  padding: '6px 0',
  transition: 'color 0.3s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -4,
    left: 0,
    width: '100%',
    height: 2,
    background: t.primary,
    opacity: active ? 1 : 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    color: t.primary,
    '&::after': { opacity: 1 },
  },
}));

/* ─── Desktop Hamburg Dropdown ───────────────────────────── */
export const HamburgDesktop = styled(Box)({
  position: 'relative',
  '@media (max-width: 900px)': { display: 'none' },
});

export const HamburgDropdown = styled(Box)({
  position: 'relative',
  '&:hover .hamburg-dropdown-content': {
    opacity: 1,
    visibility: 'visible',
    transform: 'translateY(0)',
  },
});

export const HamburgBtn = styled('button')({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 6,
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: t.text,
  transition: 'background 0.3s ease',
  '&:hover': { background: t.bgLight },
});

export const HamburgDropdownContent = styled(Box)({
  position: 'absolute',
  right: 0,
  top: '110%',
  background: t.bg,
  minWidth: 200,
  borderRadius: 10,
  boxShadow: t.shadowMd,
  border: `1px solid ${t.border}`,
  padding: '10px 0',
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(10px)',
  transition: 'all 0.3s ease',
  zIndex: 100,
});

export const HamburgItem = styled(Link)({
  display: 'block',
  padding: '12px 20px',
  textDecoration: 'none',
  color: t.text,
  fontSize: 14,
  fontWeight: 500,
  transition: 'all 0.3s ease',
  '&:hover': { background: t.bgLight, color: t.primary, paddingLeft: 26 },
});

/* ─── Agent Buttons ──────────────────────────────────────── */
export const AgentBtns = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  '@media (max-width: 900px)': { display: 'none' },
});

export const AgentLoginBtn = styled(Link)({
  textDecoration: 'none',
  fontSize: 13,
  fontWeight: 600,
  color: t.primary,
  padding: '7px 14px',
  border: `1.5px solid ${t.primary}`,
  borderRadius: 7,
  transition: 'all 0.2s',
  '&:hover': { background: t.primary, color: '#fff' },
});

export const AgentSignupBtn = styled(Link)({
  textDecoration: 'none',
  fontSize: 13,
  fontWeight: 600,
  color: '#fff',
  padding: '7px 14px',
  background: t.primary,
  border: `1.5px solid ${t.primary}`,
  borderRadius: 7,
  transition: 'all 0.2s',
  '&:hover': { background: t.primaryHover, borderColor: t.primaryHover },
});

/* ─── Mobile Menu Button ─────────────────────────────────── */
export const MobileMenuBtn = styled('button')({
  display: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 6,
  borderRadius: 6,
  color: t.text,
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.3s ease',
  '&:hover': { background: t.bgLight },
  '@media (max-width: 900px)': { display: 'flex' },
});

/* ─── Mobile Overlay ─────────────────────────────────────── */
export const MobileOverlay = styled(Box)(({ open }) => ({
  position: 'fixed',
  top: 70,
  left: 0,
  width: '100%',
  height: 'calc(100vh - 70px)',
  background: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(6px)',
  opacity: open ? 1 : 0,
  visibility: open ? 'visible' : 'hidden',
  transition: 'all 0.3s ease',
  zIndex: 999,
  '@media (max-width: 768px)': { top: 65, height: 'calc(100vh - 65px)' },
  '@media (max-width: 480px)': { top: 60, height: 'calc(100vh - 60px)' },
}));

export const MobileMenuContent = styled(Box)(({ open }) => ({
  background: 'white',
  width: '80%',
  maxWidth: 320,
  height: '100%',
  marginLeft: 'auto',
  padding: 24,
  transform: open ? 'translateX(0)' : 'translateX(100%)',
  transition: 'transform 0.4s ease',
  overflowY: 'auto',
}));

export const MobileNavSection = styled(Box)({ marginBottom: 30 });

export const MobileSectionTitle = styled('h3')({
  fontSize: 12,
  color: t.textSec,
  marginBottom: 12,
  marginTop: 0,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontFamily: 'inherit',
});

export const MobileNavLinks = styled(Box)({ display: 'flex', flexDirection: 'column' });

export const MobileNavLink = styled(Link)({
  padding: '14px 0',
  borderBottom: `1px solid ${t.border}`,
  textDecoration: 'none',
  color: t.text,
  fontWeight: 500,
  fontSize: 15,
  transition: 'all 0.3s ease',
  '&:hover': { color: t.primary, paddingLeft: 6 },
});
