import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { adminGetOwnerDocs, adminApproveOwnerDoc, adminRejectOwnerDoc } from '../../../services/adminApi';
import { useAdmin } from '../../../context/AdminContext';

const STATUS_TABS = [
  { key: 'pending',  label: 'Pending',  color: '#f59e0b' },
  { key: 'approved', label: 'Approved', color: '#10b981' },
  { key: 'rejected', label: 'Rejected', color: '#ef4444' },
  { key: 'all',      label: 'All',      color: '#64748b' },
];

export default function OwnerDocVerifications() {
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
    adminGetOwnerDocs({ status: activeTab, page, limit }, token)
      .then(r => { setData(r.data.data.data); setTotal(r.data.data.total); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeTab, page, token]);

  useEffect(() => { load(); }, [load]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setPage(1);
  };

  const handleAction = async (id, action) => {
    setActionLoading(id + action);
    try {
      if (action === 'approve') await adminApproveOwnerDoc(id, token);
      else await adminRejectOwnerDoc(id, token);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Owner Doc Verifications</h1>
          <p className="admin-page-sub">{total} documents in this view</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {STATUS_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            style={{
              padding: '8px 20px',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 13,
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
          <div className="admin-empty">No owner documents found</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Doc ID</th>
                <th>Property</th>
                <th>Owner</th>
                <th>Agent</th>
                <th>Signatures</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(doc => (
                <tr key={doc.id}>
                  <td style={{ color: '#475569' }}>#{doc.id}</td>
                  <td>
                    <div style={{ fontWeight: 500, color: '#f1f5f9' }}>
                      {doc.property?.bhk ? `${doc.property.bhk} BHK` : '—'} — {doc.property?.society?.society_name || 'No society'}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>
                      Property #{doc.residential_id} · {doc.property?.society?.sector || ''}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13, color: '#cbd5e1' }}>{doc.owner_name || '—'}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{doc.owner_phone || ''}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{doc.owner_email || ''}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13, color: '#cbd5e1' }}>{doc.property?.agent?.name || '—'}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{doc.property?.agent?.phone || ''}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ fontSize: 12, color: doc.owner_signed ? '#10b981' : '#64748b' }}>
                        {doc.owner_signed ? '✓' : '○'} Owner
                      </span>
                      <span style={{ fontSize: 12, color: doc.realtor_signed ? '#10b981' : '#64748b' }}>
                        {doc.realtor_signed ? '✓' : '○'} Realtor
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`admin-badge admin-badge-${
                      doc.status === 'approved' ? 'green' :
                      doc.status === 'rejected' ? 'red' : 'yellow'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {doc.status !== 'approved' && (
                        <button
                          className="admin-btn-secondary"
                          style={{ padding: '6px 12px', fontSize: 12, background: '#10b981', color: '#fff', border: 'none' }}
                          disabled={actionLoading === doc.id + 'approve'}
                          onClick={() => handleAction(doc.id, 'approve')}
                        >
                          {actionLoading === doc.id + 'approve' ? '...' : '✓ Approve'}
                        </button>
                      )}
                      {doc.status !== 'rejected' && (
                        <button
                          className="admin-btn-danger"
                          style={{ padding: '6px 12px', fontSize: 12 }}
                          disabled={actionLoading === doc.id + 'reject'}
                          onClick={() => handleAction(doc.id, 'reject')}
                        >
                          {actionLoading === doc.id + 'reject' ? '...' : '✕ Reject'}
                        </button>
                      )}
                      {doc.letter_url && (
                        <a
                          href={doc.letter_url}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-btn-secondary"
                          style={{ padding: '6px 12px', fontSize: 12, textDecoration: 'none' }}
                        >
                          View Doc
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
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
