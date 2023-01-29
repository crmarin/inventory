import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../utils/api';

let store = (set, get) => ({
  newOrder: [],
  status: null,
  error: [],
  newOrder: async (formData) => {
    try {
      let { data } = await api.post('/order', formData);

      set({ newOrder: data }, false, { type: 'newOrder' });
      localStorage.setItem('cart', '[]');
    } catch (err) {
      set({ error: err.response }, false, {
        type: 'newOrder-fail',
      });
    }
  },
});

const orderStore = create(devtools(store, { name: 'orderStore' }));

export { orderStore };
