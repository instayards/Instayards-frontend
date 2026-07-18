import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import { adminGetSociety, adminCreateSociety, adminUpdateSociety } from '../../../services/adminApi';
import { useAdmin } from '../../../context/AdminContext';
import './SocietyForm.css';

const EMPTY = {
  society_name: '', sector: '', address: '', description: '',
  society_info: '', specifications: '', club_house_aminities: '', other_aminities: '',
  additional_info: '', brochure: '',
  society_images: '', society_video: '',
  red_flags: '', green_flags: '', society_highlights: '',
};

export default function SocietyForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { token } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    adminGetSociety(id, token)
      .then(r => {
        const s = r.data.data;
        setForm({
          society_name:         s.society_name || '',
          sector:               s.sector || '',
          address:              s.address || '',
          description:          s.description || '',
          society_info:         s.society_info || '',
          specifications:       s.specifications || '',
          club_house_aminities: s.club_house_aminities || '',
          other_aminities:      s.other_aminities || '',
          additional_info:      s.additional_info || '',
          brochure:             s.brochure || '',
          society_images:       (s.society_images || []).join('\n'),
          society_video:        (s.society_video || []).join('\n'),
          red_flags:            (s.red_flags || []).join('\n'),
          green_flags:          (s.green_flags || []).join('\n'),
          society_highlights:   (s.society_highlights || []).join('\n'),
        });
      })
      .catch(() => setError('Failed to load society'))
      .finally(() => setLoading(false));
  }, [id, isEdit, token]);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const splitLines = (val) => val.split('\n').map(l => l.trim()).filter(Boolean);
    const payload = {
      ...form,
      society_images:     splitLines(form.society_images),
      society_video:      splitLines(form.society_video),
      red_flags:          splitLines(form.red_flags),
      green_flags:        splitLines(form.green_flags),
      society_highlights: splitLines(form.society_highlights),
    };
    try {
      if (isEdit) {
        await adminUpdateSociety(id, payload, token);
      } else {
        await adminCreateSociety(payload, token);
      }
      navigate('/admin/societies');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><div className="admin-loading">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{isEdit ? 'Edit Society' : 'Add Society'}</h1>
          <p className="admin-page-sub">{isEdit ? `Editing society #${id}` : 'Create a new society'}</p>
        </div>
        <button className="admin-btn-secondary" onClick={() => navigate('/admin/societies')}>
          ← Back
        </button>
      </div>

      {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: 14 }}>{error}</div>}

      <form onSubmit={handleSubmit} className="society-form-grid">
        <div className="society-form-section">
          <h3 className="society-form-section-title">Basic Info</h3>
          <div className="society-form-row">
            <div className="admin-field">
              <label>Society Name *</label>
              <input value={form.society_name} onChange={set('society_name')} placeholder="e.g. DLF The Crest" required />
            </div>
            <div className="admin-field">
              <label>Sector</label>
              <input value={form.sector} onChange={set('sector')} placeholder="e.g. Sector 54" />
            </div>
          </div>
          <div className="admin-field">
            <label>Address</label>
            <input value={form.address} onChange={set('address')} placeholder="Full address" />
          </div>
          <div className="admin-field">
            <label>Description</label>
            <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Short description of the society" />
          </div>
          <div className="admin-field">
            <label>Brochure URL</label>
            <input value={form.brochure} onChange={set('brochure')} placeholder="https://..." />
          </div>
        </div>

        <div className="society-form-section">
          <h3 className="society-form-section-title">Details</h3>
          <div className="admin-field">
            <label>Society Info</label>
            <textarea value={form.society_info} onChange={set('society_info')} rows={3} placeholder="Developer info, project details..." />
          </div>
          <div className="admin-field">
            <label>Specifications</label>
            <textarea value={form.specifications} onChange={set('specifications')} rows={3} placeholder="Construction specs, materials..." />
          </div>
          <div className="admin-field">
            <label>Additional Info</label>
            <textarea value={form.additional_info} onChange={set('additional_info')} rows={3} placeholder="Any additional details..." />
          </div>
        </div>

        <div className="society-form-section">
          <h3 className="society-form-section-title">Amenities</h3>
          <div className="admin-field">
            <label>Club House Amenities</label>
            <textarea value={form.club_house_aminities} onChange={set('club_house_aminities')} rows={3} placeholder="Swimming pool, gym, etc." />
          </div>
          <div className="admin-field">
            <label>Other Amenities</label>
            <textarea value={form.other_aminities} onChange={set('other_aminities')} rows={3} placeholder="Power backup, security, etc." />
          </div>
        </div>

        <div className="society-form-section">
          <h3 className="society-form-section-title">Highlights & Flags</h3>
          <div className="admin-field">
            <label>Society Highlights <span className="field-hint">(one per line)</span></label>
            <textarea value={form.society_highlights} onChange={set('society_highlights')} rows={4} placeholder="Close to metro&#10;Low maintenance&#10;Great views" />
          </div>
          <div className="society-form-row">
            <div className="admin-field">
              <label>Green Flags <span className="field-hint">(one per line)</span></label>
              <textarea value={form.green_flags} onChange={set('green_flags')} rows={4} placeholder="Good connectivity&#10;Reputed builder" />
            </div>
            <div className="admin-field">
              <label>Red Flags <span className="field-hint">(one per line)</span></label>
              <textarea value={form.red_flags} onChange={set('red_flags')} rows={4} placeholder="Pending OC&#10;Old construction" />
            </div>
          </div>
        </div>

        <div className="society-form-section">
          <h3 className="society-form-section-title">Media</h3>
          <div className="admin-field">
            <label>Image URLs <span className="field-hint">(one URL per line)</span></label>
            <textarea value={form.society_images} onChange={set('society_images')} rows={4} placeholder="https://cloudinary.com/image1.jpg&#10;https://cloudinary.com/image2.jpg" />
          </div>
          <div className="admin-field">
            <label>Video URLs <span className="field-hint">(one URL per line)</span></label>
            <textarea value={form.society_video} onChange={set('society_video')} rows={3} placeholder="https://cloudinary.com/video1.mp4" />
          </div>
        </div>

        <div className="society-form-actions">
          <button type="button" className="admin-btn-secondary" onClick={() => navigate('/admin/societies')}>
            Cancel
          </button>
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update Society' : 'Create Society'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
