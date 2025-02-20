import React from 'react'
export default function Footer() {
  
  return <>

    <div className='text-center bg-secondary py-3'>
      <h2 className='text-main py-2'>Follow Us On : </h2>
      <ul className='flex justify-center space-x-5 text-white'>
        
        <li>
          <a href="#" className='a'><i className='fab fa-facebook-f fa-lg '> </i> </a>
        </li>
        
        <li>
          <a href="#" className='a'><i className='fab fa-x-twitter fa-lg '></i></a>
        </li>

        <li>
          <a href="#" className='a'><i className='fab fa-instagram fa-lg '></i></a>
        </li>

        <li>
          <a href="#" className='a'><i className='fa-brands fa-linkedin-in fa-lg '></i></a>
        </li>
      </ul>
      <p className='text-gray-500 py-2'>powered by <a href="https://www.facebook.com/ahmedalabnody49" target='_blank' className='text-main'>Ahmed_Alabnody</a></p>
    </div>

  
  </>
}
