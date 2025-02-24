import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';

export default function UpdatePassword() {

  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate()

  async function updatePassword(){
    setIsLoading(true);
    try {
      let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',formik.values,{ headers:{token : localStorage.getItem('userToken')}});
      setIsLoading(false);
      navigate('/')
    } 
    catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  }


    const validationSchema = Yup.object({
      currentPassword : Yup.string().required("current password is required"),
      password : Yup.string().required("This field is required"),
      rePassword : Yup.string().required("This field is required").oneOf([Yup.ref('password'),null],"Must matches Password"),
    })

  const formik = useFormik({
    initialValues:{
      currentPassword:'',
      password: '',
      rePassword:''
    },
    validationSchema,
    onSubmit: updatePassword
  })

  return <>
  
  <form className="max-w-sm mx-auto py-7" onSubmit={formik.handleSubmit}>

    <div className="mb-5">
      <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-white">current password</label>
      <input type="password" id="currentPassword" value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
      className="shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
    </div>
    {formik.touched.currentPassword&&formik.errors.currentPassword?
    <div className="p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.currentPassword}</div>
    :null}

    <div className="mb-5">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">new password</label>
      <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
      className="shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
    </div>
    {formik.touched.password&&formik.errors.password?
    <div className="p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.password}</div>
    :null}

    <div className="mb-5">
      <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-white">Repassword</label>
      <input type="password" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
      className="shadow-xs bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
    </div>
    {formik.touched.rePassword&&formik.errors.rePassword?
    <div className="p-4 mb-5 -mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.rePassword}</div>
    :null}

    <div className='flex items-center'>
      {!isLoading &&<button type="submit" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">updatePassword</button>}
      {isLoading &&<button type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "><i className='fas fa-spinner fa-spin fa-lg'></i></button>}
      {Error && <p className='text-red-600 ps-3'> {Error} </p>}
    </div>
  </form>
  
  </>
}
