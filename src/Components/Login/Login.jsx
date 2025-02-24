import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
export default function Login() {

  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate()

  async function login(){
    setIsLoading(true);
    try {
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',formik.values);
      setIsLoading(false);
      localStorage.setItem('userToken' , data.token);
      navigate('/')
    } 
    catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  }


    const validationSchema = Yup.object({
      email : Yup.string().required("email is required").email("Invalid email"),
      password : Yup.string().required("This field is required"),
    })

  const formik = useFormik({
    initialValues:{
      email:'',
      password: '',
    },
    validationSchema,
    onSubmit: login
  })

  return <>
  
  <form className="max-w-sm mx-auto py-7" onSubmit={formik.handleSubmit}>

    <div className="mb-5">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
      <input type="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
      className="shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
    </div>
    {formik.touched.email&&formik.errors.email?
    <div className="p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.email}</div>
    :null}

    <div className="mb-5">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
      <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
      className="shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
    </div>
    {formik.touched.password&&formik.errors.password?
    <div className="p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.password}</div>
    :null}

    <div className='flex items-center'>
      {!isLoading &&<button type="submit" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login</button>}
      {isLoading &&<button type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "><i className='fas fa-spinner fa-spin fa-lg'></i></button>}
      {Error && <p className='text-red-600 ps-3'> {Error} </p>}
    </div>
    <div className='pt-2'>
      <NavLink to='/register' className='underline text-gray-400   hover:text-lg duration-150' > I don't have account</NavLink>
    </div>
  </form>
  
  </>
}
