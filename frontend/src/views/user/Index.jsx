import React, { useEffect, useRef, useState } from 'react';

import IndexNavbar from '@/components/Navbars/IndexNavbar';
import Footer from '@/components/Footers/Footer';

import { shallow } from 'zustand/shallow';

import { productsStore } from '@/store/productsStore';
import { Link } from 'react-router-dom';

function Products() {
  const { products, getAllProducts, getProductDetail } = productsStore(
    (state) => ({
      products: state.products,
      getAllProducts: state.getAllProducts,
      getProductDetail: state.getProductDetail,
    }),
    shallow
  );

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <IndexNavbar fixed />

      <div className="relative pt-32 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div className="absolute top-0 w-full h-full bg-center bg-cover bg-gray-700">
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black"
          ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-5xl">
                  Ea dolore eiusmod ea ad. Sint ipsum ut irure mollit dolor
                  pariatur
                </h1>
                <p className="mt-4 text-lg text-gray-200">
                  Ipsum ex mollit esse et consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: 'translateZ(0)' }}
        ></div>
      </div>

      <section className="bg-gray-200 mb-24">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            {products.length > 0 &&
              products.map(
                (product, id) =>
                  product.countInStock > 0 && (
                    <div key={id} className="px-2 w-full lg:w-3/12">
                      <Link
                        className="m-5"
                        onClick={() => getProductDetail(product._id)}
                        to={`/product/${product._id}`}
                      >
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                          <img
                            alt="..."
                            src={product.image}
                            className="w-auto align-middle rounded-t-lg inline-flex items-center justify-center h-72"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src =
                                'https://static.thenounproject.com/png/3843803-200.png';
                            }}
                          ></img>
                          <blockquote className="relative py-8 px-2 mb-4">
                            <h6 className="text-lg">{product.name}</h6>
                            {/* <p className="mt-2 mb-4 text-sm text-gray-500 capitalize">
                        {product.category}
                      </p> */}
                            <p className="mt-2 mb-4 text-sm text-gray-500 capitalize">
                              {product.description.length > 20
                                ? product.description.substring(0, 90) + ' ...'
                                : product.description}
                            </p>
                            <div className="mt-2 text-sm">
                              <span className="text-gray-500 mx-2 ">
                                stock:{' '}
                              </span>
                              <span className="text-gray-800">
                                {product.countInStock}
                              </span>
                            </div>
                            <div className="mt-2 mb-3 text-sm">
                              <span className="text-gray-500 mx-2 ">
                                price:{' '}
                              </span>
                              <span className="text-gray-800">
                                {product.price.toLocaleString('es-ES', {
                                  style: 'currency',
                                  currency: 'COP',
                                })}
                              </span>
                            </div>
                          </blockquote>
                        </div>
                      </Link>
                    </div>
                  )
              )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Products;
