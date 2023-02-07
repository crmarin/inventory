import React from 'react';

import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';

import { userStore } from '@/store/userStore';
import { companyStore } from '@/store/companyStore';
import CompanyItem from './CompanyItem';

const CompaniesList = ({
  companies,
  handleEdit,
  handleRemove,
  handleCompany,
}) => {
  const showModal = companyStore((state) => state.showModal);
  const user = userStore((state) => state.user);

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

  return (
    <div className="mt-2 flex flex-wrap">
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
                    <i className="fas fa-download text-gray-800"></i> Download
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
                    <CompanyItem
                      company={company}
                      key={id}
                      handleEdit={handleEdit}
                      handleRemove={handleRemove}
                      handleCompany={handleCompany}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesList;
