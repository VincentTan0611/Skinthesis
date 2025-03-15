import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  // State
  userProfile: null,
  isLoading: false,
  error: null,

  // Actions
  setUserProfile: (userProfile) => set({ userProfile }),
  
  // Update specific profile fields
  updateProfile: (updates) => set((state) => ({
    userProfile: { ...state.userProfile, ...updates }
  })),

  // Clear profile (for logout)
  clearProfile: () => set({ userProfile: null }),

  // Set loading state
  setLoading: (isLoading) => set({ isLoading }),

  // Set error state
  setError: (error) => set({ error }),
}));

export default useUserProfileStore;