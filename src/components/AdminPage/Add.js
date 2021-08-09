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
					<div className="w-full h-96 md:w-1/2 rounded overflow-hidden flex items-center justify-center md:h-50v border-2 border-gray-700">
						Ảnh lớn nè
						<input type="file" hidden />
					</div>
					<div className="w-full flex flex-col px-5 space-y-2 text-sm md:text-base md:w-1/2">
						<input
							placeholder="Nhập tên sản phẩm ở đây......"
							className="p-2 text-xl font-semibold mt-4 md:text-2xl md:mt-0 border-2 rounded border-gray-700 bg-transparent dark:border-gray-100"
							name="title"
							value={product.title}
							onChange={onChangeInput}
							onInput={string_to_slug(product.title)}
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
							className="p-2 border-2 rounded border-gray-700 bg-transparent dark:border-gray-100"
							placeholder="Nhập mô tả ngắn ở đây nè"
							rows="5"
							name="description"
							value={product.description}
							onChange={onChangeInput}
						></textarea>
						<p className="font-medium mt-8">
							<input
								type="number"
								placeholder="Nhập giá nè"
								className="border-2 rounded border-gray-700 p-1 bg-transparent dark:border-gray-100"
								name="price"
								value={product.price}
								onChange={onChangeInput}
							/>
						</p>
						<div className="flex order-first items-center justify-center space-x-2 md:order-none md:justify-start">
							Chọn ảnh ở đây
							<input type="file" hidden />
						</div>
						<div>
							<input
								className="border-2 rounded border-gray-700 p-1 bg-transparent dark:border-gray-100"
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
								className="w-48 border-2 border-gray-700 rounded bg-transparent dark:border-gray-100"
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
								className="px-4 py-2 text-gray-900 bg-gray-100 rounded font-semibold "
							>
								Thêm sản phẩm
							</button>
						</div>
					</div>
				</div>
				<div className="mt-2 mx-auto w-full max-w-screen-lg p-1">
					<textarea
						placeholder="Nhập dữ liệu gì đó ở đây nè"
						className="w-full border-2 border-gray-700 rounded p-2 mb-10 bg-transparent dark:border-gray-100"
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
