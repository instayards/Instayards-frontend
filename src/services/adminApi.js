import axios from 'axios';

const BASE = `${process.env.REACT_APP_API_URL}/api/admin`;

const authHeaders = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

/* ── Auth ── */
export const adminLogin          = (data)            => axios.post(`${BASE}/auth/login`, data);
export const adminGetMe          = (token)           => axios.get(`${BASE}/auth/me`, authHeaders(token));
export const adminChangePassword = (data, token)     => axios.patch(`${BASE}/auth/change-password`, data, authHeaders(token));

/* ── Dashboard ── */
export const adminGetStats = (token) => axios.get(`${BASE}/dashboard/stats`, authHeaders(token));

/* ── Societies ── */
export const adminGetSocieties  = (params, token)   => axios.get(`${BASE}/societies`, { ...authHeaders(token), params });
export const adminGetSociety    = (id, token)       => axios.get(`${BASE}/societies/${id}`, authHeaders(token));
export const adminCreateSociety = (data, token)     => axios.post(`${BASE}/societies`, data, authHeaders(token));
export const adminUpdateSociety = (id, data, token) => axios.patch(`${BASE}/societies/${id}`, data, authHeaders(token));
export const adminDeleteSociety = (id, token)       => axios.delete(`${BASE}/societies/${id}`, authHeaders(token));

/* ── Inventory ── */
export const adminGetInventory     = (params, token)    => axios.get(`${BASE}/inventory`, { ...authHeaders(token), params });
export const adminGetInventoryItem = (id, token)        => axios.get(`${BASE}/inventory/${id}`, authHeaders(token));
export const adminCreateInventory  = (data, token)      => axios.post(`${BASE}/inventory`, data, authHeaders(token));
export const adminUpdateInventory  = (id, data, token)  => axios.patch(`${BASE}/inventory/${id}`, data, authHeaders(token));
export const adminDeleteInventory  = (id, token)        => axios.delete(`${BASE}/inventory/${id}`, authHeaders(token));

/* ── Property Verification ── */
export const adminGetPropertyVerifications = (params, token) => axios.get(`${BASE}/property-verifications`, { ...authHeaders(token), params });
export const adminApproveProperty          = (id, token)     => axios.patch(`${BASE}/property-verifications/${id}/approve`, {}, authHeaders(token));
export const adminRejectProperty           = (id, token)     => axios.patch(`${BASE}/property-verifications/${id}/reject`, {}, authHeaders(token));
export const adminGetVerificationCounts    = (token)         => axios.get(`${BASE}/property-verifications/counts`, authHeaders(token));

/* ── Owner Doc Verification ── */
export const adminGetOwnerDocs   = (params, token) => axios.get(`${BASE}/owner-docs`, { ...authHeaders(token), params });
export const adminApproveOwnerDoc = (id, token)    => axios.patch(`${BASE}/owner-docs/${id}/approve`, {}, authHeaders(token));
export const adminRejectOwnerDoc  = (id, token)    => axios.patch(`${BASE}/owner-docs/${id}/reject`, {}, authHeaders(token));
