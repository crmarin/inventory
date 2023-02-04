import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Admin() {
  return (
    <>
      <div>
        {/* Header */}
        <div className="h-full m-auto w-full px-4 md:px-2 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </>
  );
}
