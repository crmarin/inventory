import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../utils/api';

let store = (set, get) => ({
  articles: [],
  companyId: null,
  status: null,
  statusModal: false,
  error: null,
  clearError: () => {
    set({ error: null }, false, {
      type: 'clearError',
    });
  },
  setError: (param, message) => {
    const currenError = get().error;
    const auxError = { ...currenError, [param]: message };
    set({ error: auxError }, false, {
      type: 'setError',
    });
  },
  showModal: () => {
    set({ statusModal: true }, false, { type: 'toggleModalTrue' });
  },
  closeModal: () => {
    set({ statusModal: false }, false, { type: 'toggleModalFalse' });
    get().clearError();
  },
  getAllArticlesByCompany: async (id) => {
    try {
      set({ articles: [] });
      let { data } = await api.get(`/articles/${id}`);

      set({ articles: data.articles, companyId: id }, false, {
        type: 'getAllArticlesByCompany',
      });
    } catch (err) {
      set({ error: err.response }, false, {
        type: 'getAllArticlesByCompany-fail',
      });
    }
  },
  createArticle: async (formData) => {
    try {
      const { data } = await api.post('articles/new_article', formData, {
        loading: true,
      });
      set({ status: data }, false, { type: 'createArticle' });
      get().closeModal();
      get().getAllArticlesByCompany(get().companyId);
      set({ status: true });
    } catch (err) {
      const { param, msg } = err.response.data[0];
      set({ error: { [param]: msg } }, false, {
        type: 'createArticle-fail',
      });
    }
  },
  updateArticle: async (formData) => {
    try {
      const { data } = await api.post('articles/update_article', formData, {
        loading: true,
      });
      set({ status: data }, false, { type: 'updateArticle' });
      get().closeModal();
      get().getAllArticlesByCompany(get().companyId);
      set({ status: true });
    } catch (err) {
      const { param, msg } = err.response.data[0];
      set({ error: { [param]: msg } }, false, {
        type: 'updateArticle-fail',
      });
    }
  },
  deleteArticle: async (id) => {
    try {
      const { data } = await api.delete(`articles/delete_article/${id}`, {
        loading: true,
      });
      set({ status: data }, false, { type: 'deleteArticle' });
      get().getAllArticlesByCompany(get().companyId);
    } catch (err) {
      set({ error: err.response.data }, false, {
        type: 'deleteArticle-fail',
      });
    }
  },
});

const articleStore = create(devtools(store, { name: 'articleStore' }));

export { articleStore };
