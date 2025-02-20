import axios from 'axios';
import React from 'react';
import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    lazyLoad : "ondemand",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
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
          <img src={category.image} alt={category.name} className="aspect-3/2 h-[250px] w-full object-cover" />
          <h3 className="text-white text-center">{category.name}</h3>
        </div>
      ))}
    </Slider>
  );
}
