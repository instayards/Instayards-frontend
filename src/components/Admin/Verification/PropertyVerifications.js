import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { adminGetPropertyVerifications, adminApproveProperty, adminRejectProperty } from '../../../services/adminApi';
import { useAdmin } from '../../../context/AdminContext';

const STATUS_TABS = [
  { key: 'pending',  label: 'Pending',  color: '#f59e0b' },
  { key: 'approved', label: 'Approved', color: '#10b981' },
  { key: 'rejected', label: 'Rejected', color: '#ef4444' },
  { key: 'all',      label: 'All',      color: '#64748b' },
];

function formatPrice(price) {
  if (!price) return '—';
  const n = Number(price);
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

const docStatusColor = (s) => {
  if (s === 'approved') return '#10b981';
  if (s === 'rejected') return '#ef4444';
  return '#f59e0b';
};

export default function PropertyVerifications() {
  const { token } = useAdmin();
  const [activeTab, setActiveTab] = useState('pending');
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const limit = 20;

  const load = useCallback(() => {
    setLoading(true);
    adminGetPropertyVerifications({ status: activeTab, page, limit }, token)
      .then(r => {
        setData(r.data.data.data);
        setTotal(r.data.data.total);
      })
      .catch(err => {
        console.error('PropertyVerifications fetch error:', err?.response?.data || err.message);
        setData([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [activeTab, page, token]);

  useEffect(() => { load(); }, [load]);

  const handleTabChange = (key) => { setActiveTab(key); setPage(1); };

  const handleAction = async (id, action) => {
    setActionLoading(id + action);
    try {
      if (action === 'approve') await adminApproveProperty(id, token);
      else await adminRejectProperty(id, token);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  const totalPages = Math.ceil(total / limit);
  const vStatus = (item) => item.verification_status || 'pending';

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Property Verifications</h1>
          <p className="admin-page-sub">{total} properties in this view</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {STATUS_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            style={{
              padding: '8px 20px', borderRadius: 999, border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: 13,
              background: activeTab === tab.key ? tab.color : '#1e293b',
              color: activeTab === tab.key ? '#fff' : '#94a3b8',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : data.length === 0 ? (
          <div className="admin-empty">No properties found</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Property</th>
                <th>Agent</th>
                <th>Price</th>
                <th>Added On</th>
                <th>Owner Doc</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => {
                const vs = vStatus(item);
                const doc = item.ownerDocument;
                return (
                  <tr key={item.residential_id}>
                    <td style={{ color: '#475569' }}>#{item.residential_id}</td>
                    <td>
                      <div style={{ fontWeight: 500, color: '#f1f5f9' }}>
                        {item.bhk ? `${item.bhk} BHK` : item.configuration || '—'} — {item.society?.society_name || 'No society'}
                      </div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>
                        {item.society?.sector || ''}{item.unit_number ? ` · Unit ${item.unit_number}` : ''}
                        {item.floor_number ? ` · Floor ${item.floor_number}` : ''}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: 13, color: '#cbd5e1' }}>{item.agent?.name || '—'}</div>
                      <div style={{ fontSize: 12, color: '#64748b' }}>{item.agent?.phone || ''}</div>
                    </td>
                    <td style={{ color: '#4ade80', fontWeight: 600 }}>{formatPrice(item.price)}</td>
                    <td style={{ fontSize: 12, color: '#94a3b8' }}>
                      {new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td>
                      {doc ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: docStatusColor(doc.status) }}>
                            {doc.status}
                          </span>
                          <span style={{ fontSize: 11, color: '#64748b' }}>{doc.owner_name || '—'}</span>
                          <span style={{ fontSize: 11 }}>
                            <span style={{ color: doc.owner_signed ? '#10b981' : '#64748b' }}>Owner {doc.owner_signed ? '✓' : '○'}</span>
                            {' · '}
                            <span style={{ color: doc.realtor_signed ? '#10b981' : '#64748b' }}>Agent {doc.realtor_signed ? '✓' : '○'}</span>
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: 12, color: '#475569' }}>Not submitted</span>
                      )}
                    </td>
                    <td>
                      <span style={{
                        fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999,
                        background: vs === 'approved' ? 'rgba(16,185,129,0.15)' : vs === 'rejected' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                        color: vs === 'approved' ? '#10b981' : vs === 'rejected' ? '#ef4444' : '#f59e0b',
                      }}>
                        {vs}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {vs !== 'approved' && (
                          <button
                            style={{ padding: '6px 14px', fontSize: 12, background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}
                            disabled={actionLoading === item.residential_id + 'approve'}
                            onClick={() => handleAction(item.residential_id, 'approve')}
                          >
                            {actionLoading === item.residential_id + 'approve' ? '...' : '✓ Approve'}
                          </button>
                        )}
                        {vs !== 'rejected' && (
                          <button
                            className="admin-btn-danger"
                            style={{ padding: '6px 14px', fontSize: 12 }}
                            disabled={actionLoading === item.residential_id + 'reject'}
                            onClick={() => handleAction(item.residential_id, 'reject')}
                          >
                            {actionLoading === item.residential_id + 'reject' ? '...' : '✕ Reject'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {!loading && totalPages > 1 && (
          <div className="admin-pagination">
            <span>Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}</span>
            <div className="admin-pagination-btns">
              <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
              <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Next</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
