import { useEffect, useState } from 'react'
import axios from 'axios'
function UserAPI(token) {
	const [login, setLogin] = useState(false)
	const [admin, setAdmin] = useState(false)
	const [cart, setCart] = useState([])
	useEffect(() => {
		if (token) {
			const getUser = async () => {
				try {
					const result = await axios.get('/user/info', {
						headers: { Authorization: token },
					})
					setLogin(true)
					result.data.user.role === 'admin' ? setAdmin(true) : setAdmin(false)
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
			alert('Thêm thành công')
		} else {
			setCart([...cart, { ...product, quantity: product.quantity }])
			console.log(cart)
			await axios.patch(
				'/user/addcart',
				{ cart },
				{
					headers: { Authorization: token },
				}
			)
			alert('Thêm thành công 1')
		}
		// await axios.patch(
		// 	'/user/addcart',
		// 	{ cart },
		// 	{
		// 		headers: { Authorization: token },
		// 	}
		// )
	}

	return {
		isLogin: [login, setLogin],
		isAdmin: [admin, setAdmin],
		cart: [cart, setCart],
		addToCart: addToCart,
	}
}

export default UserAPI
