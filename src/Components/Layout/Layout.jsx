import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {

	return <>
		<div className='flex flex-col min-h-screen relative'>
			<Navbar />

			<main className="container mt-4 pt-16 mx-auto flex-grow ">
				<Outlet></Outlet>
			</main>

			<Footer />
		</div>

	</>
}
