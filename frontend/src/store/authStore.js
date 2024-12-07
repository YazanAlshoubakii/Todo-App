import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      set({ authUser: null });
      console.log('Error in checkAuth: ', error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      toast.success('Account Created Successfully');
    } catch (error) {
      toast.error(error.response.data.message);
      console.log('Error in Sing up: ', error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data });

      toast.success('Logged in Successfully');
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log('error in login : ', error);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log('Error in logout', error);
    }
  },
}));
