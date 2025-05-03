import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Loading from '../Loading/Loading';

export default function Cart() {
  const { cart, isLoading, getCart, updateQuantity, deleteProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
    if (!localStorage.getItem('userToken')) {
      toast.error('You must log in first cart');
    }
  }, []);

  useEffect(() => {
    if (cart?.data?.products && products.length == 0) {
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
        <div className="abnd-container relative overflow-x-auto rounded-2xl my-16">
          <p className="text-2xl text-white font-bold font-1 mb-6">Cart Items :</p>
          <div className="grid gap-4">
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product.product.id}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-black rounded-lg p-3 md:p-4 hover:bg-gray-800 duration-300"
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden flex flex-col gap-3">
                    {/* Top Row - Image and Info */}
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <div
                        onClick={() => navigate(`/productdetails/${product.product.id}`)}
                        className="flex-shrink-0"
                      >
                        <img
                          src={product.product.imageCover}
                          className="w-20 h-20 object-cover rounded-lg"
                          alt={product.product.title}
                        />
                      </div>

                      {/* Product Info */}
                      <div
                        onClick={() => navigate(`/productdetails/${product.product.id}`)}
                        className="flex-grow"
                      >
                        <h3 className="text-base font-semibold text-white line-clamp-2">
                          {product.product.title}
                        </h3>
                        <p className="text-[#00f8ff] font-bold mt-1">{product.price} EGP</p>
                      </div>
                    </div>

                    {/* Bottom Row - Quantity and Remove */}
                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-gray-800 rounded-full px-2 py-1">
                        <button
                          onClick={() => product.count > 1 && handleUpdateQuantity(product.product.id, product.count - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition-colors"
                        >
                          <span className="sr-only">Decrease quantity</span>
                          <svg className="w-3 h-3" viewBox="0 0 18 2" fill="none">
                            <path stroke="currentColor" strokeWidth="2" d="M1 1h16" />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-white font-medium mx-2">
                          {product.count}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(product.product.id, product.count + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition-colors"
                        >
                          <span className="sr-only">Increase quantity</span>
                          <svg className="w-3 h-3" viewBox="0 0 18 18" fill="none">
                            <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveProduct(product.product.id)}
                        className="text-red-500 hover:text-red-400 transition-colors p-2"
                      >
                        <i className="fa-solid fa-trash text-lg"></i>
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center gap-4">
                    {/* Product Image */}
                    <div
                      onClick={() => navigate(`/productdetails/${product.product.id}`)}
                      className="flex-shrink-0"
                    >
                      <img
                        src={product.product.imageCover}
                        className="w-32 h-32 object-cover rounded-lg"
                        alt={product.product.title}
                      />
                    </div>

                    {/* Product Info */}
                    <div
                      onClick={() => navigate(`/productdetails/${product.product.id}`)}
                      className="flex-grow"
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {product.product.title}
                      </h3>
                      <p className="text-[#00f8ff] font-bold">{product.price} EGP</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center bg-gray-800 rounded-full p-1">
                        <button
                          onClick={() => product.count > 1 && handleUpdateQuantity(product.product.id, product.count - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition-colors"
                        >
                          <span className="sr-only">Decrease quantity</span>
                          <svg className="w-4 h-4" viewBox="0 0 18 2" fill="none">
                            <path stroke="currentColor" strokeWidth="2" d="M1 1h16" />
                          </svg>
                        </button>
                        <span className="w-12 text-center text-white font-medium">
                          {product.count}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(product.product.id, product.count + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition-colors"
                        >
                          <span className="sr-only">Increase quantity</span>
                          <svg className="w-4 h-4" viewBox="0 0 18 18" fill="none">
                            <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveProduct(product.product.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <i className="fa-solid fa-trash text-xl"></i>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Total and Checkout */}
          <div className="mt-8 p-4 bg-gray-800 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-xl text-white">
              Total: <span className="text-[#00f8ff] font-bold">{cart?.data.totalCartPrice} EGP</span>
            </h3>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full sm:w-auto bg-[#00f8ff] hover:bg-[#00d4d9] text-black font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
