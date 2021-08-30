import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const GlobalState = createContext()

function useLocalStorage(key, initialValue) {
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
	useEffect(() => {
		if (login) {
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
					setUser(result.data.user)
					setLogin(true)
					if (result.data.user.role === 'admin') {
						setAdmin(true)
					}
					setCart(result.data.user.cart)
				} catch (error) {
					console.log(error)
				}
			}
			getUser()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])

	useEffect(() => {
		try {
			const getCategories = async () => {
				const res = await axios.get('/api/category')
				setCategories(res.data.data)
			}
			getCategories()
		} catch (error) {
			console.log(error)
		}
	}, [])

	const logout = async () => {
		await axios.get('/user/logout')
		setLogin(false)
		setAdmin(false)
		setCart([])
	}

	const addToCart = async (product) => {
		if (!login) return alert('Vui lòng đăng nhập')
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
			// setCart([...cart, { ...product, quantity: product.quantity }])
			setCart([...cart])
		}
		await axios.patch(
			'/user/addcart',
			{ cart },
			{
				headers: { Authorization: token },
			}
		)
	}

	const removeProduct = async (id) => {
		if (window.confirm('Bạn không muốn mua sản phẩm này sao bạn yêu?')) {
			// cart.forEach((item, index) => {
			// 	if (item._id === id) {
			// 		cart.splice(index, 1)
			// 	}
			// })
			setCart([...cart.filter((e) => e._id !== id)])
			await axios.patch(
				'/user/addcart',
				{ cart: [...cart.filter((e) => e._id !== id)] },
				{
					headers: { Authorization: token },
				}
			)
		}
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
				user,
			}}
		>
			{children}
		</GlobalState.Provider>
	)
}
