import React from 'react';

import { articleStore } from '@/store/articleStore';
import { companyStore } from '@/store/companyStore';

const ArticlesList = ({ articles, handleEdit, handleRemove }) => {
  const showModal = articleStore((state) => state.showModal);
  const company = companyStore((state) => state.company);

  return (
    <div className="-m-24 mx-auto lg:w-9/12 w-full lg:px-10 px-0 min-h-full">
      <div className="mt-20 flex flex-wrap">
        <div className="mb-12 w-full px-4">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
            <div className="mb-0 rounded-t border-0 px-4 py-3">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                  <p className="text-gray-500 text-lg font-semibold">
                    List of Articles of Company:{' '}
                    <span className="text-gray-700">{company?.name}</span>
                  </p>
                </div>
                <button
                  className="my-3 ml-3 rounded bg-green-500 px-2 py-2 text-sm font-bold text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-green-700"
                  type="button"
                  onClick={() => {
                    showModal();
                  }}
                >
                  New article
                </button>
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
                      description
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      price
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100">
                      stock
                    </th>
                    <th className="px-3 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100">
                      options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {articles &&
                    articles?.map((article, id) => (
                      <tr key={id}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {article.name}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {article.description}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {article.price}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {article.countInStock}
                        </td>
                        <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-center text-xs whitespace-nowrap">
                          <button
                            className="background-transparent mr-1 mb-1 px-3 py-3 font-bold uppercase text-blue-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                            type="button"
                          >
                            <i
                              className="fas fa-edit"
                              onClick={() => {
                                handleEdit(article);
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
                                handleRemove(article._id);
                              }}
                            ></i>
                          </button>
                        </td>
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

export default ArticlesList;
