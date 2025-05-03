import React, { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../Context/WishlistContext';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CartContext } from '../Context/CartContext';

export default function Wishlist() {
  let { getWishlist, wishlist, isLoading, deleteProduct } = useContext(WishlistContext);
  let { addToCart } = useContext(CartContext);
  let navigate = useNavigate();
  const [acc, setAcc] = useState(true)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    !localStorage.getItem('userToken') && toast.error("You must log in first") && setAcc(false);
  })

  useEffect(() => {
    getWishlist();
  }, [])

  useEffect(() => {
    if (wishlist?.data && products?.length == 0) {
      setProducts(wishlist.data);
    }
  }, [wishlist]);

  const handleRemoveProduct = async (productId) => {
    setProducts((prev) => prev.filter((item) => item.id !== productId));
    await deleteProduct(productId);
  };

  return <>
    {!acc ? null :
      isLoading ? <Loading /> :
        <div className="abnd-container min-h-[calc(100vh-4rem)] py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Your Wishlist</h2>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Your wishlist is empty</p>
                <button
                  onClick={() => navigate('/products')}
                  className="mt-4 text-white hover:text-gray-300 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-[#1a1a1a] text-white">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {products?.map((product, index) => (
                        <motion.tr
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-[#1a1a1a] border-b border-gray-800 hover:bg-gray-800 transition-colors duration-300"
                        >
                          <td className="px-6 py-4">
                            <div
                              onClick={() => navigate(`/productdetails/${product.id}`)}
                              className="flex items-center gap-4 cursor-pointer"
                            >
                              <img
                                src={product.imageCover}
                                className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg"
                                alt={product.title}
                              />
                              <div>
                                <h3 className="text-white font-medium line-clamp-2">
                                  {product.title}
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">
                                  {product.ratingsAverage}
                                  <i className="fas fa-star text-yellow-400 ml-1"></i>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-white font-bold">
                              {product.price} EGP
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => addToCart(product.id)}
                                className="text-white hover:text-gray-300 transition-colors"
                              >
                                <i className="fas fa-shopping-cart"></i>
                              </button>
                              <button
                                onClick={() => handleRemoveProduct(product.id)}
                                className="text-red-500 hover:text-red-400 transition-colors"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
    }
  </>
}
