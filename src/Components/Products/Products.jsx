import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import axios from 'axios'
import Loading from '../Loading/Loading';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

export default function Products() {

  let {addToCart} = useContext(CartContext);
  let {addToWishlist,} = useContext(WishlistContext);


  function getProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page`);
  }
  let {data,isLoading,isFetched,isError} = useQuery({
    queryKey:['products'],
    queryFn:getProducts
  })


  return <>
    { isLoading ? <Loading/> :
    <>
      <div className='my-10 flex flex-wrap justify-center '>
        { data?.data.data.map(product => 

        <div key={product.id} className=' py-0 px-2 sm:px-2 max-w-64 w-1/2 md:w-1/3 lg:w-1/6'>
          <div className=' product hover:shadow-black hover:shadow-xl bg-[#3f3f3f] rounded-lg relative'>
          <i onClick={()=>addToWishlist(product.id)} className="fa-xl fa-regular fa-heart cursor-pointer text-red-600 top-7 left-4 absolute transition-all duration-200 "></i>
          <i onClick={()=>addToWishlist(product.id)} className="fa-xl opacity-0 hover:opacity-100 fa-solid fa-heart cursor-pointer text-red-600 top-7 left-4 absolute transition-all duration-200"></i>

            <Link to={`/productdetails/${product.id}`}  className=" block   ">
                <img className="rounded-t-lg w-full" src={product.imageCover} alt={product.title} />
                <div className="px-1 py-3 text-center">
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-main">{product.slug.split("-",2).join(" ")}</h5>
                  <div className='flex justify-between text-gray-400 px-2 my-1'>
                    <span >{`${product.price} EGP`}</span>
                    <span>
                      {product.ratingsAverage}
                      <span><i className=' ps-1 fa fa-star rating-color fa-1x'></i></span>
                    </span>
                  </div>
                </div>
            </Link> 
            <div className='px-5'>
              <div onClick={()=>addToCart(product.id)} className="block cursor-pointer btn bg-main hover:bg-green-400 rounded-lg text-center w-full mx-auto py-2 ">Add To Cart</div>
            </div>
          </div>
        </div>
      
      )   }

      </div>

    </>}
     
  </>
}
