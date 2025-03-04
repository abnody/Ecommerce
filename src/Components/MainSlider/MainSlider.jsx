import React from 'react'
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import banner1 from '../../assets/images/slider-2.jpeg'
import banner2 from '../../assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {
  const setting = {
    dots:false,
    infinite : true,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1,
    arrows:false,
    autoplay:true,
    autoplayspeed:50,
  }

  return <>
    <div className='flex mt-8'>
      <div className='w-3/4'>
        <Slider {...setting}>
          <img src={slide1} alt="" className='w-full h-[400px] object-cover' />
          <img src={slide2} alt="" className='w-full h-[400px] object-cover' />
          <img src={slide3} alt="" className='w-full h-[400px] object-cover' />
        </Slider>
      </div>
      <div className='w-1/4'>
        <img src={banner1} alt="" className='w-full h-[200px]' />
        <img src={banner2} alt="" className='w-full h-[200px]' />
      </div>
    </div>
  </>
}
