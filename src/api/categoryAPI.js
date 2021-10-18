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
	delete: (id, token) => {
		const url = `/category/${id}`
		return axiosAPI.delete(url, { headers: { Authorization: token } })
	},
}

export default categoriesAPI
