import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';


export default function CheckOut() {

  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let {cart} = useContext(CartContext)

  async function handleCheckOut(shippingAddress){
    setIsLoading(true);
    try {
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,{
        shippingAddress
      },{
        headers:{token:localStorage.getItem('userToken')}
      });
      setIsLoading(false);
      toast.success(data.status);
      location.href = data.session.url;
      
    } 
    catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  }


    const validationSchema = Yup.object({
      city : Yup.string().required("This field is required"),
      details : Yup.string().required("This field is required"),
      phone : Yup.string().required("This field is required").matches(/^01[0-2,5]\d{8}$/ , "Please enter a valid Egyption Mobile number")
    })

  const formik = useFormik({
    initialValues:{
      city:'',
      details: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleCheckOut
  })

  return <>
  
  <form className="max-w-sm mx-auto py-7" onSubmit={formik.handleSubmit}>

    <div className="mb-5">
      <label htmlFor="city" className="block mb-2 text-sm font-medium text-white">Your city</label>
      <input type="text" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}
      className="shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
    </div>
    {formik.touched.city&&formik.errors.city?
    <div className="p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.city}</div>
    :null}

    <div className="mb-5">
      <label htmlFor="details" className="block mb-2 text-sm font-medium text-white">Your Address in details</label>
      <input type="text" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}
      className="shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
    </div>
    {formik.touched.details&&formik.errors.details?
    <div className="p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.details}</div>
    :null}

    <div className="mb-5">
      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white">Your phone</label>
      <input type="text" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
      className="shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
    </div>
    {formik.touched.phone&&formik.errors.phone?
    <div className="p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.phone}</div>
    :null}

    <div className='flex items-center'>
      {!isLoading &&<button type="submit" className="mx-3 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Pay by Visa Card</button>}
      {isLoading &&<button type="button" className="mx-3 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "><i className='fas fa-spinner fa-spin fa-lg'></i></button>}
    </div>
    <div className='flex items-center'>
      {!isLoading &&<button type="submit" className="mx-3 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Cash </button>}
      {isLoading &&<button type="button" className="mx-3 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "><i className='fas fa-spinner fa-spin fa-lg'></i></button>}
    </div>
  </form>
  
  </>
}
