import React, { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { WishlistContext } from '../Context/WishlistContext';
import { CartContext } from '../Context/CartContext';
import { AnimatePresence, motion } from 'motion/react';

export default function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const sliderRef = useRef(null);
  const { getCart, addToCart } = useContext(CartContext);
  let { getWishlist, addToWishlist, wishlist, deleteProduct } = useContext(WishlistContext);

  useEffect(() => {
    getWishlist();
  }, []);

  useEffect(() => {
    getCart();
  })

  const [wishlistIds, setWishlistIds] = useState(new Set(wishlist?.data?.map(item => item.id) || []));
  const handleWishlistToggle = async (productId) => {
    if (wishlistIds.has(productId)) {
      setWishlistIds(prev => new Set([...prev].filter(id => id !== productId)));
      await deleteProduct(productId);
    } else {
      setWishlistIds(prev => new Set(prev.add(productId)));
      await addToWishlist(productId);
    }
  };

  const { data: categories = [], isLoading: isCategoriesLoading, isError: isCategoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { data: products = [], isLoading: isProductsLoading, isError: isProductsError } = useQuery({
    queryKey: ['productscat'],
    queryFn: async () => {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products?page');
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });


  const scrollLeft = () => sliderRef.current?.scrollBy({ left: -500, behavior: 'smooth' });
  const scrollRight = () => sliderRef.current?.scrollBy({ left: 500, behavior: 'smooth' });

  function dispalyProducts(selectedId) {
    setSelectedCategoryId(selectedId);
    if (products.filter((product) => product.category._id == selectedId).length === 0) {
      toast.error("There aren't products from this category yet", {
        duration: 2000,
        style: {
          background: '#f0ad4e',
          color: 'black',
        },
      });
    }
  }

  function catFilter(array) {

    return selectedCategoryId ? array.filter((product) => product.category._id === selectedCategoryId) : array;
  }

  if (isCategoriesLoading || isProductsLoading) return <Loading />;
  if (isCategoriesError || isProductsError)
    return <div className="text-red-500 text-center">Failed to load data. Please try again.</div>;

  return (
    <div className="relative w-full py-16 abnd-container">

      <div className="relative">
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-[#00f8ff] w-12 h-12 items-center justify-center rounded-full shadow-md hover:bg-gray-700 transition flex z-10">
          <i className="fa-solid fa-chevron-left fa-lg text-2xl"></i>
        </button>

        <ul
          ref={sliderRef}
          className="bg-gray-800 flex rounded-xl mb-10 overflow-x-scroll scrollbar-hide"
        >
          {categories.map((cat) => (
            <div key={cat._id} onClick={() => dispalyProducts(cat._id)} className={`py-3 cursor-pointer flex-shrink hover:bg-black group duration-300 ${cat._id === selectedCategoryId ? 'clicked' : ''}`}>
              <div className="mx-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="card">
                  <img className="w-full h-full object-cover rounded-t-lg" src={cat.image} alt={cat.name} />
                </div>
              </div>
              <h5 className={`mb-2 text-md text-center font-medium tracking-tight  duration-300 ${cat._id === selectedCategoryId ? 'text-[#00f8ff] ' : 'text-white'}`}>{cat.name}</h5>
            </div>
          ))}
        </ul>

        <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-[#00f8ff] w-12 h-12 items-center justify-center rounded-full shadow-md hover:bg-gray-700 transition flex z-10">
          <i className="fa-solid fa-chevron-right text-2xl"></i>
        </button>
      </div>



      <div className="py-10 flex flex-wrap justify-center">
        <AnimatePresence>
          {catFilter(products).map((product) => {
            const isInWishlist = wishlistIds.has(product.id);
            return (
              <motion.div key={product.id} className="py-0 px-2 sm:px-2 max-w-64 w-1/2 md:w-1/3 lg:w-1/6"
                layout
                transition={{ duration: 0.5 }}
              >
                <div className="product rounded-lg relative mb-9 ">
                  <Link to={`/productdetails/${product.id}`} className="block">
                    <div className='overflow-hidden rounded-lg relative'>
                      <img
                        className="product-img rounded-lg w-full"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <div className='list bottom-2 bg-opacity-50 left-2 absolute flex gap-4 bg-black rounded-lg px-4 py-1 z-50 opacity-0'>
                        <i
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleWishlistToggle(product.id);
                          }}
                          className={`cursor-pointer  transition-all duration-200  text-xl ${isInWishlist ? "fa-solid fa-heart text-red-700" : "fa-regular fa-heart text-white hover:text-red-700"
                            }`}
                        ></i>
                        <i
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product.id);
                          }}
                          className="fa-solid fa-cart-shopping cursor-pointer text-xl text-white hover:text-green-400"
                        ></i>
                      </div>
                    </div>
                    <div className="px-1 py-3 text-center">
                      <h2 className="mb-2 text-lg font-bold tracking-tight text-gray-200 font-1">
                        {product.slug.split('-', 2).join(' ')}
                      </h2>
                      <div className="flex justify-between text-gray-400 px-2 my-1">
                        <span>{`${product.price} EGP`}</span>
                        <span>
                          {product.ratingsAverage}
                          <span>
                            <i className="ps-1 fa fa-star rating-color fa-1x"></i>
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>);
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
