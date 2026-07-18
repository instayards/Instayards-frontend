import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/pages/HomePage/HomePage';
import './App.css';
import AboutPage from './components/About/About';
import PropertyDetails from './components/HotProperties/PropertyDetails';
import ContactPage from './components/pages/ContactPage';
import NewLaunchPage from './components/NewlyLaunch/newlaunch';
import NewLaunchDetailPage from './components/NewlyLaunch/property';
import TermsPage from './components/pages/TermsPage';
import PrivacyPage from './components/pages/PrivacyPage';
import CareersPage from './components/pages/CareersPage';
import SellPage from './components/pages/SellPage';
import ViewAllProperties from './components/HotProperties/ViewAllProperties';

// Agent pages
import AgentLogin from './components/Agent/Auth/AgentLogin';
import AgentSignup from './components/Agent/Auth/AgentSignup';
import AgentDashboard from './components/Agent/Dashboard/AgentDashboard';
import AgentListings from './components/Agent/Listings/AgentListings';
import AgentListingForm from './components/Agent/ListingForm/AgentListingForm';
import AgentMembers from './components/Agent/Members/AgentMembers';
import AgentSettings from './components/Agent/Settings/AgentSettings';
import AgentInventoryDetail from './components/Agent/Listings/AgentInventoryDetail';

import { useAgent } from './context/AgentContext';
import { useAdmin } from './context/AdminContext';
import usePageTracking from './usePageTracking';

// Admin pages
import AdminLogin from './components/Admin/Auth/AdminLogin';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import SocietyList from './components/Admin/Society/SocietyList';
import SocietyForm from './components/Admin/Society/SocietyForm';
import InventoryList from './components/Admin/Inventory/InventoryList';
import InventoryForm from './components/Admin/Inventory/InventoryForm';
import PropertyVerifications from './components/Admin/Verification/PropertyVerifications';
import OwnerDocVerifications from './components/Admin/Verification/OwnerDocVerifications';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const ProtectedAgentRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAgent();
  if (loading) return null;
  return isLoggedIn ? children : <Navigate to="/agent/login" replace />;
};

const PublicAgentRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAgent();
  if (loading) return null;
  return !isLoggedIn ? children : <Navigate to="/agent/dashboard" replace />;
};

const ProtectedAdminRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAdmin();
  if (loading) return null;
  return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
};

const PublicAdminRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAdmin();
  if (loading) return null;
  return !isLoggedIn ? children : <Navigate to="/admin/dashboard" replace />;
};

function App() {
  usePageTracking();

  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        {/* ── Public site ── */}
        <Route path="/"            element={<><Navbar /><HomePage /></>} />
        <Route path="/buy"         element={<><Navbar /><HomePage /></>} />
        <Route path="/about"       element={<><Navbar /><AboutPage /></>} />
        <Route path="/contact"     element={<ContactPage />} />
        <Route path="/terms"       element={<TermsPage />} />
        <Route path="/careers"     element={<CareersPage />} />
        <Route path="/privacy"     element={<PrivacyPage />} />
        <Route path="/sell"        element={<SellPage />} />
        <Route path="/properties"  element={<ViewAllProperties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/new-launch"       element={<><Navbar /><NewLaunchPage /></>} />
        <Route path="/new-launch/:id"   element={<><Navbar /><NewLaunchDetailPage /></>} />

        {/* ── Agent auth (redirect if already logged in) ── */}
        <Route path="/agent/login"  element={<PublicAgentRoute><AgentLogin /></PublicAgentRoute>} />
        <Route path="/agent/signup" element={<PublicAgentRoute><AgentSignup /></PublicAgentRoute>} />

        {/* ── Agent portal (protected) ── */}
        <Route path="/agent" element={<Navigate to="/agent/dashboard" replace />} />
        <Route path="/agent/dashboard" element={<ProtectedAgentRoute><AgentDashboard /></ProtectedAgentRoute>} />
        <Route path="/agent/listings" element={<ProtectedAgentRoute><AgentListings /></ProtectedAgentRoute>} />
        <Route path="/agent/listings/new" element={<ProtectedAgentRoute><AgentListingForm /></ProtectedAgentRoute>} />
        <Route path="/agent/listings/:id/edit" element={<ProtectedAgentRoute><AgentListingForm /></ProtectedAgentRoute>} />
        <Route path="/agent/listings/:id" element={<ProtectedAgentRoute><AgentInventoryDetail /></ProtectedAgentRoute>} />
        <Route path="/agent/team" element={<ProtectedAgentRoute><AgentMembers /></ProtectedAgentRoute>} />
        <Route path="/agent/settings" element={<ProtectedAgentRoute><AgentSettings /></ProtectedAgentRoute>} />

        {/* ── Admin portal ── */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<PublicAdminRoute><AdminLogin /></PublicAdminRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/societies" element={<ProtectedAdminRoute><SocietyList /></ProtectedAdminRoute>} />
        <Route path="/admin/societies/new" element={<ProtectedAdminRoute><SocietyForm /></ProtectedAdminRoute>} />
        <Route path="/admin/societies/:id/edit" element={<ProtectedAdminRoute><SocietyForm /></ProtectedAdminRoute>} />
        <Route path="/admin/inventory" element={<ProtectedAdminRoute><InventoryList /></ProtectedAdminRoute>} />
        <Route path="/admin/inventory/new" element={<ProtectedAdminRoute><InventoryForm /></ProtectedAdminRoute>} />
        <Route path="/admin/inventory/:id/edit" element={<ProtectedAdminRoute><InventoryForm /></ProtectedAdminRoute>} />
        <Route path="/admin/property-verifications" element={<ProtectedAdminRoute><PropertyVerifications /></ProtectedAdminRoute>} />
        <Route path="/admin/owner-docs" element={<ProtectedAdminRoute><OwnerDocVerifications /></ProtectedAdminRoute>} />
      </Routes>
    </div>
  );
}

export default App;
