import axiosAPI from './axiosAPI'
const userAPI = {
	login: (user) => {
		const url = '/user/login'
		return axiosAPI.post(url, { ...user })
	},
	loginWithFacebook: (user) => {
		const url = '/user/loginwithfacebook'
		return axiosAPI.post(url, { ...user })
	},
	handleCart: (cart, token) => {
		const url = '/user/addcart'
		return axiosAPI.patch(
			url,
			{ cart: [...cart] },
			{ headers: { Authorization: token } }
		)
	},
	updateProfile: (profile) => {
		const url = '/user/addcart'
		return axiosAPI.patch(url)
	},
	refreshToken: () => {
		const url = '/user/refresh_token'
		return axiosAPI.get(url)
	},
	getUser: (token) => {
		const url = '/user/info'
		return axiosAPI.get(url, { headers: { Authorization: token } })
	},
	logout: () => {
		const url = '/user/logout'
		return axiosAPI.get(url)
	},
	register: (data) => {
		const url = '/user/register'
		return axiosAPI.post(url, { ...data })
	},
	getAllUsers: ({ token }) => {
		const url = '/user/all'
		return axiosAPI.get(url, { headers: { Authorization: token } })
	},
	updateRoleAndActivate: ({ token, role, activate, _id }) => {
		const url = `/user/${_id}`
		return axiosAPI.patch(
			url,
			{ role, activate },
			{ headers: { Authorization: token } }
		)
	},
}
export default userAPI
