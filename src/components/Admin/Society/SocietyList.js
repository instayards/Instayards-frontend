import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import { adminGetSocieties, adminDeleteSociety } from '../../../services/adminApi';
import { useAdmin } from '../../../context/AdminContext';

export default function SocietyList() {
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
    adminGetSocieties({ page, limit, search }, token)
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

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete society "${name}"? All linked inventory will also be affected.`)) return;
    try {
      await adminDeleteSociety(id, token);
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
          <h1 className="admin-page-title">Societies</h1>
          <p className="admin-page-sub">{total} total societies</p>
        </div>
        <Link to="/admin/societies/new" className="admin-btn-primary">
          + Add Society
        </Link>
      </div>

      <div className="admin-search-bar">
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10 }}>
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search by name or sector..."
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
          <div className="admin-empty">No societies found</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Society Name</th>
                <th>Sector</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(s => (
                <tr key={s.society_id}>
                  <td style={{ color: '#475569' }}>#{s.society_id}</td>
                  <td style={{ fontWeight: 600, color: '#f1f5f9' }}>{s.society_name}</td>
                  <td>{s.sector || '—'}</td>
                  <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.address || '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="admin-btn-secondary"
                        style={{ padding: '6px 12px', fontSize: 13 }}
                        onClick={() => navigate(`/admin/societies/${s.society_id}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-btn-danger"
                        onClick={() => handleDelete(s.society_id, s.society_name)}
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
