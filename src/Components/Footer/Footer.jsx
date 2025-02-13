import React from 'react'
import style from './Footer.module.css'

export default function Footer() {
  
  return <>

    <div className='text-center bg-secondary py-3'>
      <h2 className='text-main py-2'>Follow Us On : </h2>
      <ul className='flex justify-center space-x-5 text-white'>
        <a href="#" className='a'>
          <li><i className='fab fa-facebook-f fa-lg '></i></li>
        </a>
        <a href="#" className='a'>
          <li><i className='fab fa-x-twitter fa-lg '></i></li>
        </a>
        <a href="#" className='a'>
          <li><i className='fab fa-instagram fa-lg '></i></li>
        </a>
        <a href="#" className='a'>
          <li><i className='fab fa-telegram-plane fa-lg '></i></li>
        </a>
      </ul>
    </div>

  
  </>
}
