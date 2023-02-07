import { useEffect, useRef } from 'react';

import { companyStore } from '@/store/companyStore';
import { shallow } from 'zustand/shallow';

export default () => {
  const {
    getAllCompanies,
    companies,
    statusModal,
    setError,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanyById,
    status: success,
  } = companyStore(
    (state) => ({
      statusModal: state.statusModal,
      companies: state.companies,
      getAllCompanies: state.getAllCompanies,
      setError: state.setError,
      createCompany: state.createCompany,
      updateCompany: state.updateCompany,
      deleteCompany: state.deleteCompany,
      getCompanyById: state.getCompanyById,
      status: state.status,
    }),
    shallow
  );

  const isRunned = useRef(false);

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;
    getAllCompanies();
  }, []);

  return {
    getAllCompanies,
    companies,
    statusModal,
    setError,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanyById,
    success,
  };
};
