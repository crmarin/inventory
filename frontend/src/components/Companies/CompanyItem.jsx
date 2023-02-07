import { Link } from 'react-router-dom';

import { companyStore } from '@/store/companyStore';
import { userStore } from '@/store/userStore';

const CompanyItem = ({ company, handleEdit, handleRemove, handleCompany }) => {
  const showModal = companyStore((state) => state.showModal);
  const user = userStore((state) => state.user);

  return (
    <tr>
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
  );
};

export default CompanyItem;
