import React, { useState } from 'react';

import Modal from '@/components/Modal/Modal';

import { companyStore } from '@/store/companyStore';
import { shallow } from 'zustand/shallow';

const CompaniesForm = ({
  handleSubmit,
  formData,
  setFormData,
  clearFormData,
}) => {
  const { error, closeModal } = companyStore(
    (state) => ({
      error: state.error,
      closeModal: state.closeModal,
    }),
    shallow
  );

  const { _id, name, address, nit, phone } = formData;

  const onChangeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  // components
  return (
    <Modal width={'lg:w-[720px]'}>
      <div className="'w-90 flex justify-between rounded-b p-6 py-4">
        <p className="'w-90 text-lg font-bold text-gray-700">
          {_id === null ? 'New company' : 'Update company'}
        </p>
        <button
          className="mr-1 rounded bg-indigo-500 px-4 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-indigo-600"
          type="button"
          onClick={() => {
            closeModal();
            clearFormData();
          }}
        >
          x
        </button>
      </div>

      <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="flex flex-wrap">
            <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="mb-2 block text-xs font-bold uppercase text-gray-600"
                  htmlFor="grid-name"
                >
                  name
                </label>
                <input
                  type="text"
                  className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                  name="name"
                  value={name}
                  onChange={onChangeForm}
                />
                {error && error.name && (
                  <span className="mr-2 text-xs text-red-500">
                    <i className="fas fa-bell"></i> {error.name}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="mb-2 block text-xs font-bold uppercase text-gray-600"
                  htmlFor="grid-address"
                >
                  address
                </label>
                <input
                  type="text"
                  className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                  name="address"
                  value={address}
                  onChange={onChangeForm}
                />
                {error && error.address && (
                  <span className="mr-2 text-xs text-red-500">
                    <i className="fas fa-bell"></i> {error.address}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="mb-2 block text-xs font-bold uppercase text-gray-600"
                  htmlFor="grid-nit"
                >
                  nit
                </label>
                <input
                  type="text"
                  className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                  name="nit"
                  value={nit}
                  onChange={onChangeForm}
                />
                {error && error.nit && (
                  <span className="mr-2 text-xs text-red-500">
                    <i className="fas fa-bell"></i> {error.nit}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="mb-2 block text-xs font-bold uppercase text-gray-600"
                  htmlFor="grid-phone"
                >
                  phone
                </label>
                <input
                  type="text"
                  className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                  name="phone"
                  value={phone}
                  onChange={onChangeForm}
                />
                {error && error.phone && (
                  <span className="mr-2 text-xs text-red-500">
                    <i className="fas fa-bell"></i> {error.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="mr-1 mb-1 rounded bg-blue-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-700"
              type="submit"
            >
              {_id === null ? 'Create' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CompaniesForm;
