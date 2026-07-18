import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiList, FiCheckCircle, FiClock, FiPlusSquare, FiTrendingUp, FiHome } from 'react-icons/fi';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import AgentLayout from '../AgentLayout';
import { useAgent } from '../../../context/AgentContext';
import { getMyListings } from '../../../services/agentApi';

const t = {
  primary: '#0d5aa7', success: '#10b981', warning: '#f59e0b', danger: '#ef4444',
  text: '#1e293b', textSec: '#64748b', bg: '#f1f5f9', bgWhite: '#ffffff',
  border: '#e2e8f0', shadow: '0 1px 3px rgba(0,0,0,0.08)',
};

const Grid = styled(Box)({ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20,
  '@media (max-width: 1024px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
  '@media (max-width: 576px)': { gridTemplateColumns: '1fr 1fr' },
});
const StatCard = styled(Box)(({ color }) => ({
  background: t.bgWhite, borderRadius: 12, padding: '20px 24px',
  boxShadow: t.shadow, border: `1px solid ${t.border}`,
  borderLeft: `4px solid ${color || t.primary}`,
}));
const StatNum = styled(Typography)({ fontSize: 32, fontWeight: 800, color: t.text, lineHeight: 1 });
const StatLabel = styled(Typography)({ fontSize: 13, color: t.textSec, marginTop: 6, fontWeight: 500 });
const StatIcon = styled(Box)(({ color }) => ({
  width: 40, height: 40, borderRadius: 10, background: `${color}18`,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: color, marginBottom: 12, '& svg': { fontSize: 20 },
}));

const Section = styled(Box)({ marginTop: 28 });
const SectionTitle = styled(Typography)({ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 16 });
const RecentTable = styled(Box)({ background: t.bgWhite, borderRadius: 12, boxShadow: t.shadow, border: `1px solid ${t.border}`, overflow: 'hidden' });
const TableHead = styled(Box)({ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 20px',
  background: t.bg, borderBottom: `1px solid ${t.border}`,
  '& span': { fontSize: 12, fontWeight: 700, color: t.textSec, textTransform: 'uppercase', letterSpacing: 0.5 },
  '@media (max-width: 576px)': { gridTemplateColumns: '2fr 1fr 1fr' },
});
const TableRow = styled(Box)({ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '14px 20px',
  borderBottom: `1px solid ${t.border}`, alignItems: 'center', transition: 'background 0.15s',
  '&:last-child': { borderBottom: 'none' },
  '&:hover': { background: t.bg },
  '@media (max-width: 576px)': { gridTemplateColumns: '2fr 1fr 1fr' },
});
const TCell = styled(Typography)({ fontSize: 13, color: t.text });
const TCellSec = styled(Typography)({ fontSize: 12, color: t.textSec });

const StatusBadge = styled(Box)(({ status }) => ({
  display: 'inline-flex', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
  ...(status === 'available' ? { background: 'rgba(16,185,129,0.1)', color: '#10b981' }
    : status === 'sold' ? { background: 'rgba(239,68,68,0.1)', color: '#ef4444' }
    : { background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }),
}));

const QuickBtn = styled('button')({
  display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px',
  background: t.bgWhite, border: `1px solid ${t.border}`, borderRadius: 10,
  cursor: 'pointer', fontSize: 14, fontWeight: 600, color: t.text,
  transition: 'all 0.2s ease', fontFamily: 'inherit',
  '&:hover': { borderColor: t.primary, color: t.primary, background: 'rgba(13,90,167,0.04)' },
  '& svg': { fontSize: 18, color: t.primary },
});

const EmptyBox = styled(Box)({ textAlign: 'center', padding: '40px 20px', color: t.textSec });

const formatPrice = (p) => {
  if (!p) return '—';
  const n = parseFloat(p);
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

const AgentDashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, agent } = useAgent();
  const navigate = useNavigate();

  useEffect(() => {
    getMyListings(token)
      .then(res => setListings(res.data.data || []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, [token]);

  const total     = listings.length;
  const available = listings.filter(l => l.status === 'available').length;
  const sold      = listings.filter(l => l.status === 'sold').length;
  const rented    = listings.filter(l => l.status === 'rented').length;
  const recent    = listings.slice(0, 5);

  return (
    <AgentLayout pageTitle="Dashboard">
      <Typography sx={{ fontSize: 14, color: '#64748b', mb: 3 }}>
        Welcome back, <strong>{agent?.name}</strong>! Here's your listings overview.
      </Typography>

      <Grid>
        <StatCard color={t.primary}>
          <StatIcon color={t.primary}><FiList /></StatIcon>
          <StatNum>{loading ? '—' : total}</StatNum>
          <StatLabel>Total Listings</StatLabel>
        </StatCard>
        <StatCard color={t.success}>
          <StatIcon color={t.success}><FiCheckCircle /></StatIcon>
          <StatNum>{loading ? '—' : available}</StatNum>
          <StatLabel>Available</StatLabel>
        </StatCard>
        <StatCard color={t.danger}>
          <StatIcon color={t.danger}><FiTrendingUp /></StatIcon>
          <StatNum>{loading ? '—' : sold}</StatNum>
          <StatLabel>Sold</StatLabel>
        </StatCard>
        <StatCard color={t.warning}>
          <StatIcon color={t.warning}><FiClock /></StatIcon>
          <StatNum>{loading ? '—' : rented}</StatNum>
          <StatLabel>Rented</StatLabel>
        </StatCard>
      </Grid>

      {/* Quick actions */}
      <Section>
        <SectionTitle>Quick Actions</SectionTitle>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <QuickBtn onClick={() => navigate('/agent/listings/new')}>
            <FiPlusSquare /> Add New Property
          </QuickBtn>
          <QuickBtn onClick={() => navigate('/agent/listings')}>
            <FiHome />  My Listings
          </QuickBtn>
        </Box>
      </Section>

      {/* Recent listings */}
      <Section>
        <SectionTitle>Recent Listings</SectionTitle>
        <RecentTable>
          <TableHead>
            <span>Property</span>
            <span>Price</span>
            <span>Status</span>
            <span style={{ '@media (max-width: 576px)': { display: 'none' } }}>Added</span>
          </TableHead>
          {loading ? (
            <EmptyBox>Loading...</EmptyBox>
          ) : recent.length === 0 ? (
            <EmptyBox>
              No listings yet.{' '}
              <span
                style={{ color: t.primary, cursor: 'pointer', fontWeight: 600 }}
                onClick={() => navigate('/agent/listings/new')}
              >
                Add your first property →
              </span>
            </EmptyBox>
          ) : (
            recent.map(l => (
              <TableRow key={l.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/agent/listings/${l.id}/edit`)}>
                <Box>
                  <TCell sx={{ fontWeight: 600 }}>{l.title}</TCell>
                  <TCellSec>{[l.bhk && `${l.bhk} BHK`, l.sector, l.city].filter(Boolean).join(' · ')}</TCellSec>
                </Box>
                <TCell>{formatPrice(l.price)}</TCell>
                <Box><StatusBadge status={l.status}>{l.status}</StatusBadge></Box>
                <TCellSec>{new Date(l.created_at).toLocaleDateString('en-IN')}</TCellSec>
              </TableRow>
            ))
          )}
        </RecentTable>
      </Section>
    </AgentLayout>
  );
};

export default AgentDashboard;
