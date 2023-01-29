import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../utils/api';

let store = (set, get) => ({
  products: [],
  product: [],
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  status: null,
  error: [],
  getAllProducts: async () => {
    try {
      let { data } = await api.get('/products');

      set({ products: data.products }, false, { type: 'getAllProducts' });
    } catch (err) {
      set({ error: err.response }, false, {
        type: 'getAllProducts-fail',
      });
    }
  },
  getProductDetail: async (id) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      set({ product: data }, false, { type: 'getProductDetail' });
    } catch (err) {
      set({ error: err.response }, false, {
        type: 'getProductDetail-fail',
      });
    }
  },
  addCart: async (cart) => {
    set({ cart: cart }, false, { type: 'addCart' });
    localStorage.setItem('cart', JSON.stringify(cart));
  },
});

const productsStore = create(devtools(store, { name: 'productsStore' }));

export { productsStore };
