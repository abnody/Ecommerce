import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import { WishlistContext } from '../Context/WishlistContext';
import { CartContext } from '../Context/CartContext';

export default function Categories() {


  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState(null)
  const [id, setId] = useState(null)
  const [products, setProducts] = useState(null);
  const sliderRef = useRef(null);
  let   {addToCart} = useContext(CartContext);
  let   {addToWishlist} = useContext(WishlistContext);


  useEffect(()=>{
    getCat();
    getProducts();
  },[])



  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
    
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };
  


  async function getCat() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategories(data.data);
  }
  async function getProducts() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page`);
    setProducts(data.data);
    
    setIsLoading(false);
  }



  function dispalyProducts(id){
    setId(id);
    
    if(products.filter(product=>product.category._id==id).length==0)
    {
      toast.error("there isn't products in this category yet",{
        duration :2000,
        style :{
          background:'#f0ad4e',
          color : 'black'
        }
      })
    }
  }
  function catFilter(array){
    let value =array;
    if(id){
      value = array.filter(product=>product.category._id==id);
    }
    return value.length?value:array
  }

  
  return <>
  {isLoading ? <Loading/> :<>
  
    <div className='relative w-full py-16'>
      <div className='relative'>
      {/* <h2 className='text-main'>{cat.name}</h2> */}
      <button onClick={scrollLeft}
      className="absolute left-0 top-1/2 -translate-y-1/2 bg-secondary p-2 rounded-full shadow-md hover:bg-gray-700 transition hidden md:flex"
      >
        <i className="fa-solid fa-chevron-left fa-lg text-2xl text-main "></i>
      </button>
      <ul ref={sliderRef} className=" bg-slate-400 flex rounded-xl mb-10 scroll-mx-10 overflow-x-scroll scrollbar-hide ">
        {(categories).map( cat => 
          <div key={cat._id} onClick={()=>dispalyProducts(cat._id)}  className={` ${cat._id==id?'clicked':''} py-3 cursor-pointer flex-shrink hover:bg-[#3f3f3f] group  duration-300`}>
            <div className="mx-3 bg-white border  border-gray-200 rounded-lg shadow-sm ">
              <div className=' card'>
                  <img className="w-full h-full object-cover rounded-t-lg" src={cat.image} alt={cat.name} />
              </div>
            </div>
            <h5 className={` ${cat._id==id?'text-main':'text-secondary'} mb-2 text-md text-center font-bold tracking-tight group-hover:text-main duration-300 `}>{cat.name}</h5>
          </div>
        )}
      </ul>


      <button onClick={scrollRight}
        className="absolute md:items-center right-0 top-1/2 -translate-y-1/2 bg-secondary p-2 rounded-full shadow-md hover:bg-gray-700 transition hidden md:flex"
      >
      <i className="fa-solid fa-chevron-right  text-2xl text-main "></i>
      </button>
      </div>

      <div className='py-10 flex flex-wrap justify-center'>
      { catFilter(products).map(product => 
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

        )}

      </div>
    </div>
  
  </>
}
</>


}





