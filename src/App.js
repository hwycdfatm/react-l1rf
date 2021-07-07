import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { DataProvider } from './GlobalState'

import Header from './components/Header/Header'
import About from './components/MainPage/About'
import Home from './components/MainPage/Home'
import User from './components/MainPage/User'
import Product from './components/MainPage/Product'
import Cart from './components/MainPage/Cart'
import Login from './components/MainPage/Auth/Login'
import Footer from './components/Footer/Footer'

function App() {
	return (
		<DataProvider>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/user" component={User} />
					<Route path="/about" component={About} />
					<Route path="/product" component={Product} />
					<Route path="/cart" component={Cart} />
					<Route path="/login" component={Login} />
				</Switch>
				<Footer />
			</Router>
		</DataProvider>
	)
}

export default App
