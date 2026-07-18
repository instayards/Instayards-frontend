import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiGrid, FiList, FiPlusSquare, FiLogOut, FiMenu, FiX, FiHome, FiUsers, FiSettings,
} from 'react-icons/fi';
import { useAgent } from '../../context/AgentContext';
import {
  AgShell, AgSidebar, AgSidebarOverlay,
  AgLogoBox, AgLogoText, AgLogoSub,
  AgNav, AgNavSection, AgNavLabel, AgNavLink,
  AgLogoutBtn, AgSidebarFooter,
  AgMain, AgTopbar, AgTopbarLeft, AgTopbarRight,
  AgHamburger, AgPageTitle,
  AgAgentBadge, AgAgentAvatar, AgAgentName,
  AgContent,
} from './AgentLayoutStyles';

const AgentLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { agent, logout } = useAgent();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/agent/login');
  };

  const initials = agent?.name
    ? agent.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'A';

  return (
    <AgShell>
      {/* Sidebar overlay for mobile */}
      <AgSidebarOverlay open={sidebarOpen ? 1 : 0} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <AgSidebar open={sidebarOpen ? 1 : 0}>
        <AgLogoBox>
          <div>
            <AgLogoText>Insta<span>yards</span></AgLogoText>
            <AgLogoSub>Realtor Portal</AgLogoSub>
          </div>
        </AgLogoBox>

        <AgNav>
          <AgNavSection>
            <AgNavLabel>Main</AgNavLabel>
            <AgNavLink to="/agent/dashboard" onClick={() => setSidebarOpen(false)}>
              <FiGrid /> Dashboard
            </AgNavLink>
            <AgNavLink to="/agent/listings" onClick={() => setSidebarOpen(false)}>
              <FiList /> My Listings
            </AgNavLink>
            <AgNavLink to="/agent/listings/new" onClick={() => setSidebarOpen(false)}>
              <FiPlusSquare /> Add Property
            </AgNavLink>
            <AgNavLink to="/agent/team" onClick={() => setSidebarOpen(false)}>
              <FiUsers /> Team
            </AgNavLink>
            <AgNavLink to="/agent/settings" onClick={() => setSidebarOpen(false)}>
              <FiSettings /> Settings
            </AgNavLink>
          </AgNavSection>

          <AgNavSection>
            <AgNavLabel>Public Site</AgNavLabel>
            <AgNavLink to="/" onClick={() => setSidebarOpen(false)}>
              <FiHome /> Go to Website
            </AgNavLink>
          </AgNavSection>
        </AgNav>

        <AgSidebarFooter>
          <AgLogoutBtn onClick={handleLogout}>
            <FiLogOut /> Logout
          </AgLogoutBtn>
        </AgSidebarFooter>
      </AgSidebar>

      {/* Main area */}
      <AgMain>
        <AgTopbar>
          <AgTopbarLeft>
            <AgHamburger onClick={() => setSidebarOpen(prev => !prev)}>
              {sidebarOpen ? <FiX /> : <FiMenu />}
            </AgHamburger>
            <AgPageTitle>{pageTitle || 'Dashboard'}</AgPageTitle>
          </AgTopbarLeft>
          <AgTopbarRight>
            <AgAgentBadge>
              <AgAgentAvatar>{initials}</AgAgentAvatar>
              <AgAgentName>{agent?.name}</AgAgentName>
            </AgAgentBadge>
          </AgTopbarRight>
        </AgTopbar>

        <AgContent>{children}</AgContent>
      </AgMain>
    </AgShell>
  );
};

export default AgentLayout;
