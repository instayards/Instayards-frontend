import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import { adminGetInventory, adminDeleteInventory } from '../../../services/adminApi';
import { useAdmin } from '../../../context/AdminContext';

function formatPrice(price) {
  if (!price) return '—';
  const n = Number(price);
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function InventoryList() {
  const { token } = useAdmin();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);
  const limit = 20;

  const load = useCallback(() => {
    setLoading(true);
    adminGetInventory({ page, limit, search }, token)
      .then(r => { setData(r.data.data.data); setTotal(r.data.data.total); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, search, token]);

  useEffect(() => { load(); }, [load]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inventory item?')) return;
    try {
      await adminDeleteInventory(id, token);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Inventory</h1>
          <p className="admin-page-sub">{total} total properties</p>
        </div>
        <Link to="/admin/inventory/new" className="admin-btn-primary">
          + Add Property
        </Link>
      </div>

      <div className="admin-search-bar">
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10 }}>
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search by BHK, config, or society name..."
          />
          <button type="submit" className="admin-btn-secondary">Search</button>
          {search && (
            <button type="button" className="admin-btn-secondary" onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}>
              Clear
            </button>
          )}
        </form>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : data.length === 0 ? (
          <div className="admin-empty">No inventory found</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Society</th>
                <th>BHK / Config</th>
                <th>Area</th>
                <th>Price</th>
                <th>Floor</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.residential_id}>
                  <td style={{ color: '#475569' }}>#{item.residential_id}</td>
                  <td>
                    <div style={{ fontWeight: 500, color: '#f1f5f9' }}>{item.society?.society_name || '—'}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{item.society?.sector || ''}</div>
                  </td>
                  <td>{item.bhk || item.configuration || '—'}</td>
                  <td>{item.area_sqft ? `${item.area_sqft} sqft` : '—'}</td>
                  <td style={{ color: '#4ade80', fontWeight: 600 }}>{formatPrice(item.price)}</td>
                  <td>{item.floor_number || '—'}</td>
                  <td>
                    <span className={`admin-badge admin-badge-${item.listing_status === 'active' ? 'green' : 'yellow'}`}>
                      {item.listing_status || 'active'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="admin-btn-secondary"
                        style={{ padding: '6px 12px', fontSize: 13 }}
                        onClick={() => navigate(`/admin/inventory/${item.residential_id}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-btn-danger"
                        onClick={() => handleDelete(item.residential_id)}
                      >
                        Delete
                      </button>
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
