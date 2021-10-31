import React, { createContext, useEffect, useState } from 'react'

import userAPI from './api/userAPI'
import categoriesAPI from './api/categoryAPI'

export const GlobalState = createContext()

export function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key)

			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.log(error)
			return initialValue
		}
	})

	const setValue = (value) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value
			setStoredValue(valueToStore)
			window.localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			console.log(error)
		}
	}

	return [storedValue, setValue]
}

export const DataProvider = ({ children }) => {
	const [login, setLogin] = useLocalStorage('login', false)
	const [admin, setAdmin] = useLocalStorage('ongchuhocuatoi', false)
	const [cart, setCart] = useState([])
	const [token, setToken] = useState(false)
	const [categories, setCategories] = useState([])
	const [user, setUser] = useState('')

	const refreshToken = async () => {
		try {
			const result = await userAPI.refreshToken()
			setToken(result.accessToken)
			setTimeout(() => {
				refreshToken()
			}, 10 * 60 * 1000)
		} catch (error) {
			setLogin(false)
			setAdmin(false)
			setCart([])
			alert(error.message)
		}
	}

	useEffect(() => {
		if (login) {
			refreshToken()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [login])

	const getUser = async () => {
		try {
			const result = await userAPI.getUser(token)
			if (result) {
				setUser(result.user)
				setLogin(true)
				if (result.user.role === 'admin') {
					setAdmin(true)
				}

				setCart([...result.user.cart])
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		if (token) {
			getUser()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])

	useEffect(() => {
		const getCategories = async () => {
			try {
				const res = await categoriesAPI.get()
				setCategories(res.data)
			} catch (error) {
				console.log(error)
			}
		}
		getCategories()
	}, [])

	const logout = async () => {
		try {
			const checkLogout = await userAPI.logout()
			if (checkLogout.status === 'Success') {
				setLogin(false)
				setAdmin(false)
				setCart([])
			}
		} catch (error) {
			console.log(error)
		}
	}

	const addToCart = async (product) => {
		try {
			if (!login) return false
			// // Thêm vào giỏ hàng
			// const productAvailable = cart.every((item) => item._id !== product._id)
			// if (!productAvailable) {
			// 	// Cập nhật số lượng sản phẩm
			// 	cart.forEach((item) => {
			// 		if (item._id === product._id) {
			// 			item.quantity += product.quantity
			// 		}
			// 	})
			// } else {
			// 	// Thêm sản phẩm mới
			// 	cart.push(product)
			// 	setCart([...cart])
			// }

			if (cart.length === 0) {
				cart.push(product)
			} else {
				let flag
				for (let i = 0; i < cart.length; i++) {
					if (cart[i]._id === product._id && cart[i].size === product.size) {
						cart[i].quantity += product.quantity
						flag = false
						break
					} else {
						flag = true
					}
				}
				if (flag) {
					cart.push(product)
				}
			}

			setCart([...cart])
			// Add to cart
			const result = await userAPI.handleCart(cart, token)
			if (result.status === 'Success') {
				return true
			}
		} catch (error) {
			console.log(error)
		}
	}

	const removeProduct = async (product) => {
		setCart([...cart.filter((e) => e !== product)])
		await userAPI.handleCart([...cart.filter((e) => e !== product)], token)
	}

	return (
		<GlobalState.Provider
			value={{
				token,
				addToCart,
				login,
				admin,
				logout,
				cart,
				setLogin,
				categories,
				removeProduct,
				setCart,
				user,
				refreshToken,
				getUser,
			}}
		>
			{children}
		</GlobalState.Provider>
	)
}
