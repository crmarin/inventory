import React, { useEffect, useState } from 'react';

import IndexNavbar from '@/components/Navbars/IndexNavbar';
import Footer from '@/components/Footers/Footer';
import CompaniesForm from '@/components/Companies/CompaniesForm';
import CompaniesUpload from '@/components/Companies/CompaniesUpload';
import CompaniesList from '@/components/Companies/CompaniesList';

import useCompanies from '../../hooks/useCompanies';

function Companies() {
  const {
    companies,
    statusModal,
    setError,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompanyById,
    success
  } = useCompanies();

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

  const clearFormData = () => {
    setFormData(initialState);
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

  return (
    <div className="h-screen">
      <IndexNavbar fixed />
      <div className="relative pt-16 pb-16 flex content-center items-center justify-center min-h-screen-75">
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: 'translateZ(0)' }}
        ></div>
      </div>

      <div className="mt-12 mx-auto lg:w-9/12 w-full lg:px-10 px-0 min-h-full">
        <CompaniesUpload />

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
      </div>

      <Footer />
    </div>
  );
}

export default Companies;
