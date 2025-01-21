import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const loginUser = (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password }).then(res => res.data);
};

export const registerUser = (email, password) => {
    return axios.post(`${API_URL}/auth/register`, { email, password }).then(res => res.data);
  };

export const getEntries = () => {
  return axios.get(`${API_URL}/entries`).then(res => res.data);
};

export const addEntry = (entry) => {
  return axios.post(`${API_URL}/entries`, entry).then(res => res.data);
};

export const deleteEntryById = (id) => {
  return axios.delete(`${API_URL}/entries/${id}`).then(res => res.data);
};
export const updateEntry = (id, entry) => {
    return axios.put(`${API_URL}/entries/${id}`, entry).then(res => res.data);
  };