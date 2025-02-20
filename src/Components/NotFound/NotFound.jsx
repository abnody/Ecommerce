import React from 'react'
import error from '../../assets/images/404.gif'
export default function NotFound() {
  
  return <>
    <div className=' py-5'>
      <img src={error} alt="" className=' mx-auto w-96' />
    </div>
  </>
}
