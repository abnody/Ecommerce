import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function AllOrders() {
    const [isLoading, setIsLoading] = useState(true);
    const [clicked, setClicked] = useState({});
    const [orders, setOrders] = useState([]);
    const decoded = jwtDecode(localStorage.getItem("userToken"));

    const navigate = useNavigate();

    async function getUserOrders() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`);
        setOrders(data);
        setIsLoading(false);
    }

    useEffect(() => {
        getUserOrders();
    }, []);

    function toggle(index) {
        setClicked((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="abnd-container space-y-6 my-16">
                    <h2 className="text-2xl text-white font-bold font-1 mb-6">Your Orders</h2>
                    {orders.map((order, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-[#1a1a1a] rounded-xl overflow-hidden"
                        >
                            {/* Order Header */}
                            <div className='p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1a1a1a] border-b border-gray-800'>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => toggle(index)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${clicked[index]
                                            ? 'bg-[#00f8ff] text-[#1a1a1a]'
                                            : 'bg-gray-800 text-[#00f8ff]'
                                            }`}
                                    >
                                        <i className={`fa-solid ${clicked[index] ? "fa-chevron-up" : "fa-chevron-down"} fa-lg`}></i>
                                    </button>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-400">Order Date</p>
                                        <p className="text-white font-medium">{order.updatedAt.split("T", 1)}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 md:gap-8">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-400">Total Price</p>
                                        <p className="text-[#00f8ff] font-bold">{order.totalOrderPrice} EGP</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-400">Payment Method</p>
                                        <p className="text-white font-medium">{order.paymentMethodType}</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm text-gray-400">Status</p>
                                        <p className={`font-medium ${order.isDelivered
                                            ? 'text-green-500'
                                            : 'text-yellow-500'
                                            }`}>
                                            {order.isDelivered ? "Delivered" : "On Delivering"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Details */}
                            <AnimatePresence>
                                {clicked[index] && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 md:p-6">
                                            <div className="mb-4">
                                                <h3 className="text-lg font-semibold text-white mb-2">Shipping Address</h3>
                                                <p className="text-gray-400">{order.shippingAddress.details}</p>
                                                <p className="text-gray-400">Phone: {order.shippingAddress.phone}</p>
                                            </div>

                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm text-left">
                                                    <thead className="text-xs text-gray-400 uppercase">
                                                        <tr>
                                                            <th scope="col" className="px-4 py-3">Product</th>
                                                            <th scope="col" className="px-4 py-3">Quantity</th>
                                                            <th scope="col" className="px-4 py-3">Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.cartItems.map((item, idx) => (
                                                            <motion.tr
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.1 }}
                                                                onClick={() => navigate(`/productdetails/${item.product._id}`)}
                                                                className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors"
                                                            >
                                                                <td className="px-4 py-4">
                                                                    <div className="flex items-center gap-4">
                                                                        <img
                                                                            src={item.product.imageCover}
                                                                            className="w-16 h-16 object-cover rounded-lg"
                                                                            alt={item.product.title}
                                                                        />
                                                                        <span className="text-white font-medium">{item.product.title}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-4">
                                                                    <div className="flex items-center justify-center">
                                                                        <span className="bg-gray-700 text-white px-3 py-1 rounded-lg">
                                                                            {item.count}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-4 text-[#00f8ff] font-medium">
                                                                    {item.price} EGP
                                                                </td>
                                                            </motion.tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            )}
        </>
    );
}
