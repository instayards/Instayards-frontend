import { NavLink, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../context/AdminContext';
import './AdminLayout.css';

const navItems = [
  { to: '/admin/dashboard',              icon: '⊞', label: 'Dashboard' },
  { to: '/admin/societies',              icon: '🏘', label: 'Societies' },
  { to: '/admin/inventory',              icon: '🏠', label: 'Inventory' },
  { to: '/admin/property-verifications', icon: '✅', label: 'Property Verify' },
  { to: '/admin/owner-docs',             icon: '📋', label: 'Owner Docs' },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <span className="admin-sidebar-brand">Instayards</span>
          <span className="admin-sidebar-badge">Admin</span>
        </div>

        <nav className="admin-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-item${isActive ? ' active' : ''}`}
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">{admin?.name?.[0]?.toUpperCase() || 'A'}</div>
            <div>
              <div className="admin-user-name">{admin?.name || 'Admin'}</div>
              <div className="admin-user-email">{admin?.email}</div>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
