import React, { useContext, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../Loading/Loading';
import { WishlistContext } from '../Context/WishlistContext';
import { CartContext } from '../Context/CartContext';

export default function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const sliderRef = useRef(null);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  // ✅ Fetch categories using `useQuery`
  const { data: categories = [], isLoading: isCategoriesLoading, isError: isCategoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return data.data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // ✅ Fetch products using `useQuery`
  const { data: products = [], isLoading: isProductsLoading, isError: isProductsError } = useQuery({
    queryKey: ['productscat'],
    queryFn: async () => {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products?page');
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  // ✅ Scroll functions
  const scrollLeft = () => sliderRef.current?.scrollBy({ left: -500, behavior: 'smooth' });
  const scrollRight = () => sliderRef.current?.scrollBy({ left: 500, behavior: 'smooth' });

  // ✅ Filter products based on selected category
  const filteredProducts = selectedCategoryId
    ? products.filter((product) => product.category._id === selectedCategoryId)
    : products;

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);

    if (filteredProducts.length === 0) {
      toast.error("There aren't any products in this category yet!", {
        duration: 2000,
        style: { background: '#f0ad4e', color: 'black' },
      });
    }
  };

  if (isCategoriesLoading || isProductsLoading) return <Loading />;
  if (isCategoriesError || isProductsError)
    return <div className="text-red-500 text-center">Failed to load data. Please try again.</div>;

  return (
    <div className="relative w-full py-16">
      {/* Categories Section */}
      <div className="relative">
        <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 bg-secondary p-2 rounded-full shadow-md hover:bg-gray-700 transition hidden md:flex">
          <i className="fa-solid fa-chevron-left fa-lg text-2xl text-main"></i>
        </button>

        <ul ref={sliderRef} className="bg-slate-400 flex rounded-xl mb-10 overflow-x-scroll scrollbar-hide">
          {categories.map((cat) => (
            <div key={cat._id} onClick={() => handleCategoryClick(cat._id)} className={`py-3 cursor-pointer flex-shrink hover:bg-[#3f3f3f] group duration-300 ${cat._id === selectedCategoryId ? 'clicked' : ''}`}>
              <div className="mx-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="card">
                  <img className="w-full h-full object-cover rounded-t-lg" src={cat.image} alt={cat.name} />
                </div>
              </div>
              <h5 className={`mb-2 text-md text-center font-bold tracking-tight group-hover:text-main duration-300 ${cat._id === selectedCategoryId ? 'text-main' : 'text-secondary'}`}>{cat.name}</h5>
            </div>
          ))}
        </ul>

        <button onClick={scrollRight} className="absolute md:items-center right-0 top-1/2 -translate-y-1/2 bg-secondary p-2 rounded-full shadow-md hover:bg-gray-700 transition hidden md:flex">
          <i className="fa-solid fa-chevron-right text-2xl text-main"></i>
        </button>
      </div>

      {/* Products Section */}
      <div className="py-10 flex flex-wrap justify-center">
        {filteredProducts.map((product) => (
          <div key={product.id} className="py-0 px-2 sm:px-2 max-w-64 w-1/2 md:w-1/3 lg:w-1/6">
            <div className="product hover:shadow-black hover:shadow-xl bg-[#3f3f3f] rounded-lg relative">
              {/* Wishlist Icons */}
              <i onClick={() => addToWishlist(product.id)} className="fa-xl fa-regular fa-heart cursor-pointer text-red-600 top-7 left-4 absolute transition-all duration-200"></i>
              <i onClick={() => addToWishlist(product.id)} className="fa-xl opacity-0 hover:opacity-100 fa-solid fa-heart cursor-pointer text-red-600 top-7 left-4 absolute transition-all duration-200"></i>

              {/* Product Details */}
              <Link to={`/productdetails/${product.id}`} className="block">
                <img className="rounded-t-lg w-full" src={product.imageCover} alt={product.title} />
                <div className="px-1 py-3 text-center">
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-main">{product.slug.split('-', 2).join(' ')}</h5>
                  <div className="flex justify-between text-gray-400 px-2 my-1">
                    <span>{`${product.price} EGP`}</span>
                    <span>
                      {product.ratingsAverage}
                      <i className="ps-1 fa fa-star rating-color fa-1x"></i>
                    </span>
                  </div>
                </div>
              </Link>

              {/* Add to Cart Button */}
              <div className="px-5">
                <button onClick={() => addToCart(product.id)} className="block cursor-pointer btn bg-main hover:bg-green-400 rounded-lg text-center w-full mx-auto py-2">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
