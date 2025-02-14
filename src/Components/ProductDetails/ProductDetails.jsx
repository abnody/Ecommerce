import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../Context/CartContext';
  

export default function ProductDetails() {
    let {id} = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    let {addToCart} = useContext(CartContext);

    const setting = {
        dots:true,
        infinite : true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
        arrows:true,
        autoplay:true,
        autoplayspeed:50,
      };

    async function getProduct(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProduct(data.data)
        setIsLoading(false);
    }
    useEffect(()=>{
        getProduct();
    },[])

  return <>
    {isLoading?<Loading/>:
        <div className=' my-10 lg:flex items-center'>
            <div className='lg:w-2/5 lg:mx-0 mx-auto max-w-512 px-5'>
                {product.images.length==1?<div className='my-3'>
                        <img src={product.images[0]} alt={product.title} className='w-full object-cover rounded-lg' />
                    </div>: 
                <Slider {...setting}>
                    {product.images.map( (image , index)=> <div key={index} className='my-3'>
                        <img src={image} alt={product.title} className='w-full object-cover rounded-lg' />
                    </div> )
                    }
                </Slider>}
            </div>
            <div className='lg:w-3/5 px-4 lg:mt-0 lg:mx-0 mx-auto mt-10' >
                <h2 className='text-slate-100'>{product.title.split(" ",10).join(" ")}</h2>
                <p className='mt-2 text-gray-400'>{product.description}</p>

                <div className=' mt-7'>
                    <p className='text-sm text-gray-400'><span className=' text-blue-400 '>Category   : </span> {product.category.name} </p>
                    <p className='text-sm text-gray-400'><span className=' text-blue-400 '>Brand      : </span> {product.brand.name} </p>
                    <p className='text-sm text-gray-400'><span className=' text-blue-400 '>Quantity   : </span> {product.quantity} </p>
                    <p className='text-sm text-gray-400'><span className=' text-blue-400 '>Created At : </span> {product.createdAt.split("T",1)} </p>
                </div>


                <div className='flex justify-between text-gray-400 mt-7'>
                    <span >{`${product.price} EGP`}</span>
                    <span>
                    {product.ratingsAverage}
                    <span><i className=' ps-1 fa fa-star rating-color fa-1x'></i></span>
                    </span>
                </div>

                <button onClick={()=>addToCart(product.id)} type="button" className="text-white bg-main font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 my-2 w-full">Add To Cart</button>
            </div>
        </div>
    }
  </>
}