import React, { useState, useEffect, useContext, useRef } from 'react'
import productAPI from '../../api/productAPI'
import Form from './Form'
import { GlobalState } from '../../GlobalState'
import { useDetectOutsideClick } from '../../utils/useDetectOutsideClick'

const CategoryAdmin = () => {
	const { token, categories } = useContext(GlobalState)
	const [productList, setProductList] = useState([])

	const [product, setProduct] = useState({})

	const [visible, setVisible] = useState(false)

	const [filterCategory, setFilterCategory] = useState('tất cả')

	const [searchValue, setSearchValue] = useState('')

	const onChangeInput = (e) => {
		const { name, value } = e.target
		setProduct({ ...product, [name]: value })
	}
	useEffect(() => {
		async function fetchProduct() {
			try {
				const params = {
					q: searchValue,
					_limit: 1000, // tối đa bao nhiêu sản phẩm trong 1 trang
				}
				const result = await productAPI.getAll(params)
				if (result.status === 'Success') {
					setProductList(result.data)
				}
			} catch (err) {
				console.log(err)
			}
		}

		fetchProduct()
	}, [searchValue])

	async function fetchProduct() {
		try {
			const params = {
				category: filterCategory !== 'tất cả' ? filterCategory : '',
				_limit: 10000, // tối đa bao nhiêu sản phẩm trong 1 trang
			}
			const result = await productAPI.getAll(params)
			if (result.status === 'Success') {
				setProductList(result.data)
			}
		} catch (err) {
			console.log(err)
		}
	}
	useEffect(() => {
		fetchProduct()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterCategory])

	useEffect(() => {
		setVisible(false)
	}, [])

	useEffect(() => {
		visible
			? document.body.classList.add('overflow-hidden')
			: document.body.classList.remove('overflow-hidden')
	}, [visible])
	const handleShowFormEdit = (id) => {
		if (!visible) {
			setVisible(true)
			setProduct(...productList.filter((e) => e._id === id))
		}
	}
	const handleDelete = async (id) => {
		try {
			await productAPI.delete(id, token)
			setProductList([...productList.filter((e) => e._id !== id)])
		} catch (err) {
			console.log(err)
		}
	}

	const dropdownRef = useRef(null)

	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)

	const handleDropdown = () => setIsActive(!isActive)

	const typeingTimeoutRef = useRef(null)

	const handleSearch = (e) => {
		const value = e.target.value
		if (value) {
			if (typeingTimeoutRef.current) {
				clearTimeout(typeingTimeoutRef.current)
			}
			typeingTimeoutRef.current = setTimeout(() => {
				setSearchValue(value)
			}, 300)
		} else {
			setSearchValue('')
		}
	}

	return (
		<>
			{visible && (
				<Form
					onChangeInput={onChangeInput}
					product={product}
					setProduct={setProduct}
					visible={visible}
					setVisible={setVisible}
					fetchProduct={fetchProduct}
				/>
			)}
			<div className="mt-12 lg:mt-0 lg:ml-56 p-3 flex flex-col space-y-4 relative">
				<div className="flex flex-col-reverse md:flex-row md:space-x-2 z-10">
					<div className="flex w-56 relative">
						<button
							ref={dropdownRef}
							onClick={handleDropdown}
							className="w-full mt-2 md:mt-0 flex items-center uppercase justify-between border h-9 px-2 text-sm font-bold rounded-md dark:text-white"
						>
							{filterCategory}
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>

						{isActive && (
							<div className="absolute top-12 left-0 w-full rounded-md shadow-md bg-white dark:bg-gray-700 transform origin-top animation-down">
								<div className="flex flex-col p-1 font-medium ">
									<button
										onClick={() => setFilterCategory('tất cả')}
										className="text-left font-medium text-sm uppercase hover:bg-gray-300 rounded-md p-2"
									>
										Tất cả
									</button>
									{categories.map((category) => (
										<button
											key={category._id}
											onClick={() => setFilterCategory(category.slug)}
											className="text-left font-medium text-sm uppercase hover:bg-gray-300 rounded-md p-2"
										>
											{category.name}
										</button>
									))}
								</div>
							</div>
						)}
					</div>
					<div className="relative w-full h-9">
						<div className="flex flex-1 justify-between items-center border border-gray-300 rounded-md h-full">
							<button className="px-2">
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</button>
							<input
								onChange={handleSearch}
								placeholder="Tìm kiếm"
								className="flex-1 p-1 text-sm bg-transparent focus:outline-none focus:shadow-outline"
							/>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
					{productList.map((product, index) => (
						<div
							key={index}
							title={product.title}
							className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
						>
							<div className="bg-white">
								<img
									src={product.images[0]?.url}
									alt={product.title}
									className="w-full object-cover h-48"
								/>
								<div className="flex flex-col space-y-1 py-1 px-2">
									<span className="text-sm font-medium text-gray-500 truncate uppercase">
										{product.title}
									</span>
									<span className="text-xs font-medium text-gray-500">
										{parseInt(product.price).toLocaleString('en')} vnđ
									</span>
									<span className="text-xs font-medium text-gray-500">
										Số lượng: {product.inStock}
									</span>
									<div className="flex p-1 justify-center item-center space-x-3">
										<button
											onClick={() => handleShowFormEdit(product._id)}
											className="bg-yellow-400 w-20 rounded-md font-medium text-white transform hover:-translate-y-1 transition-all"
										>
											Sửa
										</button>
										<button
											onClick={() => handleDelete(product._id)}
											className="bg-red-400 w-20 rounded-md font-medium text-white transform hover:-translate-y-1 transition-all"
										>
											Xóa
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default CategoryAdmin
