import React from 'react';
import { Link } from 'react-router-dom';

import { userStore } from '@/store/userStore';
import { shallow } from 'zustand/shallow';

export default function Navbar(props) {
  const {
    user,
    token: isAuthenticated,
    logout,
  } = userStore(
    (state) => ({
      user: state.user,
      token: state.token,
      logout: state.logout,
    }),
    shallow
  );

  const onLogoutClick = () => {
    logout();
  };

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-end px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-end">
          <div className="w-full relative flex justify-end lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/home"
              className="text-gray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Home
            </Link>
            <Link
              to="/companies"
              className="text-gray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Companies
            </Link>
          </div>

          <div className="w-full relative flex justify-end lg:w-auto lg:static lg:block lg:justify-start">
            {isAuthenticated ? (
              <a
                onClick={() => onLogoutClick()}
                href="#!"
                className="text-red-500 hover:text-gray-500 text-sm uppercase py-3 font-bold block"
              >
                Logout
              </a>
            ) : (
              <Link
                to="auth/login"
                className="text-red-500 hover:text-gray-500 text-sm uppercase py-3 font-bold block"
              >
                login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
