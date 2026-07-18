import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiClock, FiFileText, FiChevronRight, FiMail } from 'react-icons/fi';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import AgentLayout from '../AgentLayout';
import { useAgent } from '../../../context/AgentContext';
import { getInventoryById } from '../../../services/agentApi';
import OwnerDocForm from '../OwnerDocForm/OwnerDocForm';

const t = {
  primary: '#0d5aa7', text: '#1e293b', textSec: '#64748b', textLight: '#94a3b8',
  bg: '#f1f5f9', bgWhite: '#ffffff', border: '#e2e8f0',
  success: '#10b981', warning: '#f59e0b', danger: '#ef4444',
  shadow: '0 2px 8px rgba(0,0,0,0.07)',
};

const STEPS = [
  { key: 'submitted',           label: 'Property Submitted',   desc: 'Your listing is submitted and awaiting admin review.' },
  { key: 'validated',           label: 'Property Validated',   desc: 'Validated by admin. Submit owner documents to proceed.' },
  { key: 'documents_submitted', label: 'Owner Docs Submitted', desc: 'Owner documents submitted and under verification.' },
  { key: 'documents_verified',  label: 'Documents Verified',   desc: 'Documents verified. Digital signature emails sent to owner and agent.' },
  { key: 'active',              label: 'Property Live',        desc: 'Both parties signed. Property is now live on Instayards!' },
];

const STATUS_ORDER = ['submitted', 'validated', 'documents_submitted', 'documents_verified', 'active'];
const getStepIdx = (s) => { const i = STATUS_ORDER.indexOf(s); return i === -1 ? 0 : i; };

const formatPrice = (p) => {
  if (!p) return '—';
  const n = parseFloat(p);
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};

