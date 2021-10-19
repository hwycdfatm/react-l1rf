import axioxAPI from './axiosAPI'

const uploadImageAPI = {
	upload: (image, token) => {
		const url = '/upload'
		return axioxAPI.post(url, image, {
			headers: {
				Authorization: token,
				'content-type': 'multipart/form-data',
			},
		})
	},
	delete: (public_name, token) => {
		const url = `/destroy/${public_name}`
		return axioxAPI.post(
			url,
			{ public_name },
			{
				headers: { Authorization: token },
			}
		)
	},

	deleteArrayImage: (data, token) => {
		const url = `/destroy-array/`
		return axioxAPI.post(
			url,
			{ images: data },
			{
				headers: { Authorization: token },
			}
		)
	},
}

export default uploadImageAPI
