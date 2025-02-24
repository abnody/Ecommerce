import React, { useContext, useEffect, useState } from 'react'
import { WishlistContext } from '../Context/WishlistContext';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence,motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Wishlist() {


    let {getWishlist,wishlist,isLoading,deleteProduct} = useContext(WishlistContext);
    let navigate= useNavigate();
    const [acc, setAcc] = useState(true)
    const [products, setProducts] = useState([]);


    useEffect(()=>{
        !localStorage.getItem('userToken') && toast.error("You must log in first") && setAcc(false);
    })

    
  useEffect(()=>{
    getWishlist();
    
    },[])

  useEffect(() => {
    if (wishlist?.data && products?.length==0) {
      setProducts(wishlist.data);
    }
  }, [wishlist]);   

  const handleRemoveProduct = async (productId) => {
    setProducts((prev) => prev.filter((item) => item.id !== productId));
    await deleteProduct(productId);
  };

  return <>
  {!acc?null:
  isLoading?<Loading/>:
    <div className="relative overflow-x-auto rounded-2xl  my-16">
        <table className="w-full text-sm text-left rounded-2xl rtl:text-right text-gray-500 ">
            <thead className="text-xs bg-[#1a1a1a] text-white  uppercase bg-#1a1a1a ">
                <tr className=''>
                    <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
            <AnimatePresence>
            {products?.map(product =>
              <motion.tr  key={product.id} className="bg-[#b3b3b3] border-b cursor-pointer  border-[#1a1a1a] hover:bg-[#8c8c8c] duration-300"
              exit={{ opacity: 0, x: -100 }}>
                  <td onClick={()=>navigate(`/productdetails/${product.id}`)} className="p-4">
                    <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title}/>
                  </td>
                  <td onClick={()=>navigate(`/productdetails/${product.id}`)} className="px-6 py-4 font-semibold text-gray-900 "> {product.title} </td>
                  <td className="px-6 py-4">
                      <div onClick={()=>handleRemoveProduct(product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</div>
                  </td>
              </motion.tr>)}</AnimatePresence>
            </tbody>
        </table>
    </div>}
  </>
}
