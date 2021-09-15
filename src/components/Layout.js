import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import { GlobalState } from '../GlobalState'

import Home from '../components/Page/Home/Home'
import Product from '../components/Page/Product/Detail'
import Cart from '../components/Page/Cart/Cart'
import Category from '../components/Page/Category/Category'

import User from '../components/Page/Auth/User'
import Login from '../components/Page/Auth/Login'
import Register from '../components/Page/Auth/Register'
import Forget from '../components/Page/Auth/Forget'

import Privacy from '../components/Page/Privacy/Privacy'
import Error from '../components/Page/Error/Error'

import MessengerCustomerChat from 'react-messenger-customer-chat'

import AdminRoute from '../routes/AdminRoute'
import ProtectedRoute from '../routes/ProtectedRoute'

import CategoryAdmin from './AdminPage/CategoryAdmin'
import CategoryTrash from './AdminPage/CategoryTrash'
import Orders from '../components/AdminPage/Orders'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import DashBoard from '../components/AdminPage/DashBoard'
import SidebarAdmin from '../components/AdminPage/SidebarAdmin'
import AddProduct from '../components/AdminPage/AddProduct'

const Layout = () => {
	const { admin } = useContext(GlobalState)
	const [open, setOpen] = useState(false)
	const handleSidebar = () => setOpen(!open)
	const [isVisible, setIsVisible] = useState(false)

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}

	// Set the top cordinate to 0
	// make scrolling smooth
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility)
	}, [])

	return (
		<>
			{!admin ? (
				<>
					<Header />
					<MessengerCustomerChat
						pageId="2118692731747671"
						appId="512680796465992"
					/>
				</>
			) : (
				<SidebarAdmin option={{ handleSidebar, open }} />
			)}
			<div
				className={`flex ${
					!admin && 'pt-16'
				} bg-white min-h-screen relative overflow-hidden font-noto w-full dark:bg-gray-700 transition duration-500`}
			>
				<Switch>
					<Route exact path="/" component={admin ? DashBoard : Home} />
					<Route path="/category/:slug" component={Category} />
					<Route path="/product/:slug" component={Product} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/forget" component={Forget} />
					<Route exact path="/dieu-khoan" component={Privacy} />
					<ProtectedRoute exact path="/cart" component={Cart} />
					<ProtectedRoute exact path="/user" component={User} />
					<AdminRoute exact path="/products" component={CategoryAdmin} />
					<AdminRoute exact path="/add" component={AddProduct} />
					<AdminRoute exact path="/trash" component={CategoryTrash} />
					<AdminRoute exact path="/orders" component={Orders} />
					<Route path="*" component={Error} />
				</Switch>
				<button
					onClick={scrollToTop}
					className={` ${
						isVisible ? 'fixed' : 'hidden'
					} bottom-10 right-5 lg:right-20 bg-white p-2 rounded-lg shadow-xl border overflow-hidden`}
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 11l7-7 7 7M5 19l7-7 7 7"
						/>
					</svg>
				</button>
			</div>
			{!admin && <Footer />}
		</>
	)
}

export default Layout
