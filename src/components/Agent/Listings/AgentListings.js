import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlusSquare, FiEdit2, FiTrash2, FiSearch, FiAlertCircle } from 'react-icons/fi';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import AgentLayout from '../AgentLayout';
import { useAgent } from '../../../context/AgentContext';
import { getMyInventory, deleteInventory } from '../../../services/agentApi';

const t = {
  primary: '#0d5aa7', danger: '#ef4444', success: '#10b981', warning: '#f59e0b',
  text: '#1e293b', textSec: '#64748b', bg: '#f1f5f9', bgWhite: '#ffffff',
  border: '#e2e8f0', shadow: '0 1px 3px rgba(0,0,0,0.08)',
};

const Toolbar   = styled(Box)({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' });
const SearchBox = styled(Box)({ display: 'flex', alignItems: 'center', gap: 8, background: t.bgWhite, border: `1px solid ${t.border}`, borderRadius: 8, padding: '8px 14px', flex: 1, maxWidth: 320, '& svg': { color: t.textSec, flexShrink: 0 } });
const SearchInput = styled('input')({ border: 'none', outline: 'none', fontSize: 14, width: '100%', background: 'transparent', color: t.text, '&::placeholder': { color: '#94a3b8' } });
const AddBtn    = styled('button')({ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: t.primary, color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s', '&:hover': { background: '#0a4a8c' }, '& svg': { fontSize: 18 } });

const Table     = styled(Box)({ background: t.bgWhite, borderRadius: 12, boxShadow: t.shadow, border: `1px solid ${t.border}`, overflow: 'hidden' });
const THead     = styled(Box)({ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1.4fr 90px', padding: '12px 20px', background: t.bg, borderBottom: `1px solid ${t.border}`, '@media (max-width: 768px)': { display: 'none' } });
const THeadCell = styled('span')({ fontSize: 11, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 });
const TRow      = styled(Box)({ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1.4fr 90px', padding: '14px 20px', borderBottom: `1px solid ${t.border}`, alignItems: 'center', transition: 'background 0.15s', cursor: 'pointer', '&:last-child': { borderBottom: 'none' }, '&:hover': { background: '#f0f6ff' }, '@media (max-width: 768px)': { gridTemplateColumns: '1fr', gap: 8, paddingBottom: 16 } });
const TCell     = styled(Typography)({ fontSize: 13, color: t.text });
const TCellSec  = styled(Typography)({ fontSize: 12, color: t.textSec });

const StatusBadge = styled(Box)(({ status }) => ({
  display: 'inline-flex', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, width: 'fit-content', textTransform: 'capitalize',
  ...(status === 'available' ? { background: 'rgba(16,185,129,0.1)', color: '#10b981' }
    : status === 'sold'      ? { background: 'rgba(239,68,68,0.1)',   color: '#ef4444' }
    : status === 'ready to move' ? { background: 'rgba(13,90,167,0.1)', color: '#0d5aa7' }
    : { background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }),
}));

const LISTING_STATUS_MAP = {
  submitted:            { label: 'Submitted',             color: '#f59e0b', bg: 'rgba(245,158,11,0.1)'  },
  validated:            { label: 'Validated',              color: '#0d5aa7', bg: 'rgba(13,90,167,0.1)'  },
  documents_submitted:  { label: 'Docs Submitted',        color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
  documents_verified:   { label: 'Awaiting Signature',    color: '#0d5aa7', bg: 'rgba(13,90,167,0.1)'  },
  active:               { label: 'Live',                  color: '#10b981', bg: 'rgba(16,185,129,0.1)'  },
};

const ListingStatusBadge = styled(Box)(({ lstatus }) => {
  const cfg = LISTING_STATUS_MAP[lstatus] || { label: lstatus, color: '#64748b', bg: 'rgba(100,116,139,0.1)' };
  return {
    display: 'inline-flex', padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700,
    width: 'fit-content', textTransform: 'uppercase', letterSpacing: 0.3,
    color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}33`,
  };
});

const IconBtn = styled('button')(({ danger }) => ({
  width: 32, height: 32, border: `1px solid ${danger ? 'rgba(239,68,68,0.3)' : t.border}`, borderRadius: 6,
  background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: danger ? t.danger : t.textSec, fontSize: 15, transition: 'all 0.2s',
  '&:hover': { background: danger ? 'rgba(239,68,68,0.08)' : t.bg, borderColor: danger ? t.danger : t.primary, color: danger ? t.danger : t.primary },
}));

const EmptyBox       = styled(Box)({ textAlign: 'center', padding: '60px 20px', color: t.textSec });
const ConfirmOverlay = styled(Box)({ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 });
const ConfirmCard    = styled(Box)({ background: t.bgWhite, borderRadius: 14, padding: '32px', maxWidth: 400, width: '100%', textAlign: 'center' });

const formatPrice = (p) => {
  if (!p) return '—';
  const n = parseFloat(p);
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

const AgentListings = () => {
  const [listings, setListings]       = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting]       = useState(false);
  const { token } = useAgent();
  const navigate  = useNavigate();

  useEffect(() => {
    getMyInventory(token)
      .then(res => { setListings(res.data.data || []); setFiltered(res.data.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (!search.trim()) { setFiltered(listings); return; }
    const q = search.toLowerCase();
    setFiltered(listings.filter(l =>
      l.society?.society_name?.toLowerCase().includes(q) ||
      l.bhk?.toLowerCase().includes(q) ||
      l.property_status?.toLowerCase().includes(q) ||
      l.property_type?.toLowerCase().includes(q)
    ));
  }, [search, listings]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteInventory(deleteTarget, token);
      setListings(prev => prev.filter(l => l.residential_id !== deleteTarget));
    } catch {}
    finally { setDeleting(false); setDeleteTarget(null); }
  };

  const label = (l) => {
    const bhk = l.bhk ? `${l.bhk} BHK` : null;
    const soc  = l.society?.society_name;
    if (bhk && soc) return `${bhk} in ${soc}`;
    return bhk || soc || l.property_type || 'Property';
  };

  return (
    <AgentLayout pageTitle="My Listings">
      <Toolbar>
        <SearchBox>
          <FiSearch />
          <SearchInput placeholder="Search by society, BHK, type..." value={search} onChange={e => setSearch(e.target.value)} />
        </SearchBox>
        <AddBtn onClick={() => navigate('/agent/listings/new')}>
          <FiPlusSquare /> Add Property
        </AddBtn>
      </Toolbar>

      <Table>
        <THead>
          <THeadCell>Property</THeadCell>
          <THeadCell>Price</THeadCell>
          <THeadCell>Type</THeadCell>
          <THeadCell>Verification</THeadCell>
          <THeadCell>Actions</THeadCell>
        </THead>

        {loading ? (
          <EmptyBox>Loading your listings...</EmptyBox>
        ) : filtered.length === 0 ? (
          <EmptyBox>
            {search ? 'No listings match your search.' : (
              <>No properties listed yet.{' '}
                <span style={{ color: t.primary, cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('/agent/listings/new')}>
                  Add your first one →
                </span>
              </>
            )}
          </EmptyBox>
        ) : (
          filtered.map(l => (
            <TRow key={l.residential_id} onClick={() => navigate(`/agent/listings/${l.residential_id}`)}>
              <Box>
                <TCell sx={{ fontWeight: 600 }}>{label(l)}</TCell>
                <TCellSec>
                  {[l.bhk && `${l.bhk} BHK`, l.area_sqft && `${l.area_sqft} sqft`, l.society?.sector].filter(Boolean).join(' · ')}
                </TCellSec>
              </Box>
              <TCell>{formatPrice(l.price)}</TCell>
              <TCell sx={{ textTransform: 'capitalize' }}>{l.property_type || '—'}</TCell>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <StatusBadge status={l.property_status}>{l.property_status || '—'}</StatusBadge>
                <ListingStatusBadge lstatus={l.listing_status || 'submitted'}>
                  {(LISTING_STATUS_MAP[l.listing_status] || { label: l.listing_status || 'Submitted' }).label}
                </ListingStatusBadge>
              </Box>
              <Box sx={{ display: 'flex', gap: '6px' }} onClick={e => e.stopPropagation()}>
                <IconBtn onClick={() => navigate(`/agent/listings/${l.residential_id}/edit`)} title="Edit"><FiEdit2 /></IconBtn>
                <IconBtn danger="true" onClick={() => setDeleteTarget(l.residential_id)} title="Delete"><FiTrash2 /></IconBtn>
              </Box>
            </TRow>
          ))
        )}
      </Table>

      {deleteTarget && (
        <ConfirmOverlay>
          <ConfirmCard>
            <FiAlertCircle style={{ fontSize: 40, color: t.danger, marginBottom: 12 }} />
            <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 1 }}>Delete Property?</Typography>
            <Typography sx={{ fontSize: 14, color: t.textSec, mb: 3 }}>This will remove it from Hot Properties too. Cannot be undone.</Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <button onClick={() => setDeleteTarget(null)} style={{ padding: '10px 24px', border: `1px solid ${t.border}`, borderRadius: 8, background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>Cancel</button>
              <button onClick={handleDelete} disabled={deleting} style={{ padding: '10px 24px', border: 'none', borderRadius: 8, background: t.danger, color: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </Box>
          </ConfirmCard>
        </ConfirmOverlay>
      )}
    </AgentLayout>
  );
};

export default AgentListings;
