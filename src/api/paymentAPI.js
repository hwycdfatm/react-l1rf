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
}

export default paymentApi
