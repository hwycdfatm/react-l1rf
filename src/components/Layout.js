import React, { useContext, useState, lazy, Suspense } from 'react'

import { Switch, Route } from 'react-router-dom'

import { GlobalState } from '../GlobalState'

import MessengerCustomerChat from 'react-messenger-customer-chat'
import ScrollToTopBtn from '../utils/ScrollToTopBtn'

import Header from '../components/Blocks/Header/Header'
import Footer from '../components/Blocks/Footer/Footer'

import Home from '../components/Pages/Home/Home'
import ForgortPassword from './Pages/ForgortPassword/ForgortPassword'
import ChangePassword from './Pages/ChangePassword/ChangePassword'
import ProtectedRoute from '../routes/ProtectedRoute'
import AdminRoute from '../routes/AdminRoute'

import Product from '../components/Pages/Product/Detail'
import Cart from '../components/Pages/Cart/Cart'
import Category from '../components/Pages/Category/Category'
import Orders from '../components/AdminPages/Orders'

import User from '../components/Pages/User/User'
import Login from '../components/Pages/Login/Login'
import Register from '../components/Pages/Register/Register'

import Privacy from '../components/Pages/Privacy/Privacy'
import Error from '../components/Pages/Error/Error'
import SidebarAdmin from '../components/AdminPages/SidebarAdmin'
import Loading from '../utils/Loading'

const DashBoard = lazy(() => import('../components/AdminPages/DashBoard'))
const CategoryAdmin = lazy(() => import('./AdminPages/CategoryAdmin'))
const CategoryTrash = lazy(() => import('./AdminPages/Trash'))
const AddProduct = lazy(() => import('../components/AdminPages/AddProduct'))
const AllUsers = lazy(() => import('../components/AdminPages/AllUsers'))
const DetailOrder = lazy(() => import('./AdminPages/DetailOrder'))
const CategoryManager = lazy(() => import('./AdminPages/CategoryManager'))
const SliderManager = lazy(() => import('./AdminPages/SliderManager'))

const Layout = () => {
	const { admin } = useContext(GlobalState)
	const [open, setOpen] = useState(false)
	function handleSidebar() {
		setOpen(!open)
	}

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
				} bg-white relative overflow-hidden font-noto w-full dark:bg-darkBgColor transition-all`}
			>
				<Suspense fallback={<Loading />}>
					<Switch>
						<Route exact path="/" component={admin ? DashBoard : Home} />
						<Route path="/category/:slug" component={Category} />
						<Route path="/order_detail" component={DetailOrder} />
						<Route path="/product/:slug" component={Product} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/dieu-khoan" component={Privacy} />
						<Route exact path="/quen-mat-khau" component={ForgortPassword} />
						<Route exact path="/doi-mat-khau" component={ChangePassword} />
						<ProtectedRoute exact path="/cart" component={Cart} />
						<ProtectedRoute exact path="/user" component={User} />
						<AdminRoute exact path="/products" component={CategoryAdmin} />
						<AdminRoute
							exact
							path="/category-manager"
							component={CategoryManager}
						/>
						<AdminRoute exact path="/add" component={AddProduct} />
						<AdminRoute exact path="/trash/:option" component={CategoryTrash} />
						<AdminRoute exact path="/orders" component={Orders} />
						<AdminRoute exact path="/allusers" component={AllUsers} />
						<AdminRoute exact path="/slideshow" component={SliderManager} />
						<Route path="*" component={Error} />
					</Switch>
				</Suspense>
			</div>
			<ScrollToTopBtn />
			{!admin && <Footer />}
		</>
	)
}

export default Layout
