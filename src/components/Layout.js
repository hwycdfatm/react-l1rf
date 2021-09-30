import React, { useContext, useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import { GlobalState } from '../GlobalState'
import Home from '../components/Pages/Home/Home'
import Product from '../components/Pages/Product/Detail'
import Cart from '../components/Pages/Cart/Cart'
import Category from '../components/Pages/Category/Category'

import User from '../components/Pages/User/User'
import Login from '../components/Pages/Login/Login'
import Register from '../components/Pages/Register/Register'
import Forget from '../components/Pages/Forget/Forget'

import Privacy from '../components/Pages/Privacy/Privacy'
import Error from '../components/Pages/Error/Error'

import MessengerCustomerChat from 'react-messenger-customer-chat'

import AdminRoute from '../routes/AdminRoute'
import ProtectedRoute from '../routes/ProtectedRoute'

import CategoryAdmin from './AdminPages/CategoryAdmin'
import CategoryTrash from './AdminPages/CategoryTrash'
import Orders from '../components/AdminPages/Orders'

import Header from '../components/Blocks/Header/Header'
import Footer from '../components/Blocks/Footer/Footer'

import DashBoard from '../components/AdminPages/DashBoard'
import SidebarAdmin from '../components/AdminPages/SidebarAdmin'
import AddProduct from '../components/AdminPages/AddProduct'
import AllUsers from '../components/AdminPages/AllUsers'
import DetailOrder from './AdminPages/DetailOrder'

const Layout = () => {
	const { admin } = useContext(GlobalState)
	const [open, setOpen] = useState(false)
	const handleSidebar = () => setOpen(!open)
	const [visible, setVisible] = useState(false)

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
	const functionShowToggleButton = () => {
		if (window.pagesYOffset > 300) {
			setVisible(true)
		} else {
			setVisible(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', functionShowToggleButton)
		return () => {
			window.removeEventListener('scroll', functionShowToggleButton)
		}
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
				<SidebarAdmin option={{ handleSidebar, open, setOpen }} />
			)}
			<div
				className={`${
					!admin ? 'pt-16' : 'min-h-screen'
				} bg-white relative overflow-hidden font-noto w-full dark:bg-gray-700 transition duration-500`}
			>
				<Switch>
					<Route exact path="/" component={admin ? DashBoard : Home} />
					<Route path="/category/:slug" component={Category} />
					<Route path="/order_detail" component={DetailOrder} />
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
					<AdminRoute exact path="/allusers" component={AllUsers} />
					<Route path="*" component={Error} />
				</Switch>
			</div>

			{visible && (
				<div
					onClick={() => scrollToTop()}
					className="z-30 fixed h-8 w-8 bottom-24 shadow-lg font-maven rounded-lg p-1 flex items-center justify-center cursor-pointer right-9 bg-black text-white"
				>
					Top
				</div>
			)}

			{!admin && <Footer />}
		</>
	)
}

export default Layout
