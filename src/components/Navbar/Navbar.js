// src/components/Navbar/Navbar.js
import { useState } from 'react';
import logo from '../../assets/logo.png';
import { FiMenu, FiX } from 'react-icons/fi';
import {
  NavRoot, NavContainer,
  NavLogoLink, NavLogoImg, NavLogoText,
  NavLinks, NavLinkItem,
  HamburgDesktop, HamburgDropdown, HamburgBtn, HamburgDropdownContent, HamburgItem,
  AgentBtns, AgentLoginBtn, AgentSignupBtn,
  MobileMenuBtn, MobileOverlay, MobileMenuContent,
  MobileNavSection, MobileSectionTitle, MobileNavLinks, MobileNavLink,
} from './NavbarStyles';

const navItems = [
  { id: 'buy',          label: 'Buy',          path: '/buy' },
  { id: 'sell',         label: 'Sell',         path: '/sell' },
  { id: 'newly_launch', label: 'New Launches', path: '/new-launch' },
];

const hamburgMenuItems = [
  { label: 'About Us',          path: '/about' },
  { label: 'Contact Us',        path: '/contact' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Privacy Policy',    path: '/privacy' },
  { label: 'Careers',           path: '/careers' },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Buy');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <NavRoot>
      <NavContainer>
        {/* Logo */}
        <NavLogoLink to="/">
          <NavLogoImg src={logo} alt="Instayards" />
          <NavLogoText>Instayards</NavLogoText>
        </NavLogoLink>

        {/* Desktop Nav Links */}
        <NavLinks>
          {navItems.map((item) => (
            <NavLinkItem
              key={item.id}
              to={item.path}
              active={activeLink === item.label ? 1 : 0}
              onClick={() => setActiveLink(item.label)}
            >
              {item.label}
            </NavLinkItem>
          ))}
        </NavLinks>

        {/* Agent Buttons */}
        <AgentBtns>
          <AgentLoginBtn to="/agent/login">Agent Login</AgentLoginBtn>
          <AgentSignupBtn to="/agent/signup">Agent Signup</AgentSignupBtn>
        </AgentBtns>

        {/* Desktop Hamburg Dropdown */}
        <HamburgDesktop>
          <HamburgDropdown>
            <HamburgBtn aria-label="More options">
              <FiMenu size={24} />
            </HamburgBtn>
            <HamburgDropdownContent className="hamburg-dropdown-content">
              {hamburgMenuItems.map((item, index) => (
                <HamburgItem
                  key={index}
                  to={item.path}
                  onClick={() => setActiveLink(item.label)}
                >
                  {item.label}
                </HamburgItem>
              ))}
            </HamburgDropdownContent>
          </HamburgDropdown>
        </HamburgDesktop>

        {/* Mobile Toggle */}
        <MobileMenuBtn
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </MobileMenuBtn>
      </NavContainer>

      {/* Mobile Slide Panel */}
      <MobileOverlay open={mobileMenuOpen ? 1 : 0} onClick={() => setMobileMenuOpen(false)}>
        <MobileMenuContent open={mobileMenuOpen ? 1 : 0} onClick={(e) => e.stopPropagation()}>
          <MobileNavSection>
            <MobileSectionTitle>Navigation</MobileSectionTitle>
            <MobileNavLinks>
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => { setActiveLink(item.label); setMobileMenuOpen(false); }}
                >
                  {item.label}
                </MobileNavLink>
              ))}
            </MobileNavLinks>
          </MobileNavSection>

          <MobileNavSection>
            <MobileSectionTitle>Company</MobileSectionTitle>
            <MobileNavLinks>
              {hamburgMenuItems.map((item, index) => (
                <MobileNavLink
                  key={index}
                  to={item.path}
                  onClick={() => { setActiveLink(item.label); setMobileMenuOpen(false); }}
                >
                  {item.label}
                </MobileNavLink>
              ))}
            </MobileNavLinks>
          </MobileNavSection>

          <MobileNavSection>
            <MobileSectionTitle>Realtor Portal</MobileSectionTitle>
            <MobileNavLinks>
              <MobileNavLink to="/agent/login" onClick={() => setMobileMenuOpen(false)}>Agent Login</MobileNavLink>
              <MobileNavLink to="/agent/signup" onClick={() => setMobileMenuOpen(false)}>Agent Signup</MobileNavLink>
            </MobileNavLinks>
          </MobileNavSection>
        </MobileMenuContent>
      </MobileOverlay>
    </NavRoot>
  );
};

export default Navbar;
