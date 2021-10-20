import React, { createContext, useEffect, useState } from 'react'

import userAPI from './api/userAPI'
import categoriesAPI from './api/categoryAPI'

export const GlobalState = createContext()

export function useLocalStorage(key, initialValue) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key)
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			// If error also return initialValue
			console.log(error)
			return initialValue
		}
	})

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value
			// Save state
			setStoredValue(valueToStore)
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			// A more advanced implementation would handle the error case
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
			const check = cart.every((item) => item._id !== product._id)
			if (!check) {
				// Cập nhật số lượng sản phẩm
				cart.forEach((item) => {
					if (item._id === product._id) {
						item.quantity += product.quantity
					}
				})
				setCart([...cart])
			} else {
				// Thêm sản phẩm mới
				cart.push(product)
				setCart([...cart])
			}
			// Add to cart
			const result = await userAPI.handleCart(cart, token)
			if (result.status === 'Success') {
				return true
			}
		} catch (error) {
			console.log(error)
		}
	}

	const removeProduct = async (id) => {
		setCart([...cart.filter((e) => e._id !== id)])
		await userAPI.handleCart([...cart.filter((e) => e._id !== id)], token)
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
