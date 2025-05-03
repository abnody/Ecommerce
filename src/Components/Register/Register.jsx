import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Register() {
  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let navigate = useNavigate()

  async function submit() {
    setIsLoading(true);
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formik.values);
      setIsLoading(false);
      localStorage.setItem('userToken', data.token);
      navigate('/');
    }
    catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required").min(3, "Please enter a valid name"),
    email: Yup.string().required("email is required").email("Please enter a valid email"),
    password: Yup.string().required("This field is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "Invalid password! Must include at least one uppercase letter, one lowercase letter, one number, and one special character."),
    rePassword: Yup.string().required("This field is required").oneOf([Yup.ref('password'), null], "Must matches Password"),
    phone: Yup.string().required("This field is required").matches(/^01[0-2,5]\d{8}$/, "Please enter a valid Egyptian Mobile number")
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: submit
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
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>
          <p className="text-gray-400 text-center mb-8">Join us to start shopping</p>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${formik.touched.name && formik.errors.name
                  ? 'border-red-500'
                  : 'border-gray-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-[#00f8ff] focus:border-transparent transition-colors`}
                placeholder="Enter your full name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="mt-2 flex items-center gap-2 text-red-400">
                  <i className="fas fa-exclamation-circle"></i>
                  <p className="text-sm">{formik.errors.name}</p>
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${formik.touched.phone && formik.errors.phone
                  ? 'border-red-500'
                  : 'border-gray-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-[#00f8ff] focus:border-transparent transition-colors`}
                placeholder="Enter your phone number"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="mt-2 flex items-center gap-2 text-red-400">
                  <i className="fas fa-exclamation-circle"></i>
                  <p className="text-sm">{formik.errors.phone}</p>
                </div>
              )}
            </div>

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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="rePassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${formik.touched.rePassword && formik.errors.rePassword
                    ? 'border-red-500'
                    : 'border-gray-700'
                    } text-white focus:outline-none focus:ring-2 focus:ring-[#00f8ff] focus:border-transparent transition-colors pr-12 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00f8ff] transition-colors"
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {formik.touched.rePassword && formik.errors.rePassword && (
                <div className="mt-2 flex items-center gap-2 text-red-400">
                  <i className="fas fa-exclamation-circle"></i>
                  <p className="text-sm">{formik.errors.rePassword}</p>
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
                  Creating account...
                </span>
              ) : <p className='text-black'>Create Account</p>
              }
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <NavLink
                  to="/login"
                  className="text-[#00f8ff] hover:text-[#00d4d9] transition-colors"
                >
                  Sign in
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
