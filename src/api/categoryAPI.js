import axiosAPI from './axiosAPI'

const categoriesAPI = {
	get: () => {
		const url = '/category'
		return axiosAPI.get(url)
	},
	create: (data, token) => {
		const url = '/category'
		return axiosAPI.post(url, data, { headers: { Authorization: token } })
	},
	update: (data, token, id) => {
		const url = `/category/${id}`
		return axiosAPI.put(url, data, { headers: { Authorization: token } })
	},
}

export default categoriesAPI
