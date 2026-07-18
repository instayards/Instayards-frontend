import axios from 'axios';

const BASE           = `${process.env.REACT_APP_API_URL}/api/agent`;
const SOCIETY_BASE   = `${process.env.REACT_APP_API_URL}/api/societies`;
const INVENTORY_BASE = `${process.env.REACT_APP_API_URL}/api/agent/inventory`;
const UPLOAD_BASE    = `${process.env.REACT_APP_API_URL}/api/upload`;

const authHeaders = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

/* Auto-logout on 401 — clears session and redirects to agent login */
axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('agent_token');
      localStorage.removeItem('agent_data');
      window.location.href = '/agent/login';
    }
    return Promise.reject(err);
  }
);

/* ---- Auth ---- */
export const agentSendOtp      = (data) => axios.post(`${BASE}/auth/send-otp`, data);
export const agentVerifyRera   = (rera_no) => axios.get(`${BASE}/auth/verify-rera`, { params: { rera_no } });
export const agentSignup       = (data) => axios.post(`${BASE}/auth/signup`, data);
export const agentLogin        = (data) => axios.post(`${BASE}/auth/login`, data);
export const agentGetMe            = (token)         => axios.get(`${BASE}/auth/me`, authHeaders(token));
export const agentChangePassword   = (data, token)   => axios.patch(`${BASE}/auth/change-password`, data, authHeaders(token));
export const changeMemberPassword  = (id, data, token) => axios.patch(`${BASE}/members/${id}/change-password`, data, authHeaders(token));

/* ---- Team / Members ---- */
export const getMembers         = (token)          => axios.get(`${BASE}/members`, authHeaders(token));
export const memberSendOtp      = (data, token)    => axios.post(`${BASE}/members/send-otp`, data, authHeaders(token));
export const addMember          = (data, token)    => axios.post(`${BASE}/members/add`, data, authHeaders(token));

/* ---- Societies ---- */
export const getSocieties = () => axios.get(SOCIETY_BASE);

/* ---- File Upload ---- */
export const uploadPropertyImages = (formData, token) =>
  axios.post(`${UPLOAD_BASE}/images`, formData, { headers: { Authorization: `Bearer ${token}` } });

export const uploadPropertyVideos = (formData, token) =>
  axios.post(`${UPLOAD_BASE}/videos`, formData, { headers: { Authorization: `Bearer ${token}` } });

/* ---- Agent Inventory (creates ResidentialInventory → appears in Hot Properties) ---- */
export const createInventory  = (data, token)     => axios.post(INVENTORY_BASE, data, authHeaders(token));
export const getMyInventory   = (token)            => axios.get(INVENTORY_BASE, authHeaders(token));
export const getInventoryById = (id, token)        => axios.get(`${INVENTORY_BASE}/${id}`, authHeaders(token));
export const updateInventory  = (id, data, token)  => axios.patch(`${INVENTORY_BASE}/${id}`, data, authHeaders(token));
export const deleteInventory  = (id, token)        => axios.delete(`${INVENTORY_BASE}/${id}`, authHeaders(token));

/* ---- Owner Documents ---- */
export const getOwnerDoc        = (id, token)                          => axios.get(`${INVENTORY_BASE}/${id}/owner-doc`, authHeaders(token));
// data: { aadhaar_number } — OTP goes to the mobile registered with UIDAI
export const sendAadharOtp      = (id, aadhaarNumber, token)           => axios.post(`${INVENTORY_BASE}/${id}/owner-doc/send-aadhar-otp`, { aadhaar_number: aadhaarNumber }, authHeaders(token));
// data: { aadhaar_number, txnId, otp }
export const verifyAadharOtp    = (id, aadhaarNumber, txnId, otp, token) => axios.post(`${INVENTORY_BASE}/${id}/owner-doc/verify-aadhar-otp`, { aadhaar_number: aadhaarNumber, txnId, otp }, authHeaders(token));
export const submitOwnerDoc     = (id, formData, token)                => axios.post(`${INVENTORY_BASE}/${id}/owner-doc`, formData, { headers: { Authorization: `Bearer ${token}` } });

/* ---- Listings ---- */
export const createListing     = (data, token)     => axios.post(`${BASE}/listings`, data, authHeaders(token));
export const getMyListings     = (token)           => axios.get(`${BASE}/listings`, authHeaders(token));
export const getListingById    = (id, token)       => axios.get(`${BASE}/listings/${id}`, authHeaders(token));
export const updateListing     = (id, data, token) => axios.patch(`${BASE}/listings/${id}`, data, authHeaders(token));
export const deleteListing     = (id, token)       => axios.delete(`${BASE}/listings/${id}`, authHeaders(token));
export const getPublicListings = ()                => axios.get(`${BASE}/listings/public`);
