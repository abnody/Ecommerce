import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
export default function Register() {

  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate()

  async function submit(){
    setIsLoading(true);
    try {
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formik.values);
      setIsLoading(false);
      localStorage.setItem('userToken' , data.token);
      navigate('/');
    } 
    catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    name : Yup.string().required("name is required").min(3, "Please enter a valid name"),
    email : Yup.string().required("email is required").email("Please enter a valid email"),
    password : Yup.string().required("This field is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,"Invalid password! Must include at least one uppercase letter, one lowercase letter, one number, and one special character."),
    rePassword : Yup.string().required("This field is required").oneOf([Yup.ref('password'),null],"Must matches Password"),
    phone : Yup.string().required("This field is required").matches(/^01[0-2,5]\d{8}$/ , "Please enter a valid Egyption Mobile number")
  })
  
  const formik = useFormik({
    initialValues:{
      name: '',
      email:'',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: submit
  })

  return <>


  <form className="max-w-sm mx-auto py-7" onSubmit={formik.handleSubmit}>
    <div className="mb-5">
      <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Your name</label>
      <input type="text" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
      className="shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
    </div>
    {formik.touched.name&&formik.errors.name?
    <div className="p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.name}</div>
    :null}

    <div className="mb-5">
      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white">Your phone</label>
      <input type="tel" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
      className="shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
    </div>
    {formik.touched.phone&&formik.errors.phone?
    <div className="p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.phone}</div>
    :null}

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

    <div className="mb-5">
      <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-white">Repeat password</label>
      <input type="password" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
      className="shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
    </div>
    {formik.touched.rePassword&&formik.errors.rePassword?
    <div className="p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.rePassword}</div>
    :null}
    
    <div className="flex items-start mb-5">
      <div className="flex items-center h-5">
        <input id="terms" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
      </div>
      <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className=" text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
    </div>
    <div className='flex  items-center'>
      {!isLoading &&<button type="submit" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Register new account</button>}
      {isLoading &&<button type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "><i className='fas fa-spinner fa-spin fa-lg'></i></button>}
      {Error && <p className='text-red-600 ps-3'> {Error} </p>}
    </div>
    
    <div className='pt-2'>
      <NavLink to='/login' className='underline text-gray-400 pt-6  hover:text-lg duration-150' > Already have account</NavLink>
    </div>
  </form>


  </>
}
