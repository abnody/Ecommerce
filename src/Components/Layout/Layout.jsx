import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Layout() {
	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShowScrollTop(true);
			} else {
				setShowScrollTop(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	return <>
		<div className='flex flex-col min-h-screen relative'>
			<Navbar />

			<main className="w-full  pt-16 mx-auto flex-grow ">
				<Outlet></Outlet>
			</main>

			<AnimatePresence>
				{showScrollTop && (
					<motion.button
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						transition={{ duration: 0.2 }}
						onClick={scrollToTop}
						className="fixed bottom-4 right-1 md:right-8 w-12 h-12 bg-gray-800/80 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 hover:text-gray-300 transition-colors z-50"
						aria-label="Scroll to top"
					>
						<i className="fas fa-arrow-up text-xl"></i>
					</motion.button>
				)}
			</AnimatePresence>

			<Footer />
		</div>

	</>
}
