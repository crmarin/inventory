/*eslint-disable*/
import React from 'react';
import { Link } from 'react-router-dom';

import IndexNavbar from '@/components/Navbars/IndexNavbar';
import Footer from '@/components/Footers/Footer';

import { userStore } from '@/store/userStore';
import { shallow } from 'zustand/shallow';

export default function Index() {
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
  return (
    <>
      <IndexNavbar fixed />
      <section className="header max-h-860-px relative flex h-screen items-center pt-16">
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="w-full px-4 md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="pt-32 sm:pt-0">
              <h2 className="text-4xl font-semibold text-gray-600">
                Inventory system for a company.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-500">
                Notus React is Free and Open Source. It does not change any of
                the CSS from . It features multiple HTML elements and it comes
                with dynamic components for ReactJS, Vue and Angular.
              </p>
              <div>
                <p className="mt-6 text-lg leading-relaxed text-gray-500">
                  Admin user:{' '}
                </p>
                <p>admin@test.com</p>
              </div>
              <div>
                <p className="mt-2 text-lg leading-relaxed text-gray-500">
                  Normal user:{' '}
                </p>
                <p>user@test.com</p>
                <p className="text-lg leading-relaxed text-gray-500">Passwords:</p>
                <p>123</p>
              </div>
              {!isAuthenticated && (
                <div className="mt-12">
                  <Link
                    href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index"
                    to="/auth/login"
                    className="get-started mr-1 mb-1 rounded bg-blue-500 px-6 py-4 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                    className="github-star ml-1 mr-1 mb-1 rounded bg-gray-700 px-6 py-4 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-gray-600"
                    to="/auth/register"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