const STATUS_CFG = {
  submitted:            { label: 'Submitted',      color: '#f59e0b', bg: 'rgba(245,158,11,0.1)'  },
  validated:            { label: 'Validated',       color: '#0d5aa7', bg: 'rgba(13,90,167,0.1)'  },
  documents_submitted:  { label: 'Docs Submitted', color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
  documents_verified:   { label: 'Docs Verified',  color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  active:               { label: 'Live',            color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
};

const BackBtn = styled('button')({
  width: 38, height: 38, border: `1px solid ${t.border}`, borderRadius: 8,
  background: t.bgWhite, cursor: 'pointer', display: 'flex', alignItems: 'center',
  justifyContent: 'center', color: t.textSec, fontSize: 17, flexShrink: 0,
  '&:hover': { borderColor: t.primary, color: t.primary },
});

const Card = styled(Box)({
  background: t.bgWhite, borderRadius: 14, border: `1px solid ${t.border}`,
  boxShadow: t.shadow, padding: '24px',
});

const CardTitle = styled(Typography)({
  fontSize: 11, fontWeight: 700, color: t.textSec, textTransform: 'uppercase',
  letterSpacing: 0.7, marginBottom: 20,
});

const SubmitDocsBtn = styled('button')({
  display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px',
  background: t.primary, color: 'white', border: 'none', borderRadius: 10,
  fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
  marginTop: 16, '&:hover': { background: '#0a4a8c' },
});

const DocRow = styled(Box)({
  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
  padding: '9px 0', borderBottom: `1px solid ${t.border}`,
  '&:last-child': { borderBottom: 'none' },
});

const AgentInventoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAgent();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDocForm, setShowDocForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getInventoryById(id, token);
      setProperty(res.data.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Property not found');
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => { load(); }, [load]);

  if (loading) return (
    <AgentLayout pageTitle="Property Details">
      <Box sx={{ p: 5, textAlign: 'center', color: t.textSec }}>Loading property...</Box>
    </AgentLayout>
  );

  if (error || !property) return (
    <AgentLayout pageTitle="Property Details">
      <Box sx={{ p: 5, textAlign: 'center', color: t.danger }}>{error || 'Property not found'}</Box>
    </AgentLayout>
  );

  const status   = property.listing_status || 'submitted';
  const stepIdx  = getStepIdx(status);
  const ownerDoc = property.ownerDocument;
  const cfg      = STATUS_CFG[status] || STATUS_CFG.submitted;

  const propertyLabel = [property.bhk && `${property.bhk} BHK`, property.society?.society_name]
    .filter(Boolean).join(' in ') || property.property_type || `Property #${id}`;

  const details = [
    ['Society',    property.society?.society_name],
    ['Sector',     property.society?.sector],
    ['BHK',        property.bhk],
    ['Type',       property.property_type],
    ['Area',       property.area_sqft && `${property.area_sqft} sqft`],
    ['Floor',      property.floor_number],
    ['Tower',      property.tower],
    ['Unit No.',   property.unit_number],
    ['Facing',     property.facing],
    ['Furnishing', property.furnishing_status],
    ['Price',      formatPrice(property.price)],
    ['Price/sqft', property.price_per_sqft && `₹${property.price_per_sqft}`],
  ].filter(([, v]) => v);

  const ownerRows = ownerDoc ? [
    ['Owner Name', ownerDoc.owner_name],
    ['Aadhaar',    ownerDoc.owner_aadhar_number && `XXXX-XXXX-${ownerDoc.owner_aadhar_number.slice(-4)}`],
    ['KYC Status', ownerDoc.aadhar_otp_verified ? 'Verified' : 'Pending'],
    ['PAN',        ownerDoc.owner_pan_number],
    ['Email',      ownerDoc.owner_email],
    ['Address',    ownerDoc.owner_address],
    ['Document',   ownerDoc.letter_type?.replace(/_/g, ' ')],
    ['Doc Status', ownerDoc.status],
  ].filter(([, v]) => v) : [];

  return (
    <AgentLayout pageTitle="Property Details">
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
        <BackBtn onClick={() => navigate('/agent/listings')}><FiArrowLeft /></BackBtn>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: 0.5 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>
              {propertyLabel}
            </Typography>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: 20,
              fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase',
              color: cfg.color, background: cfg.bg,
            }}>
              {cfg.label}
            </Box>
          </Box>
          <Typography sx={{ fontSize: 14, color: t.textSec }}>
            {[formatPrice(property.price), property.property_type, property.area_sqft && `${property.area_sqft} sqft`]
              .filter(Boolean).join(' · ')}
          </Typography>
        </Box>
      </Box>

      {/* 2-col body */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' }, gap: 3, alignItems: 'start' }}>

        {/* LEFT: Stepper + Action */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          {/* Workflow stepper */}
          <Card>
            <CardTitle>Listing Workflow</CardTitle>
            {STEPS.map((step, idx) => {
              const done   = idx < stepIdx;
              const active = idx === stepIdx;
              const isLast = idx === STEPS.length - 1;
              return (
                <Box key={step.key} sx={{ display: 'flex', gap: '14px' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32, flexShrink: 0 }}>
                    <Box sx={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0, zIndex: 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: done ? 15 : 13, fontWeight: 700,
                      background: done ? t.primary : active ? 'rgba(13,90,167,0.08)' : t.bg,
                      color:      done ? 'white'   : active ? t.primary              : t.textLight,
                      border:     done ? 'none'    : active ? `2px solid ${t.primary}` : `2px solid ${t.border}`,
                    }}>
                      {done ? <FiCheck /> : idx + 1}
                    </Box>
                    {!isLast && (
                      <Box sx={{ width: 2, flex: 1, minHeight: 28, mt: '4px', background: done ? t.primary : t.border }} />
                    )}
                  </Box>
                  <Box sx={{ flex: 1, pb: isLast ? 0 : '28px' }}>
                    <Typography sx={{
                      fontSize: 14, fontWeight: done || active ? 700 : 500, mb: 0.5,
                      color: done ? t.primary : active ? t.text : t.textLight,
                    }}>
                      {step.label}
                    </Typography>
                    <Typography sx={{ fontSize: 12, lineHeight: 1.5, color: done || active ? t.textSec : t.textLight }}>
                      {step.desc}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Card>

          {/* Action panel — changes based on status */}
          <Card>
            <CardTitle>Current Status</CardTitle>

            {status === 'submitted' && (
              <Box sx={{
                borderRadius: '10px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start',
                background: 'rgba(245,158,11,0.07)', color: '#92400e', border: '1px solid rgba(245,158,11,0.22)',
              }}>
                <FiClock style={{ marginTop: 2, flexShrink: 0, fontSize: 16 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 0.5 }}>Awaiting Admin Validation</Typography>
                  <Typography sx={{ fontSize: 12, lineHeight: 1.6, color: '#78350f' }}>
                    Your property has been submitted. Our team will review and validate it shortly. You'll be notified once it's validated.
                  </Typography>
                </Box>
              </Box>
            )}

            {status === 'validated' && (
              <>
                <Box sx={{
                  borderRadius: '10px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start',
                  background: 'rgba(13,90,167,0.06)', color: t.primary, border: `1px solid rgba(13,90,167,0.18)`,
                }}>
                  <FiFileText style={{ marginTop: 2, flexShrink: 0, fontSize: 16 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 0.5 }}>Action Required: Submit Owner Documents</Typography>
                    <Typography sx={{ fontSize: 12, lineHeight: 1.6, color: t.textSec }}>
                      Your property has been validated. Please submit the owner's Aadhaar, PAN, and ownership document to proceed to the next step.
                    </Typography>
                  </Box>
                </Box>
                <SubmitDocsBtn onClick={() => setShowDocForm(true)}>
                  <FiFileText size={15} /> Submit Owner Documents <FiChevronRight size={14} />
                </SubmitDocsBtn>
              </>
            )}

            {status === 'documents_submitted' && (
              <Box sx={{
                borderRadius: '10px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start',
                background: 'rgba(124,58,237,0.06)', color: '#5b21b6', border: '1px solid rgba(124,58,237,0.2)',
              }}>
                <FiClock style={{ marginTop: 2, flexShrink: 0, fontSize: 16 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 0.5 }}>Documents Under Verification</Typography>
                  <Typography sx={{ fontSize: 12, lineHeight: 1.6, color: t.textSec }}>
                    Owner documents have been submitted. Our team is verifying them. You'll be notified once verification is complete.
                  </Typography>
                </Box>
              </Box>
            )}

            {status === 'documents_verified' && (
              <Box sx={{
                borderRadius: '10px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start',
                background: 'rgba(13,90,167,0.06)', color: t.primary, border: `1px solid rgba(13,90,167,0.18)`,
              }}>
                <FiMail style={{ marginTop: 2, flexShrink: 0, fontSize: 16 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 0.5 }}>Awaiting Digital Signatures</Typography>
                  <Typography sx={{ fontSize: 12, lineHeight: 1.6, color: t.textSec }}>
                    Signature emails have been sent to both the property owner and you (the agent). Once both parties click their link and sign, the property will automatically go live on Instayards.
                  </Typography>
                </Box>
              </Box>
            )}

            {status === 'active' && (
              <Box sx={{
                borderRadius: '10px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start',
                background: 'rgba(16,185,129,0.07)', color: '#065f46', border: '1px solid rgba(16,185,129,0.22)',
              }}>
                <FiCheck style={{ marginTop: 2, flexShrink: 0, fontSize: 16 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 0.5 }}>Property is Live!</Typography>
                  <Typography sx={{ fontSize: 12, lineHeight: 1.6 }}>
                    Both parties have signed the agreement. Your property is now live on Instayards and visible to buyers.
                  </Typography>
                </Box>
              </Box>
            )}
          </Card>
        </Box>

        {/* RIGHT: Property details + owner doc */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          <Card>
            <CardTitle>Property Details</CardTitle>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {details.map(([k, v]) => (
                <Box key={k} sx={{ background: t.bg, borderRadius: '8px', padding: '10px 12px' }}>
                  <Typography sx={{ fontSize: 10, color: t.textSec, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: '3px' }}>
                    {k}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: t.text, fontWeight: 600, textTransform: 'capitalize' }}>
                    {v}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>

          {ownerDoc && ownerRows.length > 0 && (
            <Card>
              <CardTitle>Owner Documents</CardTitle>
              {ownerRows.map(([k, v]) => (
                <DocRow key={k}>
                  <Typography sx={{ fontSize: 12, color: t.textSec, fontWeight: 600 }}>{k}</Typography>
                  <Typography sx={{ fontSize: 13, color: t.text, fontWeight: 500, textAlign: 'right', maxWidth: '58%' }}>{v}</Typography>
                </DocRow>
              ))}
            </Card>
          )}
        </Box>
      </Box>

      {showDocForm && (
        <OwnerDocForm
          residentialId={property.residential_id}
          propertyLabel={propertyLabel}
          onClose={() => setShowDocForm(false)}
          onSubmitted={() => { setShowDocForm(false); load(); }}
        />
      )}
    </AgentLayout>
  );
};

export default AgentInventoryDetail;
