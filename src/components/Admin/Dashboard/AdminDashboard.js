import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import { adminGetStats } from '../../../services/adminApi';
import { useAdmin } from '../../../context/AdminContext';
import './AdminDashboard.css';

const StatCard = ({ label, value, icon, color, to }) => (
  <Link to={to} className={`admin-stat-card admin-stat-${color}`}>
    <div className="admin-stat-icon">{icon}</div>
    <div className="admin-stat-value">{value ?? '—'}</div>
    <div className="admin-stat-label">{label}</div>
  </Link>
);

export default function AdminDashboard() {
  const { token } = useAdmin();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetStats(token)
      .then(r => setStats(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-sub">Overview of all Instayards data</p>
        </div>
      </div>

      {loading ? (
        <div className="admin-loading">Loading stats...</div>
      ) : (
        <>
          {/* Main counts */}
          <div className="admin-stats-grid">
            <StatCard label="Societies"    value={stats?.societies}   icon="🏘" color="blue"   to="/admin/societies" />
            <StatCard label="Inventory"    value={stats?.inventory}   icon="🏠" color="green"  to="/admin/inventory" />
            <StatCard label="New Launches" value={stats?.newLaunches} icon="🚀" color="purple" to="/admin/dashboard" />
            <StatCard label="Agents"       value={stats?.agents}      icon="👤" color="orange" to="/admin/dashboard" />
            <StatCard label="Enquiries"    value={stats?.enquiries}   icon="📩" color="pink"   to="/admin/dashboard" />
          </div>

          {/* Verification summary */}
          <h2 className="admin-section-title" style={{ marginBottom: 16 }}>Verification Queue</h2>
          <div className="admin-stats-grid" style={{ marginBottom: 40 }}>
            <StatCard
              label="Pending Property Verifications"
              value={stats?.pendingVerifications}
              icon="⏳"
              color="yellow"
              to="/admin/property-verifications"
            />
            <StatCard
              label="Approved Properties"
              value={stats?.approvedProperties}
              icon="✅"
              color="green"
              to="/admin/property-verifications"
            />
            <StatCard
              label="Pending Owner Docs"
              value={stats?.pendingOwnerDocs}
              icon="📋"
              color="orange"
              to="/admin/owner-docs"
            />
            <StatCard
              label="Approved Owner Docs"
              value={stats?.approvedOwnerDocs}
              icon="📄"
              color="blue"
              to="/admin/owner-docs"
            />
          </div>

          <div className="admin-dash-grid">
            <div className="admin-card">
              <h2 className="admin-section-title">Recent Inventory</h2>
              {stats?.recentInventory?.length === 0 ? (
                <p className="admin-empty" style={{ padding: '20px 0' }}>No inventory yet</p>
              ) : (
                <div className="admin-recent-list">
                  {stats?.recentInventory?.map(item => (
                    <Link to={`/admin/inventory/${item.residential_id}/edit`} key={item.residential_id} className="admin-recent-item">
                      <div className="admin-recent-info">
                        <div className="admin-recent-title">{item.bhk} BHK — {item.society?.society_name || 'No society'}</div>
                        <div className="admin-recent-sub">{item.society?.sector} · ₹{item.price ? (Number(item.price) / 100000).toFixed(0) + 'L' : 'N/A'} · Floor {item.floor_number || '—'}</div>
                      </div>
                      <span className={`admin-badge admin-badge-${
                        item.verification_status === 'approved' ? 'green' :
                        item.verification_status === 'rejected' ? 'red' : 'yellow'
                      }`}>
                        {item.verification_status || 'pending'}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="admin-card">
              <h2 className="admin-section-title">Recent Enquiries</h2>
              {stats?.recentEnquiries?.length === 0 ? (
                <p className="admin-empty" style={{ padding: '20px 0' }}>No enquiries yet</p>
              ) : (
                <div className="admin-recent-list">
                  {stats?.recentEnquiries?.map(enq => (
                    <div key={enq.id} className="admin-recent-item">
                      <div className="admin-recent-info">
                        <div className="admin-recent-title">{enq.full_name}</div>
                        <div className="admin-recent-sub">{enq.contact_number}</div>
                      </div>
                      <span className="admin-recent-date">
                        {new Date(enq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
