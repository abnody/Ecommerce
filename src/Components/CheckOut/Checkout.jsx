import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function CheckOut() {
  const [Error, setError] = useState(null);
  const [cardIsLoading, setCardIsLoading] = useState(false);
  const [cashIsLoading, setCashIsLoading] = useState(false);
  let { cart } = useContext(CartContext);
  const [paymentType, setPaymentType] = useState(null);
  const navigate = useNavigate();

  async function handleCheckOut(shippingAddress) {
    if (paymentType === "card") {
      setCardIsLoading(true);
      try {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=${encodeURIComponent("https://abnody.github.io/Ecommerce/#")}`, {
          shippingAddress
        }, {
          headers: { token: localStorage.getItem('userToken') }
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

    if (paymentType === "cash") {
      setCashIsLoading(true);
      try {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`, {
          shippingAddress
        }, {
          headers: { token: localStorage.getItem('userToken') }
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
    city: Yup.string().required("This field is required"),
    details: Yup.string().required("This field is required"),
    phone: Yup.string().required("This field is required").matches(/^01[0-2,5]\d{8}$/, "Please enter a valid Egyptian Mobile number")
  })

  const formik = useFormik({
    initialValues: {
      city: '',
      details: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleCheckOut
  })

  return (
    <div className="abnd-container min-h-[calc(100vh-4rem)] py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-[#1a1a1a] rounded-xl p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Checkout</h2>
          <p className="text-gray-400 mb-8">Please enter your shipping information</p>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* City Field */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${formik.touched.city && formik.errors.city
                  ? 'border-red-500'
                  : 'border-gray-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors`}
                placeholder="Enter your city"
              />
              {formik.touched.city && formik.errors.city && (
                <div className="mt-2 flex items-center gap-2 text-red-400">
                  <i className="fas fa-exclamation-circle"></i>
                  <p className="text-sm">{formik.errors.city}</p>
                </div>
              )}
            </div>

            {/* Details Field */}
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-300 mb-2">
                Address Details
              </label>
              <input
                type="text"
                id="details"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${formik.touched.details && formik.errors.details
                  ? 'border-red-500'
                  : 'border-gray-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors`}
                placeholder="Enter your address details"
              />
              {formik.touched.details && formik.errors.details && (
                <div className="mt-2 flex items-center gap-2 text-red-400">
                  <i className="fas fa-exclamation-circle"></i>
                  <p className="text-sm">{formik.errors.details}</p>
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${formik.touched.phone && formik.errors.phone
                  ? 'border-red-500'
                  : 'border-gray-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-colors`}
                placeholder="Enter your phone number"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="mt-2 flex items-center gap-2 text-red-400">
                  <i className="fas fa-exclamation-circle"></i>
                  <p className="text-sm">{formik.errors.phone}</p>
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

            {/* Payment Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                onClick={() => setPaymentType("card")}
                disabled={cardIsLoading}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-black transition-colors ${cardIsLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-200'
                  }`}
              >
                {cardIsLoading ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-credit-card"></i>
                    Pay with Card
                  </span>
                )}
              </button>

              <button
                type="submit"
                onClick={() => setPaymentType("cash")}
                disabled={cashIsLoading}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-black transition-colors ${cashIsLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-200'
                  }`}
              >
                {cashIsLoading ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-money-bill-wave"></i>
                    Pay with Cash
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
