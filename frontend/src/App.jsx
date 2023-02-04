import React, { useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { userStore } from '@/store/userStore';
import { shallow } from 'zustand/shallow';

import Auth from '@/layouts/Auth';
import Admin from '@/layouts/Admin';
import setAuthToken from './utils/setAuthToken';

import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';

import Companies from '@/views/admin/Companies';
import Articles from '@/views/admin/Articles';
import Index from './views/Index';
import Page404 from './views/auth/Page404';

function App() {
  const { loadUser, token: isAuthenticated } = userStore(
    (state) => ({
      loadUser: state.loadUser,
      token: state.token,
    }),
    shallow
  );

  const isRunned = useRef(false);

  if (isAuthenticated) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    if (isRunned.current) return;
    isRunned.current = true;
    if (isAuthenticated) loadUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Admin />}>
        {isAuthenticated && (
          <Route
            path="companies/:id"
            element={
              <ProtectedRoute>
                <Articles />
              </ProtectedRoute>
            }
          />
        )}
        <Route path="companies" element={<Companies />} />
        <Route path="" element={<Index />} />
      </Route>
      <Route path="auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Route>
      <Route path="*" element={<Index />} />
    </Routes>
  );
}

const ProtectedRoute = ({ children }) => {
  const { user, token: isAuthenticated } = userStore(
    (state) => ({
      user: state.user,
      token: state.token,
    }),
    shallow
  );
  const adminRole = user && user.isAdmin ? true : false;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  if (isAuthenticated && !adminRole) {
    return <Page404 to="/" replace />;
  }
  return children;
};

export default App;
