import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function UpdatePassword() {
  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate()

  async function updatePassword() {
    setIsLoading(true);
    try {
      let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', formik.values, {
        headers: { token: localStorage.getItem('userToken') }
      });
      setIsLoading(false);
      navigate('/')
    }
    catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    password: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        "Password must include uppercase, lowercase, number, and special character"),
    rePassword: Yup.string()
      .required("Please confirm your new password")
      .oneOf([Yup.ref('password'), null], "Passwords must match"),
  })

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      rePassword: ''
    },
    validationSchema,
    onSubmit: updatePassword
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
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Update Password</h2>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${formik.touched.currentPassword && formik.errors.currentPassword
                  ? 'border-red-500'
                  : 'border-gray-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-[#00f8ff] focus:border-transparent transition-colors`}
                placeholder="Enter your current password"
              />
              {formik.touched.currentPassword && formik.errors.currentPassword && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.currentPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : 'border-gray-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-[#00f8ff] focus:border-transparent transition-colors`}
                placeholder="Enter your new password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label htmlFor="rePassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${formik.touched.rePassword && formik.errors.rePassword
                  ? 'border-red-500'
                  : 'border-gray-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-[#00f8ff] focus:border-transparent transition-colors`}
                placeholder="Confirm your new password"
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <p className="mt-2 text-sm text-red-500">{formik.errors.rePassword}</p>
              )}
            </div>

            {/* Error Message */}
            {Error && (
              <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
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
                  Updating...
                </span>
              ) : <p className='text-black'>Update Password</p>
                
              }
            </button>

            {/* Back Link */}
            <div className="text-center">
              <NavLink
                to="/"
                className="text-gray-400 hover:text-[#00f8ff] transition-colors text-sm"
              >
                Back to Home
              </NavLink>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
