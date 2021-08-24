import React, { useContext, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { GlobalState } from '../GlobalState'
// User
import Header from './Header/Header'
import Footer from './Footer/Footer'

import Home from './Page/Home/Home'
import Product from './Page/Product/Detail'
import Cart from './Page/Cart/Cart'
import Category from './Page/Category/Category'

import User from './Page/Auth/User'
import Login from './Page/Auth/Login'
import Register from './Page/Auth/Register'
import Forget from './Page/Auth/Forget'

import Privacy from './Page/Privacy/Privacy'
import Error from './Page/Error/Error'

import MessengerCustomerChat from 'react-messenger-customer-chat'

import AdminRoute from '../routes/AdminRoute'
import ProtectedRoute from '../routes/ProtectedRoute'

import DashBoard from './AdminPage/DashBoard'
import CategoryAdmin from './AdminPage/CategoryAdmin'
import SidebarAdmin from './AdminPage/SidebarAdmin'
import Orders from './AdminPage/Orders'

import Form from '../components/AdminPage/Form'
const Layout = () => {
	const state = useContext(GlobalState)
	const [admin] = state.isAdmin
	const isAdmin = localStorage.getItem('admin')
	const [open, setOpen] = useState(true)
	const [toggleForm, setToggleForm] = useState(false)
	console.log(toggleForm)
	return (
		<div>
			{!admin && (
				<>
					<Header />
					<MessengerCustomerChat
						pageId="2118692731747671"
						appId="512680796465992"
					/>
				</>
			)}
			<div className="flex w-full bg-white dark:bg-gray-700 min-h-screen transition duration-700 relative overflow-hidden">
				{admin && (
					<>
						<SidebarAdmin
							open={open}
							setOpen={setOpen}
							toggleForm={toggleForm}
							setToggleForm={setToggleForm}
						/>
						<Form
							open={open}
							setOpen={setOpen}
							toggleForm={toggleForm}
							setToggleForm={setToggleForm}
						/>
					</>
				)}

				<div className="w-full relative">
					<Switch>
						<Route
							exact
							path="/"
							component={isAdmin || admin ? DashBoard : Home}
						/>
						<Route path="/category/:slug" component={Category} />
						<Route path="/product/:slug" component={Product} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
						<Route path="/forget" component={Forget} />
						<Route path="/dieu-khoan" component={Privacy} />
						<ProtectedRoute path="/cart" component={Cart} />
						<ProtectedRoute path="/user" component={User} />
						<AdminRoute path="/products" component={CategoryAdmin} />
						<AdminRoute path="/orders" component={Orders} />
						<Route path="*" component={Error} />
					</Switch>
				</div>
			</div>
			{!admin && <Footer />}
		</div>
	)
}

export default Layout
