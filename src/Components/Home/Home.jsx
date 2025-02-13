import React from 'react'
import style from './Home.module.css'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import Products from '../Products/Products'

export default function Home() {
  
  return <>
    <MainSlider/>
    <CategorySlider/>
    <Products/>
  
  </>
}
