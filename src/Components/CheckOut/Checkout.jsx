import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';


export default function CheckOut() {

  const [Error, setError] = useState(null);
  const [cardIsLoading, setCardIsLoading] = useState(false);
  const [cashIsLoading, setCashIsLoading] = useState(false);
  let {cart} = useContext(CartContext);
  const [paymentType, setPaymentType] = useState(null);
  const navigate = useNavigate()

  async function handleCheckOut(shippingAddress){
    
    if(paymentType==="card"){
      setCardIsLoading(true);
      try {
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=${encodeURIComponent("https://abnody.github.io/Ecommerce/#")}`,{
          shippingAddress
        },{
          headers:{token:localStorage.getItem('userToken')}
        });
        
        setCardIsLoading(false);
        toast.success(data.status);
        location.href = data.session.url;
        
      } 
      catch (err) {
        setError(err.response.data.message);
        setCardIsLoading(false);
      }
    }

    if(paymentType==="cash"){
      setCashIsLoading(true);
      try {
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,{
          shippingAddress
        },{
          headers:{token:localStorage.getItem('userToken')}
        });
        setCashIsLoading(false);
        toast.success(data.status);
        navigate('/allorders')
        
      } 
      catch (err) {
        setError(err.response.data.message);
        setCashIsLoading(false);
      }
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
  <div className='w-full'>
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

    <div className='flex items-center justify-between'>
      {!cardIsLoading&&<button type="submit" onClick={()=>setPaymentType("card")} className=" text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Pay by Visa Card</button>}
      {cardIsLoading&&<button type="button" className=" text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "><i className='fas fa-spinner fa-spin fa-lg'></i></button>}
      {!cashIsLoading&&<button type="submit" onClick={()=>setPaymentType("cash")} className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5  text-center ">Cash </button>}
      {cashIsLoading&&<button type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5  text-center "><i className='fas fa-spinner fa-spin fa-lg'></i></button>}

    </div>

  </form>
  </div>
  </>
}
