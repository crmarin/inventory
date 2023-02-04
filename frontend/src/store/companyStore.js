import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../utils/api';

let store = (set, get) => ({
  companies: [],
  company: null,
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
  getAllCompanies: async () => {
    try {
      let { data } = await api.get('/companies');

      set({ companies: data.companies }, false, { type: 'getAllCompanies' });
    } catch (err) {
      set({ error: err.response }, false, {
        type: 'getAllCompanies-fail',
      });
    }
  },
  getCompanyById: async (id) => {
    try {
      let { data } = await api.get(`/companies/${id}`);

      set({ company: data }, false, { type: 'getCompanyById' });
    } catch (err) {
      set({ error: err.response }, false, {
        type: 'getCompanyById-fail',
      });
    }
  },
  createCompany: async (formData) => {
    try {
      const { data } = await api.post('companies/new_company', formData, {
        loading: true,
      });
      set({ status: data }, false, { type: 'createCompany' });
      get().closeModal();
      get().getAllCompanies();
      set({ status: true });
    } catch (err) {
      const { param, msg } = err.response.data[0];
      set({ error: { [param]: msg } }, false, {
        type: 'createCompany-fail',
      });
    }
  },
  updateCompany: async (formData) => {
    try {
      const { data } = await api.post('companies/update_company', formData, {
        loading: true,
      });
      set({ status: data }, false, { type: 'updateCompany' });
      get().closeModal();
      get().getAllCompanies();
      set({ status: true });
    } catch (err) {
      const { param, msg } = err.response.data[0];
      set({ error: { [param]: msg } }, false, {
        type: 'createCompany-fail',
      });
    }
  },
  deleteCompany: async (id) => {
    try {
      const { data } = await api.delete(`companies/delete_company/${id}`, {
        loading: true,
      });
      set({ status: data }, false, { type: 'deleteCompany' });
      get().getAllCompanies();
    } catch (err) {
      set({ error: err.response.data }, false, {
        type: 'deleteCompany-fail',
      });
    }
  },
});

const companyStore = create(devtools(store, { name: 'companyStore' }));

export { companyStore };
