import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../Context/CartContext';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  
  let {getCart,cart,isLoading,updateQuantity,deleteProduct} = useContext(CartContext);
 

  useEffect(()=>{
    getCart();
  },[])
  const navigate = useNavigate()
  

  return <>
    {isLoading?<Loading/>:<>
    <div className="relative overflow-x-auto rounded-2xl  my-16">
        <table className="w-full text-sm text-left rounded-2xl rtl:text-right text-[#1a1a1a] ">
            <thead className="text-xs text-white uppercase bg-[#1a1a1a] ">
                <tr className=''>
                    <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                        Qty
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
            {(cart.data.products).map(product =>
              <tr key={product.product.id} className="bg-[#b3b3b3] border-b cursor-pointer  border-[#1a1a1a] hover:bg-[#8c8c8c] duration-300" >
                  <td onClick={()=>navigate(`/productdetails/${product.product.id}`)} className="p-4">
                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title}/>
                  </td>
                  <td onClick={()=>navigate(`/productdetails/${product.product.id}`)} className="px-6 py-4 font-semibold text-gray-900 "> {product.product.title} </td>
                  <td className="px-6 py-4">
                      <div className="flex items-center">
                          <button onClick={()=>updateQuantity(`${product.product.id}`,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full " type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                              </svg>
                          </button>
                          <div>
                              <span type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg px-5" >{product.count}</span>
                          </div>
                          <button onClick={()=>updateQuantity(`${product.product.id}`,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full  hover:bg-gray-100 " type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                              </svg>
                          </button>
                      </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white"> {product.price} </td>
                  <td className="px-6 py-4">
                      <div onClick={()=>deleteProduct(product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</div>
                  </td>
              </tr>)}
            </tbody>
        </table>

        <div className='flex justify-between pt-3'>
        <h3 className='text-2xl text-white'> Total Cart Price : <span className='text-green-700'>{cart.data.totalCartPrice}</span></h3>
        <button onClick={()=>navigate('/checkout')} className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">CheckOut</button>
    </div>
    </div>


    </>
    }

    

  </>
}
