import React, { useState } from 'react';

import Modal from '@/components/Modal/Modal';

import { articleStore } from '@/store/articleStore';
import { shallow } from 'zustand/shallow';

const ArticlesForm = ({
  handleSubmit,
  formData,
  setFormData,
  clearFormData,
}) => {
  const { error, closeModal } = articleStore(
    (state) => ({
      error: state.error,
      closeModal: state.closeModal,
    }),
    shallow
  );

  const { _id, name, description, price, countInStock } = formData;

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
          {_id === null ? 'New article' : 'Update article'}
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
                  htmlFor="grid-description"
                >
                  description
                </label>
                <input
                  type="text"
                  className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                  name="description"
                  value={description}
                  onChange={onChangeForm}
                />
                {error && error.description && (
                  <span className="mr-2 text-xs text-red-500">
                    <i className="fas fa-bell"></i> {error.description}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="mb-2 block text-xs font-bold uppercase text-gray-600"
                  htmlFor="grid-price"
                >
                  price
                </label>
                <input
                  type="number"
                  className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                  name="price"
                  value={price}
                  onChange={onChangeForm}
                />
                {error && error.price && (
                  <span className="mr-2 text-xs text-red-500">
                    <i className="fas fa-bell"></i> {error.price}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="mb-2 block text-xs font-bold uppercase text-gray-600"
                  htmlFor="grid-countInStock"
                >
                  countInStock
                </label>
                <input
                  type="number"
                  className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                  name="countInStock"
                  value={countInStock}
                  onChange={onChangeForm}
                />
                {error && error.countInStock && (
                  <span className="mr-2 text-xs text-red-500">
                    <i className="fas fa-bell"></i> {error.countInStock}
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

export default ArticlesForm;
