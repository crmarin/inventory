import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { shallow } from 'zustand/shallow';

import { userStore } from '@/store/userStore';

export default function Register() {
  const {
    register,
    error,
    token: isAuthenticated,
  } = userStore(
    (state) => ({
      register: state.register,
      error: state.error,
      token: state.token,
    }),
    shallow
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: '',
  });

  const { name, email, password, isAdmin } = formData;

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    register(formData);
  };
  return (
    <>
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full content-center items-center justify-center">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-gray-200 shadow-lg">
              <div className="mb-0 rounded-t px-6 py-6">
                <div className="mb-3 text-center">
                  <h6 className="text-sm font-bold text-gray-500">
                    Registro de cuenta
                  </h6>
                </div>
                <hr className="border-b-1 mt-6 border-gray-300" />
              </div>
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <form onSubmit={(e) => handleSubmit(e)}>
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
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-600"
                      htmlFor="grid-email"
                    >
                      email
                    </label>
                    <input
                      type="text"
                      className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative mb-3 w-full">
                    <label
                      className="mb-2 block text-xs font-bold uppercase text-gray-600"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      name="password"
                      value={password}
                      onChange={handleChange}
                    />
                    {error && error.msg && (
                      <span className="mr-2 text-xs text-red-500">
                        <i className="fas fa-bell"></i> {error.msg}
                      </span>
                    )}
                  </div>

                  <div className="flex w-auto flex-col flex-wrap justify-center px-2">
                    <label className="cursor-pointer">
                      <input
                        id="isAdmin"
                        type="checkbox"
                        name="isAdmin"
                        value={isAdmin}
                        checked={isAdmin}
                        onChange={handleChange}
                        className="form-checkbox ml-1 h-5 w-5 rounded border-0 text-gray-700 transition-all duration-150 ease-linear"
                      />
                      <span className="ml-2 text-xs font-semibold capitalize text-gray-600">
                        Es Admin
                      </span>
                    </label>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      className="mr-1 mb-1 rounded bg-gray-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-gray-600"
                      type="submit"
                    >
                      Crear cuenta
                    </button>
                  </div>
                  <div className="mt-6 relative">
                    <div className="text-center">
                      <Link to="/auth/login">
                        Si ya tienes cuenta{' '}
                        <span className="text-blue-500 mr-2">Ingresa</span>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
