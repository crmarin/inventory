/*eslint-disable*/
import React from 'react';

import IndexNavbar from '@/components/Navbars/IndexNavbar';
import Footer from '@/components/Footers/Footer';

import { shallow } from 'zustand/shallow';
import { productsStore } from '@/store/productsStore';
import { orderStore } from '../../store/orderStore';
import { useNavigate } from 'react-router';

export default function Cart() {
  const navigate = useNavigate();

  const { newOrder } = orderStore(
    (state) => ({
      newOrder: state.newOrder,
    }),
    shallow
  );

  let articulos = [];
  let total = 0;
  const { cart } = productsStore(
    (state) => ({
      cart: state.cart,
    }),
    shallow
  );
  Object.keys(cart).map((item, id) => {
    articulos[id] = cart[item];
    total += cart[item].quantity * cart[item].price;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('totalPrice', total);
    formData.append('cart', JSON.stringify(cart));
    newOrder(formData);
    navigate('/');
  };

  return (
    <>
      <IndexNavbar fixed />

      <section className="">
        <div className="container mx-auto px-4 py-16 mt-10">
          {articulos.length > 0 &&
            articulos.map((item, id) => (
              <div className="flex flex-wrap items-center mt-8" key={id}>
                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    {item.name}
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 text-blueGray-600">
                    <strong>Price:</strong>{' '}
                    {item.price?.toLocaleString('es-ES', {
                      style: 'currency',
                      currency: 'COP',
                    })}
                  </p>
                  <p className="text-lg font-light leading-relaxed mt-0 text-blueGray-600">
                    <strong>Description: </strong> {item.description}
                  </p>
                  <p className="text-lg font-light leading-relaxed mt-0 text-blueGray-600">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p className="text-lg font-light leading-relaxed mt-0 text-blueGray-600">
                    <strong>Total:</strong>{' '}
                    {Number(item.quantity * item.price)?.toLocaleString(
                      'es-ES',
                      {
                        style: 'currency',
                        currency: 'COP',
                      }
                    )}
                  </p>
                </div>

                <div className="w-6/12 lg:w-2/12 px-4 mr-auto ml-auto">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                    <img
                      alt="..."
                      src={`${item.image}`}
                      className="w-full align-middle rounded-t-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <hr className="my-6 border-blueGray-300" />

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-left text-left mb-24">
          <div className="w-full lg:w-6/12 px-4 flex flex-row">
            <div>
              <h2 className="text-4xl font-semibold">Total:</h2>
              <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                {total?.toLocaleString('es-ES', {
                  style: 'currency',
                  currency: 'COP',
                })}
              </p>
            </div>
            <div className="align-middle">
              <form onSubmit={(e) => handleSubmit(e)}>
                <button
                  className="mr-1 mb-1 rounded bg-green-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-green-600"
                  type="submit"
                >
                  Nuevo pedido
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
