import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Loading from '../Loading/Loading';

export default function Cart() {
  const { cart, isLoading, getCart, updateQuantity, deleteProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCart();
    if (!localStorage.getItem('userToken')) {
      toast.error('You must log in first cart');
    }
  }, []);

  useEffect(() => {
    if (cart?.data?.products) {
      setProducts(cart.data.products);
    }
  }, [cart]);

  const handleUpdateQuantity = (productId, newCount) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, count: newCount } : item
      )
    );
    updateQuantity(productId, newCount);
  };

  const handleRemoveProduct = async (productId) => {
    setProducts((prev) => prev.filter((item) => item.product.id !== productId));
    await deleteProduct(productId);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !localStorage.getItem('userToken') ? (
        <h2 className="text-center h-full">
          The cart is still empty{' '}
          <Link to={'/products'} className="underline text-main text-lg">
            add products
          </Link>
        </h2>
      ) : (
        <div className="relative overflow-x-auto rounded-2xl my-16">
          <table className="w-full text-sm text-left rtl:text-right text-[#1a1a1a]">
            <thead className="text-xs text-white uppercase bg-[#1a1a1a]">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="hidden md:table-cell px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {products.map((product) => (
                  <motion.tr
                    key={product.product.id}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-[#b3b3b3] md:border-b cursor-pointer border-[#1a1a1a] hover:bg-[#8c8c8c] duration-300"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.product.title}
                    </td>
                    <td className="hidden md:table-cell px-3 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            product.count > 1 &&
                            handleUpdateQuantity(product.product.id, product.count - 1)
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full"
                        >
                          <span className="sr-only">Decrease quantity</span>
                          <svg className="w-3 h-3" viewBox="0 0 18 2" fill="none">
                            <path stroke="currentColor" strokeWidth="2" d="M1 1h16" />
                          </svg>
                        </button>
                        <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg px-5">
                          {product.count}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(product.product.id, product.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        >
                          <span className="sr-only">Increase quantity</span>
                          <svg className="w-3 h-3" viewBox="0 0 18 18" fill="none">
                            <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{product.price}</td>
                    <td className="px-6 py-4">
                      <div
                        onClick={() => handleRemoveProduct(product.product.id)}
                        className="cursor-pointer font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
