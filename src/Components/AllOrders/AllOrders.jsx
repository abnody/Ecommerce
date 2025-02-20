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
                <>
                    {orders.map((order, index) => (
                        <div key={index} className="relative overflow-x-auto rounded-2xl my-7 scrollbar-hide">
                            {/* Order Summary */}
                            <div className='flex flex-wrap lg:justify-between px-5 py-6 items-center bg-[#1a1a1a] text-white mb-2'>
                                <i
                                    onClick={() => toggle(index)}
                                    className={`fa-solid ${clicked[index] ? "fa-chevron-up" : "fa-chevron-down"} fa-xl mx-2 px-3 py-5 rounded-lg cursor-pointer bg-gray-400 text-[#1a1a1a]`}
                                ></i>
                                <p className='px-2'>Details: <span className='text-gray-400'>{order.shippingAddress.details} / {order.shippingAddress.phone}</span></p>
                                <p className='px-2'>Date: <span className='text-gray-400'>{order.updatedAt.split("T", 1)}</span></p>
                                <p className='px-2'>Total Price: <span className='text-gray-400'>{order.totalOrderPrice}</span></p>
                                <p className='px-2'>{order.paymentMethodType}</p>
                                <p className='px-2'>{order.isDelivered ? "Delivered" : "On Delivering"}</p>
                            </div>

                            {/* Order Details Table with Height Animation */}
                            <AnimatePresence>
                                {clicked[index] && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden "
                                    >
                                        <table className="w-full text-sm text-left rounded-2xl rtl:text-right text-[#1a1a1a]">
                                            <thead className="text-xs text-white uppercase bg-[#1a1a1a]">
                                                <tr className='text-gray-700'>
                                                    <th scope="col" className="px-16 py-3">
                                                        <span className="sr-only">Image</span>
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">Product</th>
                                                    <th scope="col" className="px-6 py-3">Qty</th>
                                                    <th scope="col" className="px-6 py-3">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.cartItems.map((item, idx) => (
                                                    <tr
                                                        key={idx}
                                                        onClick={() => navigate(`/productdetails/${item.product._id}`)}
                                                        className="bg-[#b3b3b3] border-b cursor-pointer border-[#1a1a1a] hover:bg-[#8c8c8c] duration-300"
                                                    >
                                                        <td className="p-4">
                                                            <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={item.product.title} />
                                                        </td>
                                                        <td className="px-6 py-4 font-semibold text-gray-900">{item.product.title}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center">
                                                                <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg px-5">{item.count}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 font-semibold text-gray-900">{item.price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
