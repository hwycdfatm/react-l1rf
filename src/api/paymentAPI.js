import axiosAPI from './axiosAPI'
const paymentApi = {
	create: (data, token) => {
		const url = '/payment'
		return axiosAPI.post(url, data, { headers: { Authorization: token } })
	},

	getForUser: ({ token }) => {
		const url = '/payment'
		return axiosAPI.get(url, { headers: { Authorization: token } })
	},
	getDataPayment: ({ token, _from, _to }) => {
		const url = `/payment/dataofpayment?_from=${_from}&_to=${_to}`
		return axiosAPI.get(url, { headers: { Authorization: token } })
	},
	getAllPayments: ({ token }) => {
		const url = '/payment/admin'
		return axiosAPI.get(url, { headers: { Authorization: token } })
	},
	getAllPaymentsDeleted: ({ token }) => {
		const url = '/payment/deleted'
		return axiosAPI.get(url, { headers: { Authorization: token } })
	},

	updatePayment: ({ token, status, _id }) => {
		const url = `/payment/${_id}`
		return axiosAPI.put(url, { status }, { headers: { Authorization: token } })
	},

	deletePayment: ({ token, _id }) => {
		const url = `/payment/${_id}`
		return axiosAPI.delete(url, { headers: { Authorization: token } })
	},
	deleteForcePayment: ({ token, _id }) => {
		const url = `/payment/${_id}/force`
		return axiosAPI.delete(url, { headers: { Authorization: token } })
	},

	restorePayment: ({ token, _id }) => {
		const url = `/payment/${_id}/restore`
		return axiosAPI.patch(url, {}, { headers: { Authorization: token } })
	},
}

export default paymentApi
