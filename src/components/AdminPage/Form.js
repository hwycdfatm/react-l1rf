import React, { useContext } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { GlobalState } from '../../GlobalState'
import uploadImageAPI from '../../api/uploadImageAPI'
import productAPI from '../../api/productAPI'

const Form = (props) => {
	// default Action is Add
	const { onChangeInput, product, setProduct, setVisible } = props

	// Global state
	const { admin, token, categories } = useContext(GlobalState)

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

	// function check Image
	function checkImage(image) {
		if (image.type !== 'image/png' && image.type !== 'image/jpeg')
			return alert('Vui lòng chọn file ảnh')
		if (image.size > 1024 * 1024 * 1024) return alert('Kích thước ảnh quá to')
		return true
	}

	// Upload hình ảnh
	const handleUploadImages = async (e) => {
		e.preventDefault()
		try {
			if (!admin) return alert('bạn không có quyền')
			const files = e.target.files
			if (files.length === 0) return alert('Vui lòng chọn ảnh')
			let formData = new FormData()
			if (files.length === 1) {
				const check = checkImage(files[0])
				if (check) {
					formData.append('file', files[0])
				}
			} else {
				if (files.length > 4) return alert('Tối đa 4 ảnh thôi bạn !')
				for (let file of files) {
					const check = checkImage(file)
					if (check) {
						formData.append('file', file)
					}
				}
			}

			const res = await uploadImageAPI.upload(formData, token)
			console.log(res.images)
			setProduct({
				...product,
				images: [...product.images, ...res.images],
			})
		} catch (error) {
			console.log(error)
		}
	}

	// Handle Edit product
	const handleEditProduct = async (e) => {
		e.preventDefault()
		try {
			if (!admin) return alert('Mày không có quyền')
			const check = await productAPI.update({ ...product }, product._id, token)

			if (check.status === 'Success') {
				// fetchProduct()
				alert(check.message)
				setVisible(false)
			}
		} catch (error) {
			console.log(error)
		}
	}

	// delete image
	const handleDestroy = async (public_name) => {
		try {
			if (!admin) return alert('Mày không có quyền')

			await uploadImageAPI.delete([public_name], token)

			setProduct({
				...product,
				images: [
					...product.images.filter(
						(image) => image.public_name !== public_name
					),
				],
			})
		} catch (err) {
			alert(err.message)
		}
	}

	return (
		<div
			className={`fixed top-0 bottom-0 right-0 left-0 pt-6 lg:pt-10 z-30 lg:pl-56  xl:pl-44 shadows-xl min-h-screen flex flex-col bg-white bg-opacity-90 transition duration-700 transform overflow-y-scroll animation-scale scrollbar animation-down`}
		>
			<form onSubmit={handleEditProduct} className="p-3">
				<div className="flex flex-col p-1 w-full max-w-screen-lg mx-auto md:flex-row md:space-x-4">
					<div className="h-96 md:h-542px md:w-1/2 shadow appearance-none border rounded w-full text-gray-700 leading-tight overflow-hidden flex items-center justify-center focus:outline-none focus:shadow-outline relative">
						{product.images && product.images[0] ? (
							<>
								<img
									src={product.images[0].url}
									alt=""
									className="h-full object-cover"
								/>
								<div
									onClick={() => handleDestroy(product.images[0].public_name)}
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

						<input
							type="file"
							hidden
							id="image-upload"
							onChange={handleUploadImages}
						/>
					</div>
					<div className="w-full flex flex-col space-y-2 text-sm md:text-base md:w-1/2 md:pl-5 md:space-y-4">
						<div className="space-y-1">
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
						<div className="space-y-1">
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
						<div className="space-y-1">
							<h1 className="text-sm md:text-md md:font-semibold">
								Giá :{' '}
								<span className="ml-2">
									{product.price &&
										parseInt(product.price).toLocaleString('en')}{' '}
									VNĐ
								</span>
							</h1>
							<input
								type="number"
								placeholder="Nhập giá nè"
								className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name="price"
								value={product.price}
								onChange={onChangeInput}
							/>
							<span className="ml-2 text-sm font-semibold">VNĐ</span>
						</div>
						<div className="flex flex-col order-first space-y-2 md:order-none md:justify-start pb-2 lg:pb-0">
							<h1 className="text-sm md:text-md md:font-semibold">
								Các ảnh khác (tối đa 4 ảnh / vui lòng chọn ảnh lớn trước)
							</h1>
							<div className="flex md:justify-start justify-center items-center space-x-2">
								{product.images.length < 2 ? (
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
								) : (
									product.images.map((image, index) => (
										<div
											className="w-20 h-20 rounded bg-gray-100 shadow flex items-center justify-center overflow-hidden relative"
											key={index}
										>
											<img
												className="h-full object-cover"
												src={image.url}
												alt=""
											/>
											<div
												onClick={() => handleDestroy(image.public_name)}
												className="absolute top-1 right-1 text-red-300 cursor-pointer"
											>
												<svg
													className="w-3 h-3"
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
										</div>
									))
								)}
							</div>

							<input
								type="file"
								id="imagess"
								hidden
								multiple
								onChange={handleUploadImages}
							/>
						</div>
						<div className="space-y-1">
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

						<div className="text-base flex flex-col space-y-1">
							<h1 className="text-sm md:text-md md:font-semibold">
								Chọn danh mục
							</h1>
							<div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
								<select
									onChange={onChangeInput}
									name="category"
									value={product.category}
									className="shadow appearance-none border rounded px-2 py-2 text-gray-700 focus:outline-none focus:shadow-outline xl:px-4"
								>
									<option value="" hidden>
										Chọn danh mục
									</option>
									{categories.map((category, index) => (
										<option key={index} value={category.slug}>
											{category.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="text-base flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-3 justify-between">
							<button
								type="submit"
								className="w-full px-2 py-2 text-white bg-green-300 rounded font-medium xl:px-4"
							>
								Cập nhật
							</button>
							<button
								type="button"
								onClick={() => setVisible(false)}
								className="w-full px-2 py-2 text-white bg-red-400 rounded font-medium xl:px-4"
							>
								Hủy
							</button>
						</div>
					</div>
				</div>
				<div className="mt-2 mx-auto w-full max-w-screen-lg p-1 unreset">
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
							setProduct({ ...product, content: data })
						}}
					/>
				</div>
			</form>
		</div>
	)
}

export default Form
