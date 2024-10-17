import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:4500/api/requests";

axios.defaults.withCredentials = true;

export const useRequestStore = create((set) => ({
  requests: [],
  currentRequest: null,
  isLoading: false,
  error: null,

  submitRequest: async (requestData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/submit-request`, requestData);
      set({ request: response.data.request, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.error || "Failed to submit request", isLoading: false });
      throw error;
    }
  },

  getAllRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ requests: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error fetching requests", isLoading: false });
      throw error;
    }
  },

  getRequestById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      set({ currentRequest: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error fetching request", isLoading: false });
      throw error;
    }
  },

  updateRequest: async (id, requestData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/${id}`, requestData);
      set((state) => ({
        requests: state.requests.map(req => req._id === id ? response.data : req),
        currentRequest: response.data,
        isLoading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || "Error updating request", isLoading: false });
      throw error;
    }
  },

  deleteRequest: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        requests: state.requests.filter(req => req._id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || "Error deleting request", isLoading: false });
      throw error;
    }
  },

  approveRequest: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/${id}/approve`);
      set((state) => ({
        requests: state.requests.map(req => req._id === id ? response.data : req),
        currentRequest: response.data,
        isLoading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || "Error approving request", isLoading: false });
      throw error;
    }
  },

  clearCurrentRequest: () => {
    set({ currentRequest: null });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  }
}));