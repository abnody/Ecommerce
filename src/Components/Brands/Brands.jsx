import React, { useContext, useRef, useState } from 'react';
import style from './Brands.module.css';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Brands() {
  const [id, setId] = useState(null);
  const sliderRef = useRef(null);
  let { addToCart } = useContext(CartContext);
  let { addToWishlist } = useContext(WishlistContext);

  // Fetch brands using React Query
  const { data: brands, isLoading: brandsLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      return data.data;
    },
  });

  // Fetch products using React Query
  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['brandproducts'],
    queryFn: async () => {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      return data.data;
    },
  });

  const isLoading = brandsLoading || productsLoading;

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -500, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 500, behavior: 'smooth' });
  };

  function dispalyProducts(selectedId) {
    setId(selectedId);
    if (products.filter((product) => product.brand._id === selectedId).length === 0) {
      toast.error("There aren't products from this brand yet", {
        duration: 2000,
        style: {
          background: '#f0ad4e',
          color: 'black',
        },
      });
    }
  }

  function brandFilter(array) {
    return id ? array.filter((product) => product.brand._id === id) : array;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative w-full py-16">
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-secondary p-2 rounded-full shadow-md hover:bg-gray-700 transition hidden md:flex"
            >
              <i className="fa-solid fa-chevron-left fa-lg text-2xl text-main"></i>
            </button>
            <ul ref={sliderRef} className="bg-slate-400 flex rounded-xl mb-10 overflow-x-scroll scrollbar-hide">
              {brands.map((brand) => (
                <div
                  key={brand._id}
                  onClick={() => dispalyProducts(brand._id)}
                  className={` ${brand._id === id ? 'clicked' : ''} py-3 cursor-pointer flex-shrink hover:bg-[#3f3f3f] group duration-300`}
                >
                  <div className="mx-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="brand-card">
                      <img className="w-full h-full object-cover rounded-t-lg" src={brand.image} alt={brand.name} />
                    </div>
                  </div>
                  <h5 className={`${brand._id === id ? 'text-main' : 'text-secondary'} mb-2 text-md text-center font-bold tracking-tight group-hover:text-main duration-300`}>
                    {brand.name}
                  </h5>
                </div>
              ))}
            </ul>
            <button
              onClick={scrollRight}
              className="absolute md:items-center right-0 top-1/2 -translate-y-1/2 bg-secondary p-2 rounded-full shadow-md hover:bg-gray-700 transition hidden md:flex"
            >
              <i className="fa-solid fa-chevron-right text-2xl text-main"></i>
            </button>
          </div>

          <div className="py-10 flex flex-wrap justify-center">
            {brandFilter(products).map((product) => (
              <div key={product.id} className="py-0 px-2 sm:px-2 max-w-64 w-1/2 md:w-1/3 lg:w-1/6">
                <div className="product hover:shadow-black hover:shadow-xl bg-[#3f3f3f] rounded-lg relative">
                  <i onClick={() => addToWishlist(product.id)} className="fa-xl fa-regular fa-heart cursor-pointer text-red-600 top-7 left-4 absolute transition-all duration-200"></i>
                  <i onClick={() => addToWishlist(product.id)} className="fa-xl opacity-0 hover:opacity-100 fa-solid fa-heart cursor-pointer text-red-600 top-7 left-4 absolute transition-all duration-200"></i>
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
                  <div className="px-5">
                    <div onClick={() => addToCart(product.id)} className="block cursor-pointer btn bg-main hover:bg-green-400 rounded-lg text-center w-full mx-auto py-2">
                      Add To Cart
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
