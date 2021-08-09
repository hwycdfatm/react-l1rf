import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { DataProvider } from './GlobalState'

// User
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Home from './components/Page/Home/Home'
import Product from './components/Page/Product/Detail'
import Cart from './components/Page/Cart/Cart'
import Category from './components/Page/Category/Category'

import User from './components/Page/Auth/User'
import Login from './components/Page/Auth/Login'
import Register from './components/Page/Auth/Register'
import Forget from './components/Page/Auth/Forget'

import Privacy from './components/Page/Privacy/Privacy'

import ScrollToTop from './utils/ScrollToTop'

// Admin
import AdminRoute from './routes/AdminRoute' //Route
import Add from './components/AdminPage/Add'
import ProtectedRoute from './routes/ProtectedRoute'
import Edit from './components/AdminPage/Edit'
import Error from './components/Page/Error/Error'

function App() {
	return (
		<DataProvider>
			<Router>
				<ScrollToTop>
					<Header />
					<div className="bg-white dark:bg-gray-700 min-h-screen transition duration-700">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/category/:slug" component={Category} />
							<Route path="/product/:slug" component={Product} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							<Route path="/forget" component={Forget} />
							<Route path="/dieu-khoan" component={Privacy} />
							<ProtectedRoute path="/cart" component={Cart} />
							<ProtectedRoute path="/user" component={User} />
							<AdminRoute exact path="/add" component={Add} />
							<AdminRoute exact path="/edit/:id" component={Edit} />
							<Route path="*" component={Error} />
						</Switch>
					</div>

					<Footer />
				</ScrollToTop>
			</Router>
		</DataProvider>
	)
}

export default App
