import React, { useEffect, useState } from 'react';

import IndexNavbar from '@/components/Navbars/IndexNavbar';
import Footer from '@/components/Footers/Footer';

import { useNavigate, useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import { shallow } from 'zustand/shallow';

import { productsStore } from '@/store/productsStore';
import { userStore } from '../../store/userStore';

function Index() {
  const navigate = useNavigate();

  const { product, cart, getProductDetail, addCart } = productsStore(
    (state) => ({
      product: state.product,
      cart: state.cart,
      getProductDetail: state.getProductDetail,
      addCart: state.addCart,
    }),
    shallow
  );

  const { token: isAuthenticated } = userStore(
    (state) => ({
      token: state.token,
    }),
    shallow
  );

  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) document.location.href = '/auth/login';

    let newCart = cart;
    let newProduct = Object.assign({}, product);
    newProduct.quantity = quantity;
    newProduct.total = quantity * newProduct.price;

    if (cart.length === 0) newCart = [newProduct];
    else {
      newCart.push(newProduct);
    }
    addCart(newCart);
    navigate('/');
  };

  let { id } = useParams();

  useEffect(() => {
    getProductDetail(id);
  }, [id]);

  const increment = () => {
    setQuantity((prevCount) => {
      if (product.countInStock >= prevCount + 1) return prevCount + 1;
      return product.countInStock;
    });
  };

  const decrement = () => {
    setQuantity((prevCount) => {
      if (1 <= prevCount - 1) return prevCount - 1;
      return 1;
    });
  };

  return (
    <>
      <IndexNavbar fixed />

      <div className="relative pt-16 pb-16 flex content-center items-center justify-center min-h-screen-75">
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: 'translateZ(0)' }}
        ></div>
      </div>

      <section className="relative mb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="mx-auto px-4 relative lg:w-6/12 w-full md:w-full">
              <div className="relative">
                <div className="relative w-full overflow-hidden">
                  <div className="w-full flex justify-center align-middle p-12 transform duration-500 transition-all ease-in-out mx-auto">
                    <img
                      alt="..."
                      src={product.image}
                      className="w-auto mx-auto rounded-t-lg inline-flex items-center justify-center h-96"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          'https://static.thenounproject.com/png/3843803-200.png';
                      }}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            {product && (
              <div className="mr-auto px-4 relative lg:w-6/12 w-full md:w-full">
                <h2 className="text-3xl font-bold leading-tight mt-0 mb-0">
                  {product.name}
                </h2>
                <div className="pt-2">
                  <div className="text-orange-500">
                    <i className="mr-1 fas fa-star"></i>
                    <i className="mr-1 fas fa-star"></i>
                    <i className="mr-1 fas fa-star"></i>
                    <i className="mr-1 fas fa-star"></i>
                    <i className="mr-1 fas fa-star-half-alt"></i>
                  </div>
                </div>
                <h2 className="text-3xl font-normal mt-2 mb-2">
                  {product.price?.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'COP',
                  })}
                </h2>
                <p className="text-blueGray-500">{product.description}</p>

                <p className="text-blueGray-500 mt-3">
                  Stock: {product.countInStock}{' '}
                </p>

                <div className="my-6 flex flex-wrap -mx-4">
                  <div className="px-4 relative w-full lg:w-5/12">
                    <label className="inline-block mb-2">Cantidad</label>
                    <div className="relative inline-flex flex-row w-full items-stretch">
                      <div className="mr-2">
                        <button
                          onClick={decrement}
                          value={quantity}
                          className="inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 mr-2  text-white bg-orange-500 border-orange-500 active:bg-orange-600 active:border-orange-600 text-sm px-6 py-2 shadow hover:shadow-lg rounded-md"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                      </div>
                      <div className="mr-2">
                        <div className="mb-3 pt-0">
                          <input
                            type="text"
                            name="quantity"
                            className="border-blueGray-300 px-3 py-2 text-sm  w-full placeholder-blueGray-200 text-blueGray-700 relative bg-white rounded-md outline-none focus:ring focus:ring-lightBlue-500 focus:border-lightBlue-500 border border-solid transition duration-200 "
                            value={quantity}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={increment}
                          value={quantity}
                          className="inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 mr-2  text-white bg-orange-500 border-orange-500 active:bg-orange-600 active:border-orange-600 text-sm px-6 py-2 shadow hover:shadow-lg rounded-md"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <h2 className="text-2xl font-normal my-5">
                      Total:{' '}
                      {Number(quantity * product.price)?.toLocaleString(
                        'es-ES',
                        {
                          style: 'currency',
                          currency: 'COP',
                        }
                      )}
                    </h2>
                  </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <button className="inline-block outline-none focus:outline-none align-middle transition-all duration-150 ease-in-out uppercase border border-solid font-bold last:mr-0 mr-2  text-white bg-orange-500 border-orange-500 active:bg-orange-600 active:border-orange-600 text-sm px-6 py-2 shadow hover:shadow-lg rounded-md">
                    Add to Cart <i className="fas fa-shopping-cart"></i>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Index;
