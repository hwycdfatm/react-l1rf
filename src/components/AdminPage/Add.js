import React, { useState, useEffect, useContext } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { GlobalState } from '../../GlobalState'
import axios from 'axios'
const Add = () => {
	// Global state
	const state = useContext(GlobalState)

	// Check admin
	const [admin] = state.isAdmin

	// get token
	const [token] = state.token

	// init Product
	const [product, setProduct] = useState({
		title: '',
		description: '',
		content: 'Đây là phần content của sản phẩm',
		category: '',
		slug: '',
		price: '',
		inStock: '',
	})
	// init category
	const [categories, setCategories] = useState([])

	// lazy loading
	const [loading, setLoading] = useState(false)

	// image
	const [image, setImage] = useState('')

	// handle Input fields
	const onChangeInput = (e) => {
		const { name, value } = e.target
		setProduct({ ...product, [name]: value })
	}

	// set content
	const [content, setContent] = useState('')

	// convers title to slug
	function string_to_slug(str) {
		str = str.toLowerCase()

		str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

		str = str.replace(/[đĐ]/g, 'd')

		str = str.replace(/([^0-9a-z-\s])/g, '')

		str = str.replace(/(\s+)/g, '-')

		str = str.replace(/-+/g, '-')

		str = str.replace(/^-+|-+$/g, '')

		product.slug = str
	}

	// handle upload image
	const handleUploadImage = async (e) => {
		e.preventDefault()
		try {
			if (!admin) return console.log('bạn không có quyền')
			const file = e.target.files[0]
			if (!file) return alert('Vui lòng chọn file')
			if (file.type !== 'image/png' && file.type !== 'image/jpeg')
				return alert('Vui lòng chọn file ảnh')
			if (file.size > 1024 * 1024 * 1024) return alert('Kích thước ảnh quá to')
			let formData = new FormData()
			formData.append('file', file)
			setLoading(true)
			const res = await axios.post('/api/upload', formData, {
				headers: {
					'content-type': 'multipart/form-data',
					Authorization: token,
				},
			})
			if (res) {
				setLoading(false)
				setImage(res.data)
				console.log(res)
			}
		} catch (error) {
			console.log(error)
		}
	}

	// delete image
	const handleDestroy = async () => {
		try {
			if (!admin) return alert("You're not an admin")
			setLoading(true)
			await axios.post(
				'/api/destroy',
				{ public_id: image.public_id },
				{
					headers: { Authorization: token },
				}
			)
			setLoading(false)
			setImage(false)
		} catch (err) {
			alert(err)
		}
	}
	// handle upload product
	const handleAddProduct = (e) => {
		e.preventDefault()
		console.log({ product, content, image })
	}
	const handleUpLoadImagess = async (e) => {
		e.preventDefault()
	}

	// api category get and push to view
	useEffect(() => {
		const getCategories = async () => {
			const res = await axios.get('/api/category')
			setCategories(res.data.data)
		}
		getCategories()
	}, [])
	return (
		<form
			onSubmit={handleAddProduct}
			className="pt-20 flex flex-col bg-white dark:bg-gray-700 transition duration-700 dark:text-white"
		>
			<div className="flex flex-col p-1 w-full max-w-screen-lg mx-auto overflow-hidden md:flex-row md:space-x-4">
				<div className=" h-96 md:w-1/2 shadow appearance-none border rounded w-full  text-gray-700 leading-tight overflow-hidden flex items-center justify-center md:h-60v focus:outline-none focus:shadow-outline relative">
					{image ? (
						<>
							<img src={image.url} alt="" className="h-full object-contain" />
							<div
								onClick={handleDestroy}
								className="absolute top-1 right-1 text-red-300 cursor-pointer"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</div>
						</>
					) : (
						<label
							htmlFor="image-upload"
							className="w-full h-full flex items-center justify-center bg-gray-100"
						>
							<svg
								className="w-10 h-10"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
						</label>
					)}

					{loading && (
						<div className="absolute flex w-full h-full items-center justify-center bg-white">
							<div className="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce blue-circle"></div>
							<div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle"></div>
							<div className="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce red-circle"></div>
						</div>
					)}

					<input
						type="file"
						hidden
						id="image-upload"
						onChange={handleUploadImage}
					/>
				</div>
				<div className="w-full flex flex-col px-5 space-y-2 text-sm md:text-base md:w-1/2">
					<div>
						<h1 className="text-sm md:text-md md:font-semibold">
							Tên sản phẩm
						</h1>
						<input
							placeholder="Nhập tên sản phẩm ở đây......"
							name="title"
							autoComplete="off"
							value={product.title}
							onChange={onChangeInput}
							onInput={string_to_slug(product.title)}
							className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<p className="text-gray-400 h-6" id="slug-innner">
						{product.slug
							? '/' + product.slug
							: 'Phần slug sẽ được tạo tự động ở đây'}
					</p>
					<input
						type="text"
						name="slug"
						hidden
						value={product.slug}
						onChange={onChangeInput}
					/>
					<div>
						<h1 className="text-sm md:text-md md:font-semibold">Mô tả</h1>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Nhập mô tả ngắn ở đây nè"
							rows="5"
							name="description"
							value={product.description}
							onChange={onChangeInput}
						></textarea>
					</div>
					<div>
						<h1 className="text-sm md:text-md md:font-semibold">Giá</h1>
						<input
							type="number"
							placeholder="Nhập giá nè"
							className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							name="price"
							value={product.price}
							onChange={onChangeInput}
						/>
						<span className="ml-4 text-sm font-medium">VNĐ</span>
					</div>
					<div className="flex flex-col order-first  md:order-none md:justify-start pb-2 lg:pb-0">
						<h1 className="text-sm md:text-md md:font-semibold">
							Các ảnh khác
						</h1>
						<div className="flex md:justify-start justify-center items-center md:space-x-1">
							<label
								htmlFor="imagess"
								className="w-20 h-20 rounded bg-gray-100 shadow flex items-center justify-center"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 6v6m0 0v6m0-6h6m-6 0H6"
									/>
								</svg>
							</label>
						</div>
						<input
							type="file"
							id="imagess"
							hidden
							multiple
							onChange={handleUpLoadImagess}
						/>
					</div>
					<div>
						<h1 className="text-sm md:text-md md:font-semibold">
							Nhập số lượng trong kho
						</h1>
						<input
							className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Nhập số lượng ở đây nè"
							type="number"
							name="inStock"
							value={product.inStock}
							onChange={onChangeInput}
						/>
					</div>
					<div className="text-base flex flex-col ">
						<h1 className="text-sm md:text-md md:font-semibold">
							Chọn danh mục
						</h1>
						<div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
							<select
								onChange={onChangeInput}
								name="category"
								className="shadow appearance-none border rounded px-2 py-2 text-gray-700 focus:outline-none focus:shadow-outline xl:px-4"
							>
								<option value="">Chọn danh mục</option>
								{categories.map((category, index) => (
									<option key={index} value={category.slug}>
										{category.name}
									</option>
								))}
							</select>
							<button
								type="submit"
								className="px-2 py-2 text-gray-900 bg-gray-100 rounded font-semibold border shadow xl:px-4"
							>
								Thêm sản phẩm
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-2 mx-auto w-full max-w-screen-lg p-1">
				{/* <textarea
					placeholder="Nhập dữ liệu gì đó ở đây nè"
					className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					rows="20"
					name="content"
					value={content}
					onChange={onChangeInput}
				></textarea> */}
				<CKEditor
					editor={ClassicEditor}
					data={product.content}
					// Hide upload image
					//=--------------------------------

					// config={{
					// 	ckfinder: {
					// 		uploadUrl: '/api/upload',
					// 		headers: {
					// 			Authorization: token,
					// 		},
					// 	},
					// }}

					//=--------------------------------
					onChange={(event, editor) => {
						const data = editor.getData()
						setContent(data)
					}}
				/>
			</div>
		</form>
	)
}

export default Add
