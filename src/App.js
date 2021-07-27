import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { DataProvider } from './GlobalState'

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

import ScrollToTop from './utils/ScrollToTop'

function App() {
	return (
		<DataProvider>
			<Router>
				<ScrollToTop>
					<Header />
					<div className="bg-white dark:bg-gray-700 min-h-screen transition duration-700">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/user" component={User} />
							<Route path="/category/:slug" component={Category} />
							<Route path="/product/:slug" component={Product} />
							<Route path="/cart" component={Cart} />
							<Route path="/login" component={Login} />
							<Route path="/register" component={Register} />
							<Route path="/forget" component={Forget} />
						</Switch>
					</div>

					<Footer />
				</ScrollToTop>
			</Router>
		</DataProvider>
	)
}

export default App
