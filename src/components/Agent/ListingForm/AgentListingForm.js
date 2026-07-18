import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiPlus, FiTrash2, FiCheckCircle, FiAlertCircle, FiArrowLeft, FiUploadCloud, FiX } from 'react-icons/fi';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import AgentLayout from '../AgentLayout';
import { useAgent } from '../../../context/AgentContext';
import {
  getSocieties,
  createInventory, getInventoryById, updateInventory,
  uploadPropertyImages, uploadPropertyVideos,
} from '../../../services/agentApi';
import OwnerDocForm from '../OwnerDocForm/OwnerDocForm';

/* ── Theme tokens ─────────────────────────────────────────── */
const t = {
  primary: '#1f7a94', text: '#1e293b', textSec: '#64748b', textLight: '#94a3b8',
  bg: '#f1f5f9', bgWhite: '#ffffff', border: '#e2e8f0',
  success: '#10b981', danger: '#ef4444', shadow: '0 1px 3px rgba(0,0,0,0.08)',
};

/* ── Styled components ────────────────────────────────────── */
const Card      = styled(Box)({ background: t.bgWhite, borderRadius: 12, padding: '28px', boxShadow: t.shadow, border: `1px solid ${t.border}`, marginBottom: 20 });
const CardTitle = styled(Typography)({ fontSize: 15, fontWeight: 700, color: t.text, marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${t.border}` });
const Grid      = styled(Box)(({ cols }) => ({ display: 'grid', gridTemplateColumns: `repeat(${cols || 2}, 1fr)`, gap: 16, '@media (max-width: 768px)': { gridTemplateColumns: '1fr' } }));
const Field     = styled(Box)({ display: 'flex', flexDirection: 'column', gap: 6 });
const Label     = styled('label')({ fontSize: 13, fontWeight: 600, color: t.text });
const OptLabel  = styled(Typography)({ fontSize: 13, fontWeight: 600, color: t.text, display: 'flex', gap: 6, '& span': { color: t.textLight, fontWeight: 400 } });
const Input     = styled('input')({ padding: '10px 12px', border: `1.5px solid ${t.border}`, borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit', color: t.text, transition: 'border-color 0.2s', '&:focus': { borderColor: t.primary, boxShadow: `0 0 0 3px rgba(31,122,148,0.08)` }, '&::placeholder': { color: t.textLight } });
const Select    = styled('select')({ padding: '10px 12px', border: `1.5px solid ${t.border}`, borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit', color: t.text, background: t.bgWhite, cursor: 'pointer', '&:focus': { borderColor: t.primary } });
const Textarea  = styled('textarea')({ padding: '10px 12px', border: `1.5px solid ${t.border}`, borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit', color: t.text, resize: 'vertical', minHeight: 100, '&:focus': { borderColor: t.primary, boxShadow: `0 0 0 3px rgba(31,122,148,0.08)` }, '&::placeholder': { color: t.textLight } });

const SubmitRow = styled(Box)({ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' });
const SubmitBtn = styled('button')({ padding: '12px 28px', background: t.primary, color: 'white', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', '&:hover': { background: '#165f73' }, '&:disabled': { opacity: 0.7, cursor: 'not-allowed' } });
const CancelBtn = styled('button')({ padding: '12px 20px', border: `1.5px solid ${t.border}`, borderRadius: 10, background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: t.textSec, fontFamily: 'inherit', '&:hover': { borderColor: t.text, color: t.text } });
const Alert     = styled(Box)(({ variant }) => ({ padding: '12px 16px', borderRadius: 8, fontSize: 13, display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 16, ...(variant === 'success' ? { background: 'rgba(16,185,129,0.08)', color: t.success, border: '1px solid rgba(16,185,129,0.2)' } : { background: 'rgba(239,68,68,0.08)', color: t.danger, border: '1px solid rgba(239,68,68,0.2)' }) }));
const BackBtn   = styled('button')({ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: t.textSec, fontFamily: 'inherit', marginBottom: 20, padding: 0, '&:hover': { color: t.text } });
const HintText  = styled(Typography)({ fontSize: 11, color: t.textLight, marginTop: 2 });

/* upload zone */
const DropZone  = styled('label')({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '32px 20px', border: `2px dashed ${t.border}`, borderRadius: 10, cursor: 'pointer', background: t.bg, transition: 'all 0.2s', '&:hover': { borderColor: t.primary, background: 'rgba(31,122,148,0.04)' } });
const Thumb     = styled(Box)({ position: 'relative', width: 90, height: 90, borderRadius: 8, overflow: 'hidden', border: `1px solid ${t.border}` });
const ThumbImg  = styled('img')({ width: '100%', height: '100%', objectFit: 'cover' });
const ThumbDel  = styled('button')({ position: 'absolute', top: 3, right: 3, width: 20, height: 20, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.6)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, padding: 0 });
const VideoFile = styled(Box)({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: t.bg, border: `1px solid ${t.border}`, fontSize: 13, color: t.textSec });
const MediaRow  = styled(Box)({ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 });

/* tag input */
const TagWrap   = styled(Box)({ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '8px 10px', border: `1.5px solid ${t.border}`, borderRadius: 8, minHeight: 44, alignItems: 'center' });
const Tag       = styled(Box)({ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 10px', background: 'rgba(31,122,148,0.08)', borderRadius: 20, fontSize: 12, color: t.primary, fontWeight: 500 });
const TagInput  = styled('input')({ border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit', color: t.text, flexGrow: 1, minWidth: 80, '&::placeholder': { color: t.textLight } });

/* layout selector */
const LayoutGrid    = styled(Box)({ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10, marginBottom: 16 });
const LayoutThumb   = styled(Box)(({ selected }) => ({ position: 'relative', borderRadius: 8, overflow: 'hidden', border: `2px solid ${selected ? t.primary : t.border}`, cursor: 'pointer', aspectRatio: '4/3', background: t.bg, transition: 'all 0.2s', '&:hover': { borderColor: t.primary } }));
const LayoutCheck   = styled(Box)({ position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: '50%', background: t.primary, color: 'white', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' });

/* ── Furnishing presets ───────────────────────────────────── */
const FURNISHINGS = ['AC', 'Refrigerator', 'Washing Machine', 'Microwave', 'TV', 'Modular Kitchen', 'Water Purifier', 'Geyser', 'Wardrobe', 'Sofa', 'Dining Table', 'Bed', 'Study Table', 'Power Backup'];

const CheckGrid = styled(Box)({ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 });
const CheckItem = styled('label')(({ checked }) => ({ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: `1.5px solid ${checked ? t.primary : t.border}`, borderRadius: 8, cursor: 'pointer', fontSize: 13, color: checked ? t.primary : t.text, background: checked ? 'rgba(31,122,148,0.06)' : t.bgWhite, fontWeight: checked ? 600 : 400, transition: 'all 0.15s', userSelect: 'none' }));

/* ── Constants ────────────────────────────────────────────── */
const PROPERTY_TYPES  = ['Apartment', 'Penthouse', 'Low Rise Floor', 'High Rise Floor', 'Villa'];
const BHK_OPTIONS     = ['1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6+', 'Studio'];
const PARKING_OPTIONS = ['None', '1 Covered', '2 Covered', '1 Open', '2 Open', '1 Covered + 1 Open'];
const FACINGS         = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

/* Extract layout images from society configuration */
const getSocietyLayouts = (society) => {
  if (!society) return [];
  const cfg = society.configuration;
  if (!cfg) return [];
  try {
    const parsed = typeof cfg === 'string' ? JSON.parse(cfg) : cfg;
    if (Array.isArray(parsed)) {
      return parsed.map(c => c.layout_url || c.layout || c.floor_plan || c.image).filter(Boolean);
    }
    if (typeof parsed === 'object') {
      for (const key of Object.keys(parsed)) {
        const val = parsed[key];
        if (Array.isArray(val) && val.length && typeof val[0] === 'string' && val[0].startsWith('http')) return val;
        if (typeof val === 'string' && (key.toLowerCase().includes('layout') || key.toLowerCase().includes('plan')) && val.startsWith('http')) return [val];
      }
    }
  } catch (_) {}
  return [];
};

/* ── Empty form state ─────────────────────────────────────── */
const EMPTY = {
  society_id: '', property_type: '', bhk: '', configuration: '',
  unit_number: '', tower: '',
  property_status: 'Ready To Move',   // market status: Ready To Move / New Launch / Under Construction
  listing_status: 'available',         // availability: available / sold / rented
  price: '', price_per_sqft: '', area_sqft: '', carpet_area: '',
  super_area: '', usable_area: '', floor_number: '', total_floors: '',
  facing: '', parking_slots: '', age_of_construction: '',
  furnishing_status: 'unfurnished', furnishing_details: [],
  property_description: '', highlights: [],
  layout_url: '', property_images: [], property_videos: [],
};

/* ─────────────────────────────────────────────────────────── */
const AgentListingForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { token } = useAgent();

  const [form, setForm]             = useState(EMPTY);
  const [societies, setSocieties]   = useState([]);
  const [loading, setLoading]       = useState(isEdit);
  const [saving, setSaving]         = useState(false);
  const [alert, setAlert]           = useState(null);
  const [ownerDocModal, setOwnerDocModal] = useState(null);

  /* custom "other" inputs */
  const [ptypeOther, setPtypeOther]       = useState(false);
  const [bhkOther, setBhkOther]           = useState(false);
  const [parkingOther, setParkingOther]   = useState(false);
  const [furnishInput, setFurnishInput]   = useState('');
  const [hlInput, setHlInput]             = useState('');

  /* media files */
  const [imgFiles, setImgFiles]         = useState([]);
  const [vidFiles, setVidFiles]         = useState([]);
  const [imgPreviews, setImgPreviews]   = useState([]);
  const [layoutFile, setLayoutFile]     = useState(null);
  const [layoutPreview, setLayoutPreview] = useState('');

  const imgInputRef    = useRef();
  const vidInputRef    = useRef();
  const layoutInputRef = useRef();

  /* fetch societies */
  useEffect(() => {
    getSocieties().then(r => setSocieties(r.data.data || [])).catch(() => {});
  }, []);

  /* load existing inventory in edit mode */
  useEffect(() => {
    if (!isEdit) return;
    getInventoryById(id, token)
      .then(r => {
        const d = r.data.data;
        const loadedType = d.property_type || '';
        const loadedBhk  = d.bhk || '';
        const loadedPark = d.parking_slots || '';
        setPtypeOther(!PROPERTY_TYPES.includes(loadedType) && !!loadedType);
        setBhkOther(!BHK_OPTIONS.includes(loadedBhk) && !!loadedBhk);
        setParkingOther(!PARKING_OPTIONS.includes(loadedPark) && !!loadedPark);
        setForm({
          ...EMPTY, ...d,
          society_id:         d.society?.society_id || '',
          furnishing_details: d.furnishing_details || [],
          highlights:         d.highlights         || [],
          property_images:    d.property_images    || [],
          property_videos:    d.property_videos    || [],
          listing_status:     d.listing_status     || 'available',
          property_status:    d.property_status    || 'Ready To Move',
        });
      })
      .catch(() => setAlert({ type: 'error', msg: 'Failed to load property.' }))
      .finally(() => setLoading(false));
  }, [id, token, isEdit]);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSocietyChange = (e) => {
    const sid = Number(e.target.value);
    if (!sid) { set('society_id', ''); return; }
    const s = societies.find(x => x.society_id === sid);
    setForm(prev => ({ ...prev, society_id: sid, sector: s?.sector || prev.sector, layout_url: '' }));
  };

  const selectedSociety = societies.find(s => s.society_id === Number(form.society_id));
  const societyLayouts  = getSocietyLayouts(selectedSociety);

  /* furnishing */
  const toggleFurnishing = (item) => {
    setForm(prev => {
      const list = prev.furnishing_details;
      return { ...prev, furnishing_details: list.includes(item) ? list.filter(x => x !== item) : [...list, item] };
    });
  };
  const addCustomFurnishing = () => {
    const v = furnishInput.trim();
    if (!v || form.furnishing_details.includes(v)) return;
    setForm(prev => ({ ...prev, furnishing_details: [...prev.furnishing_details, v] }));
    setFurnishInput('');
  };

  /* highlights */
  const addHighlight = () => {
    if (!hlInput.trim()) return;
    setForm(prev => ({ ...prev, highlights: [...prev.highlights, hlInput.trim()] }));
    setHlInput('');
  };
  const removeHighlight = (i) => setForm(prev => ({ ...prev, highlights: prev.highlights.filter((_, idx) => idx !== i) }));

  /* images */
  const handleImgFiles = (e) => {
    const files = Array.from(e.target.files);
    setImgFiles(prev => [...prev, ...files]);
    setImgPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    e.target.value = '';
  };
  const removeNewImg      = (i) => { URL.revokeObjectURL(imgPreviews[i]); setImgFiles(p => p.filter((_, idx) => idx !== i)); setImgPreviews(p => p.filter((_, idx) => idx !== i)); };
  const removeExistingImg = (i) => setForm(prev => ({ ...prev, property_images: prev.property_images.filter((_, idx) => idx !== i) }));

  /* videos */
  const handleVidFiles    = (e) => { setVidFiles(prev => [...prev, ...Array.from(e.target.files)]); e.target.value = ''; };
  const removeNewVid      = (i) => setVidFiles(p => p.filter((_, idx) => idx !== i));
  const removeExistingVid = (i) => setForm(prev => ({ ...prev, property_videos: prev.property_videos.filter((_, idx) => idx !== i) }));

  /* layout file */
  const handleLayoutFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLayoutFile(file);
    setLayoutPreview(URL.createObjectURL(file));
    e.target.value = '';
  };

  /* ── Submit ───────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    const required = [
      ['society_id',           'Please select a society.'],
      ['property_type',        'Property type is required.'],
      ['bhk',                  'BHK is required.'],
      ['configuration',        'Configuration is required.'],
      ['tower',                'Tower is required.'],
      ['unit_number',          'Unit number is required.'],
      ['property_status',      'Market status is required.'],
      ['listing_status',       'Availability status is required.'],
      ['price',                'Price is required.'],
      ['super_area',           'Super area is required.'],
      ['floor_number',         'Floor number is required.'],
      ['total_floors',         'Total floors is required.'],
      ['facing',               'Facing is required.'],
      ['parking_slots',        'Parking is required.'],
      ['property_description', 'Property description is required.'],
    ];
    for (const [field, msg] of required) {
      if (!form[field]) return setAlert({ type: 'error', msg });
    }
    if (!form.highlights.length) return setAlert({ type: 'error', msg: 'Add at least one highlight.' });

    setSaving(true);
    try {
      let imageUrls = [...form.property_images];
      let videoUrls = [...form.property_videos];
      let layoutUrl = form.layout_url;

      if (imgFiles.length) {
        const fd = new FormData();
        imgFiles.forEach(f => fd.append('images', f));
        const res = await uploadPropertyImages(fd, token);
        imageUrls = [...imageUrls, ...(res.data.data || [])];
      }

      if (vidFiles.length) {
        const fd = new FormData();
        vidFiles.forEach(f => fd.append('videos', f));
        const res = await uploadPropertyVideos(fd, token);
        videoUrls = [...videoUrls, ...(res.data.data || [])];
      }

      if (layoutFile) {
        const fd = new FormData();
        fd.append('images', layoutFile);
        const res = await uploadPropertyImages(fd, token);
        layoutUrl = (res.data.data || [])[0] || layoutUrl;
      }

      const payload = { ...form, property_images: imageUrls, property_videos: videoUrls, layout_url: layoutUrl };

      if (isEdit) {
        await updateInventory(id, payload, token);
        setAlert({ type: 'success', msg: 'Property updated!' });
        setTimeout(() => navigate('/agent/listings'), 1800);
      } else {
        const res = await createInventory(payload, token);
        const newId = res.data.data?.residential_id;
        const society = societies.find(s => s.society_id === Number(form.society_id));
        const label = [form.bhk && `${form.bhk} BHK`, society?.society_name].filter(Boolean).join(' in ') || 'Property';
        setOwnerDocModal({ residentialId: newId, propertyLabel: label });
      }
    } catch (err) {
      setAlert({ type: 'error', msg: err.response?.data?.message || 'Something went wrong.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <AgentLayout pageTitle="Edit Property">
      <Typography sx={{ color: '#64748b', p: 4 }}>Loading...</Typography>
    </AgentLayout>
  );

  if (ownerDocModal) {
    return (
      <OwnerDocForm
        residentialId={ownerDocModal.residentialId}
        propertyLabel={ownerDocModal.propertyLabel}
        onClose={() => navigate('/agent/listings')}
        onSubmitted={() => { setOwnerDocModal(null); navigate('/agent/listings'); }}
      />
    );
  }

  return (
    <AgentLayout pageTitle={isEdit ? 'Edit Property' : 'Add New Property'}>
      <BackBtn onClick={() => navigate('/agent/listings')}>
        <FiArrowLeft /> Back to Listings
      </BackBtn>

      {alert && (
        <Alert variant={alert.type}>
          {alert.type === 'success' ? <FiCheckCircle style={{ marginTop: 1 }} /> : <FiAlertCircle style={{ marginTop: 1 }} />}
          {alert.msg}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>

        {/* ── Society ─────────────────────────────────── */}
        <Card>
          <CardTitle>Select Society *</CardTitle>
          <Field>
            <Label>Society / Project *</Label>
            <Select value={form.society_id} onChange={handleSocietyChange} required>
              <option value="">— Select a Society —</option>
              {societies.map(s => (
                <option key={s.society_id} value={s.society_id}>
                  {s.society_name}{s.sector ? ` · ${s.sector}` : ''}
                </option>
              ))}
            </Select>
          </Field>
        </Card>

        {/* ── Basic Info ──────────────────────────────── */}
        <Card>
          <CardTitle>Basic Information</CardTitle>
          <Grid cols={3}>

            {/* Property Type */}
            <Field>
              <Label>Property Type *</Label>
              <Select
                value={ptypeOther ? 'other' : (form.property_type || '')}
                onChange={e => {
                  if (e.target.value === 'other') { setPtypeOther(true); set('property_type', ''); }
                  else { setPtypeOther(false); set('property_type', e.target.value); }
                }}
              >
                <option value="">— Select Type —</option>
                {PROPERTY_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                <option value="other">Other (type manually)</option>
              </Select>
              {ptypeOther && (
                <Input
                  value={form.property_type}
                  onChange={e => set('property_type', e.target.value)}
                  placeholder="e.g. Independent Floor"
                  autoFocus
                />
              )}
            </Field>

            {/* BHK */}
            <Field>
              <Label>BHK *</Label>
              <Select
                value={bhkOther ? 'other' : (form.bhk || '')}
                onChange={e => {
                  if (e.target.value === 'other') { setBhkOther(true); set('bhk', ''); }
                  else { setBhkOther(false); set('bhk', e.target.value); }
                }}
              >
                <option value="">Select BHK</option>
                {BHK_OPTIONS.map(v => <option key={v} value={v}>{v} BHK</option>)}
                <option value="other">Other (type manually)</option>
              </Select>
              {bhkOther && (
                <Input
                  value={form.bhk}
                  onChange={e => set('bhk', e.target.value)}
                  placeholder="e.g. 2.5 BHK + Study"
                  autoFocus
                />
              )}
            </Field>

            {/* Configuration */}
            <Field>
              <Label>Configuration *</Label>
              <Input
                value={form.configuration}
                onChange={e => set('configuration', e.target.value)}
                placeholder="e.g. 3BHK + 3T + Study"
                required
              />
              <HintText>e.g. 2BHK+2T, 3BHK+Servant Room, 4BHK+Terrace</HintText>
            </Field>

            {/* Tower */}
            <Field>
              <Label>Tower *</Label>
              <Input
                value={form.tower}
                onChange={e => set('tower', e.target.value)}
                placeholder="e.g. Tower A, T-3"
                required
              />
            </Field>

            {/* Unit Number */}
            <Field>
              <Label>Unit Number *</Label>
              <Input
                value={form.unit_number}
                onChange={e => set('unit_number', e.target.value)}
                placeholder="e.g. A-402, B-1203"
                required
              />
            </Field>

            {/* Age of Construction */}
            <Field>
              <OptLabel>Age of Construction <span>(Opt)</span></OptLabel>
              <Input value={form.age_of_construction} onChange={e => set('age_of_construction', e.target.value)} placeholder="e.g. 2 years / New" />
            </Field>
          </Grid>

          {/* Two Status Fields */}
          <Grid cols={2} style={{ marginTop: 16 }}>
            <Field>
              <Label>Market Status *</Label>
              <Select value={form.property_status} onChange={e => set('property_status', e.target.value)} required>
                <option value="Ready To Move">Ready To Move</option>
                <option value="New Launch">New Launch</option>
                <option value="Under Construction">Under Construction</option>
              </Select>
              <HintText>Construction / launch stage of the property</HintText>
            </Field>
            <Field>
              <Label>Availability Status *</Label>
              <Select value={form.listing_status} onChange={e => set('listing_status', e.target.value)} required>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </Select>
              <HintText>Current availability of the unit</HintText>
            </Field>
          </Grid>
        </Card>

        {/* ── Pricing & Area ──────────────────────────── */}
        <Card>
          <CardTitle>Pricing & Area</CardTitle>
          <Grid cols={3}>
            <Field>
              <Label>Price (₹) *</Label>
              <Input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="e.g. 7500000" required />
            </Field>
            <Field>
              <OptLabel>Price per sq.ft. <span>(Opt)</span></OptLabel>
              <Input type="number" value={form.price_per_sqft} onChange={e => set('price_per_sqft', e.target.value)} placeholder="e.g. 6250" />
            </Field>
            <Field>
              <Label>Super Area (sq.ft.) *</Label>
              <Input type="number" value={form.super_area} onChange={e => set('super_area', e.target.value)} placeholder="e.g. 1800" required />
            </Field>
            <Field>
              <OptLabel>Carpet Area <span>(Opt)</span></OptLabel>
              <Input value={form.carpet_area} onChange={e => set('carpet_area', e.target.value)} placeholder="e.g. 1200 sq.ft." />
            </Field>
            <Field>
              <OptLabel>Usable Area <span>(Opt)</span></OptLabel>
              <Input value={form.usable_area} onChange={e => set('usable_area', e.target.value)} placeholder="e.g. 1150 sq.ft." />
            </Field>
            <Field>
              <OptLabel>Built-up Area (sq.ft.) <span>(Opt)</span></OptLabel>
              <Input type="number" value={form.area_sqft} onChange={e => set('area_sqft', e.target.value)} placeholder="e.g. 1500" />
            </Field>
          </Grid>
        </Card>

        {/* ── Property Details ────────────────────────── */}
        <Card>
          <CardTitle>Property Details</CardTitle>
          <Grid cols={3}>
            <Field>
              <Label>Floor Number *</Label>
              <Input value={form.floor_number} onChange={e => set('floor_number', e.target.value)} placeholder="e.g. 5, Ground, Low Rise" required />
            </Field>
            <Field>
              <Label>Total Floors *</Label>
              <Input type="number" value={form.total_floors} onChange={e => set('total_floors', e.target.value)} placeholder="e.g. 20" required />
            </Field>
            <Field>
              <Label>Facing *</Label>
              <Select value={form.facing} onChange={e => set('facing', e.target.value)} required>
                <option value="">Select Facing</option>
                {FACINGS.map(f => <option key={f} value={f}>{f}</option>)}
              </Select>
            </Field>

            {/* Parking with manual entry */}
            <Field>
              <Label>Parking *</Label>
              <Select
                value={parkingOther ? 'other' : (form.parking_slots || '')}
                onChange={e => {
                  if (e.target.value === 'other') { setParkingOther(true); set('parking_slots', ''); }
                  else { setParkingOther(false); set('parking_slots', e.target.value); }
                }}
              >
                <option value="">Select Parking</option>
                {PARKING_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                <option value="other">Other (type manually)</option>
              </Select>
              {parkingOther && (
                <Input
                  value={form.parking_slots}
                  onChange={e => set('parking_slots', e.target.value)}
                  placeholder="e.g. 2 Covered + 1 Open"
                  autoFocus
                />
              )}
            </Field>
          </Grid>
        </Card>

        {/* ── Furnishing ──────────────────────────────── */}
        <Card>
          <CardTitle>Furnishing</CardTitle>
          <Field style={{ marginBottom: 16 }}>
            <Label>Furnishing Status</Label>
            <Select value={form.furnishing_status} onChange={e => set('furnishing_status', e.target.value)}>
              <option value="unfurnished">Unfurnished</option>
              <option value="semi-furnished">Semi Furnished</option>
              <option value="fully-furnished">Fully Furnished</option>
            </Select>
          </Field>
          <Label style={{ display: 'block', marginBottom: 10 }}>Included Items</Label>
          <CheckGrid>
            {[...FURNISHINGS, ...form.furnishing_details.filter(x => !FURNISHINGS.includes(x))].map(item => (
              <CheckItem key={item} checked={form.furnishing_details.includes(item) ? 1 : 0}>
                <input type="checkbox" style={{ display: 'none' }} checked={form.furnishing_details.includes(item)} onChange={() => toggleFurnishing(item)} />
                {form.furnishing_details.includes(item) ? <FiCheckCircle style={{ fontSize: 14 }} /> : <Box sx={{ width: 14, height: 14, border: `1.5px solid ${t.border}`, borderRadius: 3 }} />}
                {item}
              </CheckItem>
            ))}
          </CheckGrid>
          {/* Custom furnishing item */}
          <Box sx={{ display: 'flex', gap: 8, mt: 12 }}>
            <Input
              value={furnishInput}
              onChange={e => setFurnishInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomFurnishing(); } }}
              placeholder="Add custom item (e.g. Home Theatre)"
              style={{ flex: 1 }}
            />
            <SubmitBtn type="button" onClick={addCustomFurnishing} style={{ padding: '10px 16px' }}>
              <FiPlus />
            </SubmitBtn>
          </Box>
          <HintText>Press Enter or click + to add a custom furnishing item</HintText>
        </Card>

        {/* ── Description & Highlights ─────────────────── */}
        <Card>
          <CardTitle>Description & Highlights</CardTitle>
          <Field style={{ marginBottom: 16 }}>
            <Label>Property Description *</Label>
            <Textarea
              value={form.property_description}
              onChange={e => set('property_description', e.target.value)}
              placeholder={`Describe the property in detail...\n\ne.g. A beautifully designed 3BHK apartment on the 8th floor of Tower A offering panoramic views of the Aravalli range. The unit features a large living area with East-West cross ventilation, modular kitchen with granite countertop, and premium vitrified flooring throughout. Located in a premium gated community with 24/7 security, clubhouse, swimming pool, and landscaped gardens.`}
              style={{ minHeight: 140 }}
            />
          </Field>
          <Field>
            <Label>Highlights * <span style={{ fontSize: 11, color: t.textLight, fontWeight: 400 }}>(type and press Enter)</span></Label>
            <TagWrap>
              {form.highlights.map((h, i) => (
                <Tag key={i}>{h} <FiX style={{ cursor: 'pointer', fontSize: 11 }} onClick={() => removeHighlight(i)} /></Tag>
              ))}
              <TagInput
                value={hlInput}
                onChange={e => setHlInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addHighlight(); } }}
                placeholder="e.g. Park View, Corner Unit, Vastu Compliant, Near Metro..."
              />
            </TagWrap>
            <HintText>e.g. East Facing · Park View · Corner Unit · Spacious Balcony · Premium Fittings</HintText>
          </Field>
        </Card>

        {/* ── Media ───────────────────────────────────── */}
        <Card>
          <CardTitle>Photos & Videos</CardTitle>

          <Label style={{ display: 'block', marginBottom: 8 }}>Property Photos</Label>
          <input ref={imgInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleImgFiles} />
          <DropZone onClick={() => imgInputRef.current?.click()}>
            <FiUploadCloud style={{ fontSize: 28, color: t.textSec }} />
            <Typography sx={{ fontSize: 14, color: t.textSec }}>Click to upload photos from your device</Typography>
            <Typography sx={{ fontSize: 12, color: t.textLight }}>JPG, PNG, WEBP — max 20 files</Typography>
          </DropZone>

          {form.property_images.length > 0 && (
            <MediaRow>
              {form.property_images.map((url, i) => (
                <Thumb key={`ex-${i}`}>
                  <ThumbImg src={url} alt="" />
                  <ThumbDel type="button" onClick={() => removeExistingImg(i)}><FiX /></ThumbDel>
                </Thumb>
              ))}
            </MediaRow>
          )}

          {imgPreviews.length > 0 && (
            <MediaRow>
              {imgPreviews.map((src, i) => (
                <Thumb key={`new-${i}`}>
                  <ThumbImg src={src} alt="" />
                  <ThumbDel type="button" onClick={() => removeNewImg(i)}><FiX /></ThumbDel>
                  <Box sx={{ position: 'absolute', bottom: 3, left: 3, background: t.primary, color: 'white', fontSize: 9, borderRadius: 2, px: '4px' }}>NEW</Box>
                </Thumb>
              ))}
            </MediaRow>
          )}

          {/* Videos */}
          <Box sx={{ mt: 3 }}>
            <Label style={{ display: 'block', marginBottom: 8 }}>Property Videos</Label>
            <input ref={vidInputRef} type="file" accept="video/*" multiple style={{ display: 'none' }} onChange={handleVidFiles} />
            <DropZone onClick={() => vidInputRef.current?.click()}>
              <FiUploadCloud style={{ fontSize: 28, color: t.textSec }} />
              <Typography sx={{ fontSize: 14, color: t.textSec }}>Click to upload videos from your device</Typography>
              <Typography sx={{ fontSize: 12, color: t.textLight }}>MP4, MOV, AVI — max 5 files</Typography>
            </DropZone>
            {form.property_videos.map((url, i) => (
              <VideoFile key={`exv-${i}`} sx={{ mt: 1 }}>
                <span>Video {i + 1}</span>
                <FiTrash2 style={{ cursor: 'pointer', color: t.danger }} onClick={() => removeExistingVid(i)} />
              </VideoFile>
            ))}
            {vidFiles.map((f, i) => (
              <VideoFile key={`newv-${i}`} sx={{ mt: 1 }}>
                <span>{f.name}</span>
                <FiTrash2 style={{ cursor: 'pointer', color: t.danger }} onClick={() => removeNewVid(i)} />
              </VideoFile>
            ))}
          </Box>
        </Card>

        {/* ── Layout / Floor Plan ─────────────────────── */}
        <Card>
          <CardTitle>Layout / Floor Plan</CardTitle>

          {/* Society layouts */}
          {societyLayouts.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Label style={{ display: 'block', marginBottom: 10 }}>Select from Society Layouts</Label>
              <LayoutGrid>
                {societyLayouts.map((url, i) => (
                  <LayoutThumb
                    key={i}
                    selected={form.layout_url === url ? 1 : 0}
                    onClick={() => { set('layout_url', url); setLayoutFile(null); setLayoutPreview(''); }}
                  >
                    <img src={url} alt={`Layout ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {form.layout_url === url && <LayoutCheck><FiCheckCircle /></LayoutCheck>}
                  </LayoutThumb>
                ))}
              </LayoutGrid>
            </Box>
          )}

          {/* Upload custom layout */}
          <Label style={{ display: 'block', marginBottom: 8 }}>
            {societyLayouts.length > 0 ? 'Or Upload Your Own Layout' : 'Upload Layout / Floor Plan'}
          </Label>
          <input ref={layoutInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLayoutFile} />

          {layoutPreview ? (
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <img src={layoutPreview} alt="Layout preview" style={{ maxWidth: 300, maxHeight: 200, borderRadius: 8, border: `1px solid ${t.border}` }} />
              <ThumbDel type="button" style={{ width: 24, height: 24, top: 6, right: 6, fontSize: 13 }}
                onClick={() => { setLayoutFile(null); setLayoutPreview(''); }}>
                <FiX />
              </ThumbDel>
            </Box>
          ) : form.layout_url && !societyLayouts.includes(form.layout_url) ? (
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <img src={form.layout_url} alt="Layout" style={{ maxWidth: 300, maxHeight: 200, borderRadius: 8, border: `1px solid ${t.border}` }} />
              <ThumbDel type="button" style={{ width: 24, height: 24, top: 6, right: 6, fontSize: 13 }}
                onClick={() => set('layout_url', '')}>
                <FiX />
              </ThumbDel>
            </Box>
          ) : (
            <DropZone onClick={() => layoutInputRef.current?.click()} style={{ padding: '20px' }}>
              <FiUploadCloud style={{ fontSize: 24, color: t.textSec }} />
              <Typography sx={{ fontSize: 13, color: t.textSec }}>Click to upload a floor plan image</Typography>
            </DropZone>
          )}
        </Card>

        <SubmitRow>
          <SubmitBtn type="submit" disabled={saving}>
            {saving ? (imgFiles.length || vidFiles.length || layoutFile ? 'Uploading & Saving...' : 'Saving...') : (isEdit ? 'Save Changes' : 'List Property')}
          </SubmitBtn>
          <CancelBtn type="button" onClick={() => navigate('/agent/listings')}>Cancel</CancelBtn>
        </SubmitRow>
      </form>
    </AgentLayout>
  );
};

export default AgentListingForm;
