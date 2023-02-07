import React, { useState } from 'react';

import { companyStore } from '@/store/companyStore';
import { userStore } from '@/store/userStore';

import { shallow } from 'zustand/shallow';

const CompaniesUpload = () => {
  const { error, uploadFile, setError, clearError } = companyStore(
    (state) => ({
      error: state.error,
      uploadFile: state.uploadFile,
      setError: state.setError,
      clearError: state.clearError,
    }),
    shallow
  );

  const user = userStore((state) => state.user);

  const inputHandlerFile = (event) => {
    setSelectedFileData(event.target.files[0]);
    setSelectedFile(true);
  };

  const initialState = {
    to: '',
    subject: '',
    body: '',
  };

  const [selectedFileData, setSelectedFileData] = useState();
  const [selectedFile, setSelectedFile] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { to, subject, body } = formData;

  const onChangeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    const form = new FormData();
    if (to === '') {
      setError('to', 'Add a email to send file.');
    }
    if (subject === '') {
      setError('subject', 'Add a subject to email.');
    }
    if (body === '') {
      setError('body', 'Add a body to email.');
    }
    if (!selectedFile) {
      setError('file', 'Add file to send.');
    }
    if (to === '' || subject === '' || body === '' || !selectedFile) return;

    form.append('File', selectedFileData);
    form.append('to', to);
    form.append('subject', subject);
    form.append('body', body);

    uploadFile(form);
    clearError();
    setFormData(initialState);
    setSelectedFile(false);
  };

  // components
  return (
      <div className="mt-2 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
            <div className="mb-0 rounded-t border-0 px-4 py-3">
              {user && user?.isAdmin && (
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                    <h3 className="text-gray-700 text-lg font-semibold">
                      Send file
                    </h3>
                  </div>
                  <div className="flex-auto px-4 py-10 pt-0 lg:px-10 mb-0 rounded-t border-0">
                    <form onSubmit={handleUploadFile}>
                      <div className="flex flex-wrap">
                        <div className="w-full px-4 lg:w-6/12 xl:w-2/12">
                          <div className="relative mb-3 w-full">
                            <label
                              className="mb-2 block text-xs font-bold uppercase text-gray-600"
                              htmlFor="grid-to"
                            >
                              to
                            </label>
                            <input
                              type="email"
                              className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                              name="to"
                              value={to}
                              onChange={onChangeForm}
                            />
                          </div>
                          {error && error.to && (
                            <span className="mr-2 text-xs text-red-500">
                              <i className="fas fa-bell"></i> {error.to}
                            </span>
                          )}
                        </div>
                        <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
                          <div className="relative mb-3 w-full">
                            <label
                              className="mb-2 block text-xs font-bold uppercase text-gray-600"
                              htmlFor="grid-subject"
                            >
                              subject
                            </label>
                            <input
                              type="text"
                              className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                              name="subject"
                              value={subject}
                              onChange={onChangeForm}
                            />
                          </div>
                          {error && error.subject && (
                            <span className="mr-2 text-xs text-red-500">
                              <i className="fas fa-bell"></i> {error.subject}
                            </span>
                          )}
                        </div>
                        <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
                          <div className="relative mb-3 w-full">
                            <label
                              className="mb-2 block text-xs font-bold uppercase text-gray-600"
                              htmlFor="grid-body"
                            >
                              body
                            </label>
                            <input
                              type="text"
                              className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-gray-600 placeholder-gray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                              name="body"
                              value={body}
                              onChange={onChangeForm}
                            />
                          </div>
                          {error && error.body && (
                            <span className="mr-2 text-xs text-red-500">
                              <i className="fas fa-bell"></i> {error.body}
                            </span>
                          )}
                        </div>
                        <div className="w-full px-4 lg:w-6/12 xl:w-2/12">
                          <div className="relative mt-4 mb-3 w-full">
                            <input
                              className="my-3 ml-3 rounded bg-blue-500 px-2 py-2 text-sm text-gray-800 transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-700"
                              type="file"
                              name="file"
                              onChange={inputHandlerFile}
                            />
                          </div>
                          {error && error.file && (
                            <span className="mr-2 text-xs text-red-500">
                              <i className="fas fa-bell"></i> {error.file}
                            </span>
                          )}
                        </div>
                        <div className="w-full px-4 lg:w-6/12 xl:w-2/12">
                          <div className="relative mt-4 mb-3 w-full">
                            <button
                              className="my-3 ml-3 rounded bg-blue-500 px-2 py-2 text-sm font-bold text-gray-100 shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-700"
                              type="summit"
                            >
                              <i className="fas fa-upload text-gray-800"></i>{' '}
                              Send file
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default CompaniesUpload;
