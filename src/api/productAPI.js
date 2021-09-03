import axiosAPI from './axiosAPI'
const productAPI = {
	getAll: (params) => {
		const url = '/product'
		return axiosAPI.get(url, { params })
	},
	getTrash: (params, token) => {
		const url = '/product/bts/trash'
		return axiosAPI.get(url, { params, headers: { Authorization: token } })
	},
	getBySlug: (slug) => {
		const url = `/product/${slug}`
		return axiosAPI.get(url)
	},
	getById: (id) => {
		const url = `/product/id/${id}`
		return axiosAPI.get(url)
	},
	creat: (data, token) => {
		const url = '/product'
		return axiosAPI.post(url, data, { headers: { Authorization: token } })
	},
	update: (data, id, token) => {
		const url = `/product/${id}`
		return axiosAPI.put(url, data, { headers: { Authorization: token } })
	},
	restore: (id, token) => {
		const url = `/product/${id}/restore`
		return axiosAPI.patch(url, {}, { headers: { Authorization: token } })
	},
	delete: (id, token) => {
		const url = `/product/${id}`
		return axiosAPI.delete(url, { headers: { Authorization: token } })
	},
	deletedForce: (id, token) => {
		const url = `/product/${id}/force`
		return axiosAPI.delete(url, { headers: { Authorization: token } })
	},
}

export default productAPI
