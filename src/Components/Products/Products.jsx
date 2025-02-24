import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import { useQuery } from '@tanstack/react-query';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Products() {
  let { getCart,addToCart } = useContext(CartContext);
  let { getWishlist,addToWishlist, wishlist, deleteProduct } = useContext(WishlistContext);


  const [wishlistIds, setWishlistIds] = useState(new Set(wishlist?.data?.map(item => item.id) || []));

  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = React.useState("up");
  useEffect(() => {
    getWishlist();
  }, []);

  useEffect(()=>{
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
        <div className="my-10 flex flex-wrap justify-center">
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
                <div className="product hover:shadow-black hover:shadow-xl bg-[#3f3f3f] rounded-lg relative">
                  <i
                    onClick={() => handleWishlistToggle(product.id)}
                    className={`fa-xl cursor-pointer top-7 left-4 absolute transition-all duration-200 ${
                      isInWishlist ? "fa-solid fa-heart text-red-600" : "fa-regular fa-heart text-gray-400 hover:text-red-600"
                    }`}
                  ></i>

                  <Link to={`/productdetails/${product.id}`} className="block">
                    <img
                      className="rounded-t-lg w-full"
                      src={product.imageCover}
                      alt={product.title}
                    />
                    <div className="px-1 py-3 text-center">
                      <h2 className="mb-2 text-lg font-bold tracking-tight text-main">
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
                  <div className="px-5">
                    <div
                      onClick={() => {addToCart(product.id)}}
                      className="block cursor-pointer btn bg-main hover:bg-green-400 rounded-lg text-center w-full mx-auto py-2"
                    >
                      Add To Cart
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
}
