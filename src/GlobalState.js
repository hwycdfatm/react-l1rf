import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
	const [login, setLogin] = useState(false)
	const [admin, setAdmin] = useState(false)
	const [cart, setCart] = useState([])
	const [token, setToken] = useState(false)

	useEffect(() => {
		const firstLogin = localStorage.getItem('first-login')
		if (firstLogin) {
			const refreshToken = async () => {
				const token = await axios.get('/user/refresh_token')
				setToken(token.data.accessToken)
				setTimeout(() => {
					refreshToken()
				}, 10 * 60 * 1000)
			}
			refreshToken()
		}
		if (token) {
			const getUser = async () => {
				try {
					const result = await axios.get('/user/info', {
						headers: { Authorization: token },
					})
					localStorage.setItem('login', true)
					setLogin(true)
					if (result.data.user.role === 'admin') {
						setAdmin(true)
						localStorage.setItem('admin', true)
					} else {
						setAdmin(false)
					}
					setCart(result.data.user.cart)
				} catch (error) {
					console.log(error)
				}
			}
			getUser()
		}
	}, [token])

	const addToCart = async (product) => {
		if (!login) return alert('Vui lòng đăng nhập')
		const check = cart.every((item) => item._id !== product._id)
		if (!check) {
			cart.forEach((item) => {
				if (item._id === product._id) {
					item.quantity += product.quantity
				}
			})
			await axios.patch(
				'/user/addcart',
				{ cart },
				{
					headers: { Authorization: token },
				}
			)
		} else {
			setCart([...cart, { ...product, quantity: product.quantity }])
			await axios.patch(
				'/user/addcart',
				{ cart: [...cart, { ...product, quantity: product.quantity }] },
				{
					headers: { Authorization: token },
				}
			)
		}
	}
	const state = {
		token: [token, setToken],
		isLogin: [login, setLogin],
		isAdmin: [admin, setAdmin],
		cart: [cart, setCart],
		addToCart: addToCart,
	}
	return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>
}
