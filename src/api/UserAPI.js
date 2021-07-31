import { useEffect, useState } from 'react'
import axios from 'axios'
function UserAPI(token) {
	const [login, setLogin] = useState(false)
	const [admin, setAdmin] = useState(false)

	useEffect(() => {
		if (token) {
			const getUser = async () => {
				try {
					const result = await axios.get('/user/info', {
						headers: { Authorization: token },
					})
					setLogin(true)
					result.data.user.role === 'admin' ? setAdmin(true) : setAdmin(false)
				} catch (error) {
					console.log(error)
				}
			}
			getUser()
		}
	}, [token])

	return {
		isLogin: [login, setLogin],
		isAdmin: [admin, setAdmin],
	}
}

export default UserAPI
