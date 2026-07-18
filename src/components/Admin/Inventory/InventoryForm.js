import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../Layout/AdminLayout';
import { adminGetInventoryItem, adminCreateInventory, adminUpdateInventory } from '../../../services/adminApi';
import { adminGetSocieties } from '../../../services/adminApi';
import { useAdmin } from '../../../context/AdminContext';
import '../Society/SocietyForm.css';

const EMPTY = {
  society_id: '', bhk: '', configuration: '', property_type: 'Apartment',
  area_sqft: '', super_area: '', carpet_area: '', usable_area: '',
  price: '', price_per_sqft: '', floor_number: '', total_floors: '',
  tower: '', unit_number: '', facing: '', parking_slots: '',
  furnishing_status: 'Unfurnished', property_status: '',
  age_of_construction: '', listing_status: 'active',
  property_description: '', layout_url: '',
  property_images: '', property_videos: '',
  highlights: '', furnishing_details: '',
};

const BHK_OPTIONS = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6 BHK', 'Studio', 'Penthouse', 'Villa'];
const FURNISHING_OPTIONS = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];
const STATUS_OPTIONS = ['active', 'inactive', 'sold', 'rented'];
const PROPERTY_TYPES = ['Apartment', 'Villa', 'Penthouse', 'Studio', 'Independent Floor', 'Plot'];

