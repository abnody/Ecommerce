import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate()

  async function login() {
    setIsLoading(true);
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formik.values);
      setIsLoading(false);
      localStorage.setItem('userToken', data.token);
      navigate('/')
    }
    catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("Invalid email"),
    password: Yup.string().required("This field is required"),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: login
  })

  return (
    <div className="abnd-container min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
          <p className="text-gray-400 text-center mb-8">Sign in to your account </p>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : 'border-gray-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-[#00f8ff] focus:border-transparent transition-colors`}
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-2 flex items-center gap-2 text-red-400">
                  <i className="fas fa-exclamation-circle"></i>
                  <p className="text-sm">{formik.errors.email}</p>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${formik.touched.password && formik.errors.password
                    ? 'border-red-500'
                    : 'border-gray-700'
                    } text-white focus:outline-none focus:ring-2 focus:ring-[#00f8ff] focus:border-transparent transition-colors pr-12 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00f8ff] transition-colors"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="mt-2 flex items-center gap-2 text-red-400">
                  <i className="fas fa-exclamation-circle"></i>
                  <p className="text-sm">{formik.errors.password}</p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {Error && (
              <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-center gap-2">
                <i className="fas fa-exclamation-circle text-red-500"></i>
                <p className="text-sm text-red-500">{Error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${isLoading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-[#00f8ff] hover:bg-[#00d4d9]'
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Signing in...
                </span>
              ) : <p className='text-black'>Sign In</p>
              }
            </button>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <NavLink
                  to="/register"
                  className="text-[#00f8ff] hover:text-[#00d4d9] transition-colors"
                >
                  Register now
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
