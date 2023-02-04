import React from 'react';
import { Link } from 'react-router-dom';

import { companyStore } from '@/store/companyStore';
import { userStore } from '@/store/userStore';

const CompaniesList = ({
  companies,
  handleEdit,
  handleRemove,
  handleCompany,
}) => {
  const showModal = companyStore((state) => state.showModal);
  const user = userStore((state) => state.user);

  return (
    <div className="-m-24 mx-auto lg:w-9/12 w-full lg:px-10 px-0 min-h-full">
      <div className="mt-20 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
            <div className="mb-0 rounded-t border-0 px-4 py-3">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                  <h3 className="text-gray-700 text-lg font-semibold">
                    List of Companies
                  </h3>
                </div>
                {user && user?.isAdmin && (
                  <button
                    className="my-3 ml-3 rounded bg-blue-500 px-2 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-700"
                    type="button"
                    onClick={() => {
                      showModal();
                    }}
                  >
                    New company
                  </button>
                )}
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse items-center bg-transparent">
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