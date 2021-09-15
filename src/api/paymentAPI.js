import axiosAPI from './axiosAPI'
const paymentApi = {
	create: ({ order, user, total, quantity }, token) => {
		const url = '/payment'
		return axiosAPI.post(
			url,
			{ order, user, total, quantity },
			{ headers: { Authorization: token } }
		)
	},
	getForUser: ({ token }) => {
		const url = '/payment'
		return axiosAPI.get(url, { headers: { Authorization: token } })
	},
	getAllPayements: ({ token }) => {
		const url = '/payment/admin'
		return axiosAPI.get(url, { headers: { Authorization: token } })
	},
}

export default paymentApi
