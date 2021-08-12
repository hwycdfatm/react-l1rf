import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Add = () => {
	const [product, setProduct] = useState({
		title: '',
		description: '',
		content: '',
		image: '',
		category: '',
		slug: '',
		price: '',
		inStock: '',
	})
	const [categories, setCategories] = useState([])
	const onChangeInput = (e) => {
		const { name, value } = e.target
		setProduct({ ...product, [name]: value })
	}

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

	const handleAddProduct = (e) => {
		e.preventDefault()
		console.log(product)
	}
	const getCategories = async () => {
		const res = await axios.get('/api/category')
		setCategories(res.data.data)
	}

	useEffect(() => {
		getCategories()
	}, [])
	return (
		<>
			<form
				onSubmit={handleAddProduct}
				className="pt-20 flex flex-col bg-white dark:bg-gray-700 transition duration-700 dark:text-white"
			>
				<div className="flex flex-col p-1 w-full max-w-screen-lg mx-auto overflow-hidden md:flex-row md:space-x-4">
					<div className=" h-96 md:w-1/2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight overflow-hidden flex items-center justify-center md:h-60v focus:outline-none focus:shadow-outline">
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
						<input type="file" hidden />
					</div>
					<div className="w-full flex flex-col px-5 space-y-2 text-sm md:text-base md:w-1/2">
						<input
							placeholder="Nhập tên sản phẩm ở đây......"
							name="title"
							autoComplete="off"
							value={product.title}
							onChange={onChangeInput}
							onInput={string_to_slug(product.title)}
							className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>

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
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Nhập mô tả ngắn ở đây nè"
							rows="5"
							name="description"
							value={product.description}
							onChange={onChangeInput}
						></textarea>
						<div>
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
						<div className="flex order-first items-center justify-center space-x-2 md:order-none md:justify-start">
							<div
								title="Chọn các ảnh khác"
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
							</div>
							<input type="file" hidden />
						</div>
						<div>
							<input
								className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Nhập số lượng ở đây nè"
								type="number"
								name="inStock"
								value={product.inStock}
								onChange={onChangeInput}
							/>
						</div>
						<div className="text-base flex space-x-4">
							<select
								name="category"
								className="shadow appearance-none border rounded px-4 py-2 text-gray-700 focus:outline-none focus:shadow-outline"
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
								className="px-4 py-2 text-gray-900 bg-gray-100 rounded font-semibold shadow"
							>
								Thêm sản phẩm
							</button>
						</div>
					</div>
				</div>
				<div className="mt-2 mx-auto w-full max-w-screen-lg p-1">
					<textarea
						placeholder="Nhập dữ liệu gì đó ở đây nè"
						className="shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						rows="20"
						name="content"
						value={product.content}
						onChange={onChangeInput}
					></textarea>
				</div>
			</form>
		</>
	)
}

export default Add
