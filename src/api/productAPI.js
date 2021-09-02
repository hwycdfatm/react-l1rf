import axiosClient from './axiosCLient'
const productAPI = {
	getAll: (params) => {
		const url = '/product'
		return axiosClient.get(url, { params })
	},
	getTrash: (params, token) => {
		const url = '/product/bts/trash'
		return axiosClient.get(url, { params, headers: { Authorization: token } })
	},
	getBySlug: (slug) => {
		const url = `/product/${slug}`
		return axiosClient.get(url)
	},
	getById: (id) => {
		const url = `/product/id/${id}`
		return axiosClient.get(url)
	},
	creat: (params, token) => {
		const url = '/product/'
		return axiosClient.post(url, { params, headers: { Authorization: token } })
	},
	update: (params, id, token) => {
		const url = `/product/${id}`
		return axiosClient.put(url, { params, headers: { Authorization: token } })
	},
	restore: (id, token) => {
		const url = `/product/${id}/restore`
		return axiosClient.patch(url, { headers: { Authorization: token } })
	},
	delete: (id, token) => {
		const url = `/product/${id}`
		return axiosClient.delete(url, { headers: { Authorization: token } })
	},
	deletedForce: (id, token) => {
		const url = `/product/${id}/force`
		return axiosClient.delete(url, { headers: { Authorization: token } })
	},
}

export default productAPI
