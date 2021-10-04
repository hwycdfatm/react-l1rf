import React, { useState, useEffect, useContext, useRef } from 'react'
import productAPI from '../../api/productAPI'
import Form from './Form'
import { GlobalState } from '../../GlobalState'
import { useDetectOutsideClick } from '../../utils/useDetectOutsideClick'
import Pagination from '../../utils/Pagination'
const CategoryAdmin = () => {
	const { token, categories } = useContext(GlobalState)
	const [productList, setProductList] = useState([])

	const [currentPage, setCurrentPage] = useState(0)
	const [product, setProduct] = useState({})

	const [visible, setVisible] = useState(false)

	const [totalPage, setTotalPage] = useState(0)

	const [filterCategory, setFilterCategory] = useState('Tất cả')

	const onChangeInput = (e) => {
		const { name, value } = e.target
		setProduct({ ...product, [name]: value })
	}

	useEffect(() => {
		async function fetchProduct() {
			try {
				const params = {
					category: filterCategory !== 'Tất cả' ? filterCategory : '',
					_page: currentPage,
					_limit: 20, // tối đa bao nhiêu sản phẩm trong 1 trang
				}
				const result = await productAPI.getAll(params)
				if (result.status === 'Success') {
					setProductList(result.data)
					setTotalPage(result.pagination._total_Page)
				}
			} catch (err) {
				console.log(err)
			}
		}
		fetchProduct()
	}, [filterCategory, currentPage])

	useEffect(() => {
		setVisible(false)
	}, [])

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

	const [searchValue, setSearchValue] = useState('')

	const [resultSearchValue, setResultSearchValue] = useState([])
	const typeingTimeoutRef = useRef(null)

	const handleSubmitSearch = async (value) => {
		const params = {
			q: value,
			_limit: 10,
		}
		const result = await productAPI.getAll(params)
		if (result.status === 'Success') {
			setResultSearchValue(result.data)
		}
	}

	const handleSearch = (e) => {
		const value = e.target.value
		setSearchValue(value)
		if (value) {
			if (typeingTimeoutRef.current) {
				clearTimeout(typeingTimeoutRef.current)
			}
			typeingTimeoutRef.current = setTimeout(() => {
				handleSubmitSearch(value.trim())
			}, 300)
		}
	}

	return (
		<>
			{visible && (
				<Form
					onChangeInput={onChangeInput}
					product={product}
					setProduct={setProduct}
					setVisible={setVisible}
				/>
			)}
			<div className="mt-12 lg:mt-0 lg:ml-56 p-3 flex flex-col space-y-4 relative">
				<div className="flex flex-col-reverse md:flex-row md:space-x-2 z-10">
					<div className="flex w-56 relative">
						<button
							to="#"
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
										onClick={() => setFilterCategory('Tất cả')}
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
								value={searchValue}
								onChange={handleSearch}
								placeholder="Tìm kiếm"
								className="flex-1 p-1 text-sm bg-transparent focus:outline-none focus:shadow-outline"
							/>
						</div>

						{searchValue && (
							<div className="absolute bg-white rounded-md h-auto shadow-lg top-10 left-0 lg:left-8 right-0">
								{resultSearchValue && resultSearchValue.length >= 1 ? (
									<div className="flex flex-col space-y-2">
										{resultSearchValue.map((product) => (
											<div key={product._id} className="w-full h-16 flex">
												<img
													src={product.images[0].url}
													alt={product.title}
													className="w-14 h-14"
												/>
												<div>
													<p>{product.title}</p>
													<span>
														{parseInt(product.price).toLocaleString('en')}vnđ
													</span>
												</div>
											</div>
										))}
									</div>
								) : (
									<div> Không tìm thấy</div>
								)}
							</div>
						)}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
					{productList.map((product, index) => (
						<div
							key={index}
							title={product.title}
							className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
						>
							<input
								type="checkbox"
								className="w-4 h-4 absolute top-1 right-1"
							/>
							<div className="bg-white">
								<img
									src={product.images[0]?.url}
									alt={product.title}
									className="w-full object-cover h-48"
								/>
								<div className="flex flex-col space-y-1 py-1 px-2">
									<span className="text-sm font-medium text-gray-500 truncate">
										{product.title}
									</span>
									<span className="text-xs font-medium text-gray-500">
										{parseInt(product.price).toLocaleString('en')} vnđ
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
				{totalPage > 1 && (
					<Pagination
						totalPage={totalPage}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						slug={filterCategory}
					/>
				)}
			</div>
		</>
	)
}

export default CategoryAdmin