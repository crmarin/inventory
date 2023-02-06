import React from 'react';
import background from '@/assets/404.svg';

export default function Page404() {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <div
          className="bg-50 absolute h-full w-full bg-cover"
          style={{ backgroundImage: `url(${background})` }}
        ></div>
        <div className="container mx-auto h-full px-4">
          <div className="-mx-4 flex h-full flex-wrap items-center">
            <div className="relative w-full px-4 text-center">
              <h1 className="text-10 sm:text-12 tracking-875 font-bold text-gray-800">
                404
              </h1>
              <h4 className="mb-2 mt-0 text-3xl font-bold">
                You doesn't have permission to access here :(
              </h4>
              <p className="text-2xl font-normal leading-normal text-gray-500">
                Ooooups! Puede could you connect with the admin site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
