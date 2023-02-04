import React, { useEffect, useState } from 'react';

import IndexNavbar from '@/components/Navbars/IndexNavbar';
import Footer from '@/components/Footers/Footer';
import CompaniesForm from '@/components/Companies/CompaniesForm';
import CompaniesList from '@/components/Companies/CompaniesList';

import { companyStore } from '@/store/companyStore';
import { shallow } from 'zustand/shallow';

function Companies() {
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

  const initialState = {
    _id: null,
    name: '',
    address: '',
    nit: '',
    phone: '',
  };

  const [formData, setFormData] = useState(initialState);

  const { _id, name, address, nit, phone } = formData;

  const onDeleteCompany = (id) => {
    deleteCompany(id);
  };

  const onUpdateCompany = (company) => {
    setFormData(company);
  };

  const onSelectCompany = (id) => {
    getCompanyById(id);
  };

  const onSubmit = () => {
    if (name === '') {
      setError('name', 'Name is required');
    }
    if (address === '') {
      setError('address', 'Address is required');
    }
    if (nit === '') {
      setError('nit', 'Nit is required');
    }
    if (phone === '') {
      setError('phone', 'Phone is required');
    }
    if (name === '' || address === '' || nit === '' || phone === '') return;
    if (_id) updateCompany(formData);
    else createCompany(formData);
  };

  useEffect(() => {
    if (success) {
      setFormData(initialState);
    }
  }, [success]);

  const clearFormData = () => {
    setFormData(initialState);
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (
    <div className="h-screen">
      <IndexNavbar fixed />

      <div className="relative pt-16 pb-16 flex content-center items-center justify-center min-h-screen-75">
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: 'translateZ(0)' }}
        ></div>
      </div>

      {statusModal && (
        <CompaniesForm
          handleSubmit={onSubmit}
          formData={formData}
          setFormData={setFormData}
          clearFormData={clearFormData}
        />
      )}

      <CompaniesList
        companies={companies}
        handleEdit={onUpdateCompany}
        handleRemove={onDeleteCompany}
        handleCompany={onSelectCompany}
      />

      <Footer />
    </div>
  );
}

export default Companies;
