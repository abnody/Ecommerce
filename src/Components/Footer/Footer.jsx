import React from 'react'
export default function Footer() {
  
  return <>

    <div className='text-center bg-gray-900 py-3 '>
      <div className="flex justify-center items-center gap-x-3">
          <h2 className='text-white py-2 font-bold font-1'>Follow Us On : </h2>
          <ul className='flex justify-center space-x-5 text-white'>
            <li>
              <a target='_blank' href="https://www.facebook.com/ahmedalabnody49" className='a'><i className='fab fa-facebook-f fa-lg hover:text-blue-600 transition-all duration-300'> </i> </a>
            </li>
            <li>
              <a target='_blank' href="https://wa.me/+201127769663" className='a'><i className="fa-brands fa-whatsapp fa-lg hover:text-green-500 transition-all duration-300"></i></a>
            </li>
            <li>
              <a target='_blank' href="https://www.instagram.com/ahmed__alabnody/" className='a'><i className='fab fa-instagram fa-lg hover:text-pink-600 transition-all duration-300'></i></a>
            </li>
            <li>
              <a target='_blank' href="https://www.linkedin.com/in/ahmed-alabnody-434653216/" className='a'><i className='fa-brands fa-linkedin-in fa-lg hover:text-blue-600 transition-all duration-300'></i></a>
            </li>
          </ul>
      </div>
      <p className='text-gray-500 py-2'>powered by <a href="https://www.facebook.com/ahmedalabnody49" target='_blank' className='text-[#00f8ff] font-4'>Ahmed_Alabnody</a></p>
    </div>

  
  </>
}
