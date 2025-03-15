import { create } from 'zustand';

const useDermAuthStore = create((set) => ({
  dermatologist: null,
  loading: false,
  loginDerma: (dermatologistData) => set({ dermatologist: dermatologistData }),
  logoutDerma: () => set({ dermatologist: null }),
  setLoading: (loading) => set({ loading }),
}));

export default useDermAuthStore; 