import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/residential`;

export const getHotProperties = async () => {
  const res = await axios.get(`${API_BASE_URL}/hot-properties`);
  return res.data;
};

export const fetchAllResidential = async () => {
  const res = await axios.get(`${API_BASE_URL}`);
  return res.data;
};

export const fetchResidentialById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

export const createResidential = async (data) => {
  const res = await axios.post(`${API_BASE_URL}`, data);
  return res.data;
};

export const updateResidential = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteResidential = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};