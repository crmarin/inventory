import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../utils/api';

let store = (set, get) => ({
  token: localStorage.getItem('token'),
  user: null,
  error: null,
  register: async (formData) => {
    try {
      const { data: token } = await api.post('users', formData);
      set({ token: token }, false, {
        type: 'login',
        formData,
      });
      api.defaults.headers.common['x-auth-token'] = token.token;
      localStorage.setItem('token', token.token);
      get().loadUser();
    } catch (err) {
      set({ error: err.response.data[0] }, false, {
        type: 'login-fail',
      });
    }
  },
  login: async (formData) => {
    try {
      const { data: token } = await api.post('auth/login', formData);
      set({ token: token }, false, {
        type: 'login',
        formData,
      });
      api.defaults.headers.common['x-auth-token'] = token.token;
      localStorage.setItem('token', token.token);
      get().loadUser();
    } catch (err) {
      set({ error: err.response.data[0] }, false, {
        type: 'login-fail',
      });
    }
  },
  loadUser: async () => {
    try {
      api.defaults.headers.common['x-auth-token'] =
        localStorage.getItem('token');
      const { data } = await api.get('auth');
      set({ user: data }, false, { type: 'loadUser' });
    } catch (err) {
      set({ error: err.response, token: null }, false, {
        type: 'loadUser-fail',
      });
    }
  },
  logout: async () => {
    set({ token: null }, false, { type: 'logout' });
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    document.location.href = '/';
  },
});

const userStore = create(devtools(store, { name: 'userStore' }));

export { userStore };
