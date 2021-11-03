import React, { useContext, useState, lazy, Suspense } from 'react'

import { Switch, Route } from 'react-router-dom'

import { GlobalState } from '../GlobalState'

import MessengerCustomerChat from 'react-messenger-customer-chat'
import ScrollToTopBtn from '../utils/ScrollToTopBtn'

import Header from './Blocks/Header/Header'
import Footer from './Blocks/Footer/Footer'

import Home from './Pages/Home/Home'

import ProtectedRoute from '../routes/ProtectedRoute'
import AdminRoute from '../routes/AdminRoute'

import Product from './Pages/Product/Detail'
import Cart from './Pages/Cart/Cart'
import Category from './Pages/Category/Category'

import User from './Pages/User/User'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'

import SidebarAdmin from './AdminPages/SidebarAdmin'
import Loading from '../utils/Loading'

const ForgortPassword = lazy(() =>
	import('./Pages/ForgortPassword/ForgortPassword')
)
const ChangePassword = lazy(() =>
	import('./Pages/ChangePassword/ChangePassword')
)
const ResetPassword = lazy(() => import('./Pages/ResetPassword/ResetPassword'))
const About = lazy(() => import('./Pages/About/About'))
const Orders = lazy(() => import('./AdminPages/Orders'))
const DashBoard = lazy(() => import('./AdminPages/DashBoard'))
const CategoryAdmin = lazy(() => import('./AdminPages/CategoryAdmin'))
const CategoryTrash = lazy(() => import('./AdminPages/Trash'))
const AddProduct = lazy(() => import('./AdminPages/AddProduct'))
const AllUsers = lazy(() => import('./AdminPages/AllUsers'))
const DetailOrder = lazy(() => import('./AdminPages/DetailOrder'))
const CategoryManager = lazy(() => import('./AdminPages/CategoryManager'))
const SliderManager = lazy(() => import('./AdminPages/SliderManager'))
const Privacy = lazy(() => import('./Pages/Privacy/Privacy'))
const Error = lazy(() => import('./Pages/Error/Error'))
const Assect = lazy(() => import('./AdminPages/Assect'))
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
					!admin ? 'pt-16 dark:bg-darkBgColor' : 'min-h-screen '
				} bg-white relative overflow-hidden font-noto w-full  transition-all`}
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
						<Route exact path="/about-us" component={About} />
						<Route exact path="/user/reset/:token" component={ResetPassword} />
						<Route exact path="/quen-mat-khau" component={ForgortPassword} />
						<ProtectedRoute
							exact
							path="/doi-mat-khau"
							component={ChangePassword}
						/>
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
						<AdminRoute exact path="/accesst" component={Assect} />
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
