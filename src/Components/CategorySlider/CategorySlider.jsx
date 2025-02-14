import axios from 'axios';
import React from 'react';
import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query';

export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };


  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ['categoriesslider'],
    queryFn: async () => {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return data.data;
    },
  });

  if (isLoading) return <p className="text-white text-center"></p>;
  if (isError) return <p className="text-red-500 text-center"></p>;

  return (
    <Slider {...settings}>
      {categories.map((category, index) => (
        <div key={index} className="my-3">
          <img src={category.image} alt={category.name} className="w-full h-[200px] object-cover" />
          <h3 className="text-white text-center">{category.name}</h3>
        </div>
      ))}
    </Slider>
  );
}
