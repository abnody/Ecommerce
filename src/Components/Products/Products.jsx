import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import { useQuery } from '@tanstack/react-query';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Products() {
  let { getCart, addToCart } = useContext(CartContext);
  let { getWishlist, addToWishlist, wishlist, deleteProduct } = useContext(WishlistContext);


  const [wishlistIds, setWishlistIds] = useState(new Set(wishlist?.data?.map(item => item.id) || []));

  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = React.useState("up");
  useEffect(() => {
    getWishlist();
  }, []);

  useEffect(() => {
    getCart();
  })
  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - scrollY.getPrevious();
    setScrollDirection(diff > 0 ? "down" : "up");
  });

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page`);
  }

  let { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });


  const handleWishlistToggle = async (productId) => {
    if (wishlistIds.has(productId)) {
      setWishlistIds(prev => new Set([...prev].filter(id => id !== productId)));
      await deleteProduct(productId);
    } else {
      setWishlistIds(prev => new Set(prev.add(productId)));
      await addToWishlist(productId);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="my-10 abnd-container flex flex-wrap justify-center">
          {data?.data?.data.map((product) => {
            const isInWishlist = wishlistIds.has(product.id);

            return (
              <motion.div
                key={product.id}
                className="py-0 px-2 sm:px-2 max-w-64 w-1/2 md:w-1/3 lg:w-1/6"
                initial={scrollDirection === 'up' ? { opacity: 0, y: 100 } : null}
                whileInView={{ opacity: 1, y: 0 }}
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
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
}
