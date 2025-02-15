import React from 'react'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'

export default function ProfileDropdpwn() {

    function logout(){
        localStorage.removeItem('userToken')
        toast.success("logged out successfully",{
            style:{
                background: 'white'
            }
        })
    }
  return <>
    
    <div className='absolute -inset-x-16 w-36 mt-2 text-center px-2 py-3 text-gray-400 bg-secondary rounded-2xl '> 
        {localStorage.getItem('userToken')?
        <div>
            <NavLink to={'/Ecommerce/wishlist'} className='block py-1 cursor-pointer hover:text-main duration-150 ' >Wishlist</NavLink>  
            <NavLink to={'/Ecommerce/cart'} className='block py-1 cursor-pointer hover:text-main duration-150 ' >Cart</NavLink>
            <NavLink to={'/Ecommerce/allorders'} className='block py-1 cursor-pointer hover:text-main duration-150 ' >Your orders</NavLink>
            <p className='py-1 cursor-pointer hover:text-main duration-150 ' onClick={()=>logout()} >Logout</p>
        </div> :
        <div>
            <NavLink to={'/Ecommerce/login'} className='py-1 block cursor-pointer hover:text-main duration-150 ' >Login</NavLink>  
            <NavLink to={'/Ecommerce/register'} className='py-1 block cursor-pointer hover:text-main duration-150 ' >Register</NavLink>
        </div> }
    </div>
  </>
}
