import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/newlaunch`
// const BASE_URL = `/api/newlaunch`

export const fetchAllNewLaunches = async () => {
  const res = await axios.get(BASE_URL);
  return res.data.data;
};

export const fetchNewLaunchById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data.data;
};

export const createNewLaunch = async (payload) => {
  const res = await axios.post(BASE_URL, payload);
  return res.data.data;
};

export const updateNewLaunch = async (id, payload) => {
  const res = await axios.patch(`${BASE_URL}/${id}`, payload);
  return res.data.data;
};

export const deleteNewLaunch = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data.data;
};