import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {
  const setting = {
    dots:false,
    infinite : true,
    speed:500,
    slidesToShow:6,
    slidesToScroll:1,
    arrows:false,
    autoplay:true,
    autoplayspeed:50,
  }
  const [categories, setCategories] = useState([]);

  async function getCat() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategories(data.data);
    
  }

  useEffect( ()=>{
    getCat();
  },[])

  return <>
    <Slider {...setting}>
      {categories.map( (category , index)=> <div key={index} className='my-3'>
        <img src={category.image} alt={category.name} className='w-full h-[200px] object-cover ' />
        <h3 className='text-white text-center'>{category.name}</h3>
      </div> )}
    </Slider>
  </>
}
