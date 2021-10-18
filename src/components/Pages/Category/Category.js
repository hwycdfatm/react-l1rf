import React, { useEffect, useState, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import productAPI from '../../../api/productAPI'

import Pagination from '../../../utils/Pagination'
import Product from '../Product/Product'
import ProductsLoading from '../Product/ProductsLoading'
import Error from '../Error/Error'
import { Helmet } from 'react-helmet'

import { useLocalStorage } from '../../../GlobalState'
import { useDetectOutsideClick } from '../../../utils/useDetectOutsideClick'
function useQuery() {
	return new URLSearchParams(useLocation().search)
}

const Category = () => {
	const dropdownRef = useRef(null)
	const { slug } = useParams()
	const [products, setProducts] = useState([])
	const [load, setLoad] = useState(true)
	const [fail, setFail] = useState(false)
	const [totalPage, setTotalPage] = useState('')
	const [grid, setGrid] = useLocalStorage('grid', false)

	const [sort, setSort] = useState('-createdAt')

	let query = useQuery()

	const _page = query.get('_page') || 1

	const [dropdown, setDropdown] = useDetectOutsideClick(dropdownRef, false)
	const handleDropdown = () => setDropdown(!dropdown)
	useEffect(() => {
		async function fetchProduct() {
			try {
				const params = {
					sort,
					category: slug,
					_page,
					_limit: 18, // tối đa bao nhiêu sản phẩm trong 1 trang
				}
				setLoad(true)
				const result = await productAPI.getAll(params)
				if (result.status === 'Success') {
					setLoad(false)
					setProducts(result.data)
					setTotalPage(result.pagination._total_Page)
				}
			} catch (err) {
				console.log(err)
				if (err) return setFail(true)
			}
		}
		fetchProduct()
	}, [slug, _page, sort])

	const dataSort = [
		{
			sortBy: '-createdAt',
			text: 'Mới nhất',
		},
		{
			sortBy: 'createdAt',
			text: 'Cũ hơn',
		},
		{
			sortBy: 'price',
			text: 'Rẻ hơn',
		},
		{
			sortBy: '-price',
			text: 'Đắt nhất',
		},
	]

	if (fail) return <Error />

	return (
		<section className="w-full px-4 xl:px-10 lg:pt-4 flex flex-col space-y-4">
			<Helmet>
				<title>{String(slug).toUpperCase()}</title>
			</Helmet>
			<div className="flex items-center lg:justify-end w-full my-2">
				<div className="h-9 border flex items-center w-4/5 md:w-56 relative bg-white dark:bg-darkBgColor font-maven dark:text-white">
					<div
						ref={dropdownRef}
						onClick={() => handleDropdown()}
						className="flex justify-between w-full px-2 cursor-pointer"
					>
						<span>
							{sort === '-createdAt'
								? 'Mới nhất'
								: sort === 'createdAt'
								? 'Cũ hơn'
								: sort === '-price'
								? 'Đắt nhất'
								: sort === 'price' && 'Rẻ hơn'}
						</span>
						<div
							className={`transform ${dropdown && 'rotate-180'} transition-all`}
						>
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
						</div>
					</div>
					{dropdown && (
						<div className="absolute top-full bg-white dark:bg-darkBgColor dark:text-white z-20 mt-1 border w-full">
							{dataSort.map(
								(data) =>
									data.sortBy !== sort && (
										<div
											key={data.sortBy}
											onClick={() => setSort(data.sortBy)}
											className="flex justify-between w-full px-2 h-9 text-center leading-9 cursor-pointer"
										>
											<span>{data.text}</span>
										</div>
									)
							)}
						</div>
					)}
				</div>
				<button
					onClick={() => setGrid(!grid)}
					className="bg-white dark:bg-darkBgColor dark:text-white h-9 flex sm:hidden w-9 ml-auto items-center justify-center border"
				>
					{grid ? (
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
								d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
							/>
						</svg>
					) : (
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
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
				</button>
			</div>
			<div className="flex flex-wrap -mx-1 md:-mx-2 overflow-hidden transition-all">
				{load ? (
					<ProductsLoading grid={grid} />
				) : products.length === 0 ? (
					<div className="mx-auto">Trống</div>
				) : (
					products.map((product, index) => (
						<Product sp={product} key={index} grid={grid} />
					))
				)}
			</div>
			<div>
				{totalPage > 1 && (
					<Pagination totalPage={totalPage} currentPage={_page} slug={slug} />
				)}
			</div>
		</section>
	)
}

export default Category