export default function InventoryForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { token } = useAdmin();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    adminGetSocieties({ limit: 200 }, token)
      .then(r => setSocieties(r.data.data.data || []))
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    if (!isEdit) return;
    adminGetInventoryItem(id, token)
      .then(r => {
        const d = r.data.data;
        setForm({
          society_id:           d.society_id || '',
          bhk:                  d.bhk || '',
          configuration:        d.configuration || '',
          property_type:        d.property_type || 'Apartment',
          area_sqft:            d.area_sqft || '',
          super_area:           d.super_area || '',
          carpet_area:          d.carpet_area || '',
          usable_area:          d.usable_area || '',
          price:                d.price || '',
          price_per_sqft:       d.price_per_sqft || '',
          floor_number:         d.floor_number || '',
          total_floors:         d.total_floors || '',
          tower:                d.tower || '',
          unit_number:          d.unit_number || '',
          facing:               d.facing || '',
          parking_slots:        d.parking_slots || '',
          furnishing_status:    d.furnishing_status || 'Unfurnished',
          property_status:      d.property_status || '',
          age_of_construction:  d.age_of_construction || '',
          listing_status:       d.listing_status || 'active',
          property_description: d.property_description || '',
          layout_url:           d.layout_url || '',
          property_images:      (d.property_images || []).join('\n'),
          property_videos:      (d.property_videos || []).join('\n'),
          highlights:           (d.highlights || []).join('\n'),
          furnishing_details:   (d.furnishing_details || []).join('\n'),
        });
      })
      .catch(() => setError('Failed to load inventory'))
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
      property_images:    splitLines(form.property_images),
      property_videos:    splitLines(form.property_videos),
      highlights:         splitLines(form.highlights),
      furnishing_details: splitLines(form.furnishing_details),
    };
    try {
      if (isEdit) {
        await adminUpdateInventory(id, payload, token);
      } else {
        await adminCreateInventory(payload, token);
      }
      navigate('/admin/inventory');
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
          <h1 className="admin-page-title">{isEdit ? 'Edit Property' : 'Add Property'}</h1>
          <p className="admin-page-sub">{isEdit ? `Editing inventory #${id}` : 'Add a new residential inventory'}</p>
        </div>
        <button className="admin-btn-secondary" onClick={() => navigate('/admin/inventory')}>
          ← Back
        </button>
      </div>

      {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: 14 }}>{error}</div>}

      <form onSubmit={handleSubmit} className="society-form-grid">
        <div className="society-form-section">
          <h3 className="society-form-section-title">Basic Info</h3>
          <div className="society-form-row">
            <div className="admin-field">
              <label>Society *</label>
              <select value={form.society_id} onChange={set('society_id')} required>
                <option value="">Select society</option>
                {societies.map(s => (
                  <option key={s.society_id} value={s.society_id}>{s.society_name} — {s.sector}</option>
                ))}
              </select>
            </div>
            <div className="admin-field">
              <label>Property Type</label>
              <select value={form.property_type} onChange={set('property_type')}>
                {PROPERTY_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="society-form-row">
            <div className="admin-field">
              <label>BHK</label>
              <select value={form.bhk} onChange={set('bhk')}>
                <option value="">Select BHK</option>
                {BHK_OPTIONS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="admin-field">
              <label>Configuration</label>
              <input value={form.configuration} onChange={set('configuration')} placeholder="e.g. 3BHK+3T" />
            </div>
          </div>
          <div className="society-form-row">
            <div className="admin-field">
              <label>Tower</label>
              <input value={form.tower} onChange={set('tower')} placeholder="e.g. Tower A" />
            </div>
            <div className="admin-field">
              <label>Unit Number</label>
              <input value={form.unit_number} onChange={set('unit_number')} placeholder="e.g. 401" />
            </div>
          </div>
        </div>

        <div className="society-form-section">
          <h3 className="society-form-section-title">Area & Price</h3>
          <div className="society-form-row">
            <div className="admin-field">
              <label>Area (sqft)</label>
              <input type="number" value={form.area_sqft} onChange={set('area_sqft')} placeholder="e.g. 1500" />
            </div>
            <div className="admin-field">
              <label>Super Area</label>
              <input value={form.super_area} onChange={set('super_area')} placeholder="e.g. 1650 sqft" />
            </div>
          </div>
          <div className="society-form-row">
            <div className="admin-field">
              <label>Carpet Area</label>
              <input value={form.carpet_area} onChange={set('carpet_area')} placeholder="e.g. 1200 sqft" />
            </div>
            <div className="admin-field">
              <label>Usable Area</label>
              <input value={form.usable_area} onChange={set('usable_area')} placeholder="e.g. 1400 sqft" />
            </div>
          </div>
          <div className="society-form-row">
            <div className="admin-field">
              <label>Price (₹)</label>
              <input type="number" value={form.price} onChange={set('price')} placeholder="e.g. 18100000" />
            </div>
            <div className="admin-field">
              <label>Price per sqft (₹)</label>
              <input type="number" value={form.price_per_sqft} onChange={set('price_per_sqft')} placeholder="e.g. 12000" />
            </div>
          </div>
        </div>

        <div className="society-form-section">
          <h3 className="society-form-section-title">Floor & Details</h3>
          <div className="society-form-row">
            <div className="admin-field">
              <label>Floor Number</label>
              <input value={form.floor_number} onChange={set('floor_number')} placeholder="e.g. 4th" />
            </div>
            <div className="admin-field">
              <label>Total Floors</label>
              <input type="number" value={form.total_floors} onChange={set('total_floors')} placeholder="e.g. 25" />
            </div>
          </div>
          <div className="society-form-row">
            <div className="admin-field">
              <label>Facing</label>
              <input value={form.facing} onChange={set('facing')} placeholder="e.g. East, North-East" />
            </div>
            <div className="admin-field">
              <label>Parking Slots</label>
              <input value={form.parking_slots} onChange={set('parking_slots')} placeholder="e.g. 1 Covered" />
            </div>
          </div>
          <div className="society-form-row">
            <div className="admin-field">
              <label>Age of Construction</label>
              <input value={form.age_of_construction} onChange={set('age_of_construction')} placeholder="e.g. 5 years" />
            </div>
            <div className="admin-field">
              <label>Property Status</label>
              <input value={form.property_status} onChange={set('property_status')} placeholder="e.g. Ready to Move" />
            </div>
          </div>
          <div className="society-form-row">
            <div className="admin-field">
              <label>Furnishing</label>
              <select value={form.furnishing_status} onChange={set('furnishing_status')}>
                {FURNISHING_OPTIONS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="admin-field">
              <label>Listing Status</label>
              <select value={form.listing_status} onChange={set('listing_status')}>
                {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="society-form-section">
          <h3 className="society-form-section-title">Description & Highlights</h3>
          <div className="admin-field">
            <label>Property Description</label>
            <textarea value={form.property_description} onChange={set('property_description')} rows={4} placeholder="Describe the property..." />
          </div>
          <div className="admin-field">
            <label>Highlights <span className="field-hint">(one per line)</span></label>
            <textarea value={form.highlights} onChange={set('highlights')} rows={4} placeholder="Vastu compliant&#10;Corner unit&#10;Park facing" />
          </div>
          <div className="admin-field">
            <label>Furnishing Details <span className="field-hint">(one per line)</span></label>
            <textarea value={form.furnishing_details} onChange={set('furnishing_details')} rows={3} placeholder="Modular kitchen&#10;AC in all rooms" />
          </div>
        </div>

        <div className="society-form-section">
          <h3 className="society-form-section-title">Media</h3>
          <div className="admin-field">
            <label>Layout URL</label>
            <input value={form.layout_url} onChange={set('layout_url')} placeholder="https://..." />
          </div>
          <div className="admin-field">
            <label>Property Image URLs <span className="field-hint">(one URL per line)</span></label>
            <textarea value={form.property_images} onChange={set('property_images')} rows={4} placeholder="https://cloudinary.com/image1.jpg&#10;https://cloudinary.com/image2.jpg" />
          </div>
          <div className="admin-field">
            <label>Property Video URLs <span className="field-hint">(one URL per line)</span></label>
            <textarea value={form.property_videos} onChange={set('property_videos')} rows={3} placeholder="https://cloudinary.com/video.mp4" />
          </div>
        </div>

        <div className="society-form-actions">
          <button type="button" className="admin-btn-secondary" onClick={() => navigate('/admin/inventory')}>
            Cancel
          </button>
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : isEdit ? 'Update Property' : 'Create Property'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
