import React, { useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { userStore } from '@/store/userStore';
import { shallow } from 'zustand/shallow';

import Auth from '@/layouts/Auth';
import setAuthToken from './utils/setAuthToken';

import Login from '@/views/auth/Login';
import Register from '@/views/auth/Register';

import Index from '@/views/user/Index';
import Product from '@/views/user/Product';
import Cart from './views/user/Cart';

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
      {/* <>
        <Route path="products" element={<User />}>
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="product/:id"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
        </Route>
      </> */}
      <Route path="auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Index />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

const ProtectedRoute = ({ children }) => {
  const token = userStore((state) => state.token);
  const isAuthenticated = token;

  if (!isAuthenticated) {
    // return <Navigate to="products" replace />;
  }
  return children;
};

export default App;
