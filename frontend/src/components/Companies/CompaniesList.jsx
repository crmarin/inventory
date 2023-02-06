import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';

import { companyStore } from '@/store/companyStore';
import { userStore } from '@/store/userStore';
import { shallow } from 'zustand/shallow';

const CompaniesList = ({
  companies,
  handleEdit,
  handleRemove,
  handleCompany,
}) => {
  const { error, uploadFile, showModal, setError, clearError } = companyStore(
    (state) => ({
      error: state.error,
      uploadFile: state.uploadFile,
      showModal: state.showModal,
      setError: state.setError,
      clearError: state.clearError,
    }),
    shallow
  );

  const user = userStore((state) => state.user);

  const [selectedFileData, setSelectedFileData] = useState();
  const [selectedFile, setSelectedFile] = useState(false);

  const generatePDF = () => {
    html2canvas(document.getElementById('jsCompaniesTable')).then((canvas) => {
      var data = canvas.toDataURL();
      var pdfExportSetting = {
        content: [
          {
            image: data,
            width: 500,
          },
        ],
      };
      pdfMake.createPdf(pdfExportSetting).download('companies.pdf');
    });
  };

  const inputHandlerFile = (event) => {
    setSelectedFileData(event.target.files[0]);
    setSelectedFile(true);
  };

  const initialState = {
    to: '',
    subject: '',
    body: '',
  };

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
      setError('file', 'Add file to sent.');
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

  return (
    <div className="-m-24 mx-auto lg:w-9/12 w-full lg:px-10 px-0 min-h-full">
      <div className="mt-20 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
            <div className="mb-0 rounded-t border-0 px-4 py-3">
              {user && user?.isAdmin && (
                <div className="flex flex-wrap items-center rounded bg-white shadow-lg border-2 py-5">
                  <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                    <h3 className="text-gray-700 text-lg font-semibold my-5 mx-2">
                      Send file
                    </h3>
                  </div>
                  <div className="flex-auto px-4 py-10 pt-0 lg:px-10 mb-0 rounded-t border-0">
                    <form onSubmit={handleUploadFile}>
                      <div className="flex flex-wrap">
                        <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
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
                        <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
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
                        <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
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
                        <div className="w-full px-4 lg:w-6/12 xl:w-6/12">
                          <div className="relative mt-5 mb-3 w-full">
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
                        <button
                          className="my-3 ml-3 rounded bg-green-500 px-2 py-2 text-sm font-bold text-gray-100 shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-green-700"
                          type="summit"
                        >
                          <i className="fas fa-upload text-red-800"></i> Send
                          file
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                  <h3 className="text-gray-700 text-lg font-semibold">
                    List of Companies
                  </h3>
                </div>
                {user && user?.isAdmin && (
                  <div>
                    <button
                      className="my-3 ml-3 rounded bg-blue-500 px-2 py-2 text-sm font-bold text-gray-100 shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-700"
                      type="button"
                      onClick={() => {
                        showModal();
                      }}
                    >
                      New company
                    </button>
                    <button
                      className="my-3 ml-3 rounded bg-red-500 px-2 py-2 text-sm font-bold text-gray-100 shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-red-700"
                      type="button"
                      onClick={generatePDF}
                    >
                      <i className="fas fa-download text-blue-800"></i> Download
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table
                className="w-full border-collapse items-center bg-transparent"
                id="jsCompaniesTable"
              >
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      name
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      address
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      nit
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      phone
                    </th>
                    {user && user?.isAdmin && (
                      <th className="px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100">
                        options
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {companies &&
                    companies.map((company, id) => (
                      <tr key={id}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {company.name}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {company.address}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {company.nit}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {company.phone}
                        </td>
                        {user && user?.isAdmin && (
                          <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-center text-xs whitespace-nowrap">
                            <button
                              className="background-transparent mr-1 mb-1 px-3 py-3 font-bold uppercase text-blue-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                              type="button"
                            >
                              <i
                                className="fas fa-edit"
                                onClick={() => {
                                  handleEdit(company);
                                  showModal();
                                }}
                              ></i>
                            </button>
                            <button
                              className="background-transparent mr-1 mb-1 px-3 py-3 font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                              type="button"
                            >
                              <i
                                className="fas fa-trash"
                                onClick={() => {
                                  handleRemove(company._id);
                                }}
                              ></i>
                            </button>
                            <Link
                              className="background-transparent mr-1 mb-1 px-3 py-3 font-bold uppercase text-indigo-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                              onClick={() => {
                                handleCompany(company._id);
                              }}
                              to={`/companies/${company._id}`}
                            >
                              <i className="fas fa-sitemap"></i>
                            </Link>
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesList;
