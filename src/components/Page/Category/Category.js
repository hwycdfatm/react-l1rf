import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import productAPI from '../../../api/productAPI'

import Pagination from '../../../utils/Pagination'
import Product from '../Product/Product'
import Loading from '../../../utils/Loading'
import Error from '../Error/Error'

const Category = () => {
	const { slug } = useParams()
	const [products, setProducts] = useState([])
	const [load, setLoad] = useState(true)
	const [fail, setFail] = useState(false)
	const [totalPage, setTotalPage] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [grid, setGrid] = useState(false)
	useEffect(() => {
		async function fetchProduct() {
			try {
				const params = {
					category: slug,
					_page: currentPage,
					_limit: 20, // tối đa bao nhiêu sản phẩm trong 1 trang
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
	}, [slug, currentPage])

	if (fail) return <Error />

	return (
		<>
			<section className="w-full px-4 xl:px-10 lg:pt-4 flex flex-col space-y-4">
				<div className="flex items-center lg:justify-end w-full">
					<button className="bg-white h-9 flex items-center justify-center mr-2 px-3 space-x-2 border-2 border-gray-200 rounded">
						<span>Mới nhất</span>
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
								d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
							/>
						</svg>
					</button>
					<button className="bg-white h-9 flex items-center justify-center px-3 space-x-2 border-2 border-gray-200 rounded">
						<span>Giá</span>
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
								d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
							/>
						</svg>
					</button>
					<button
						onClick={() => setGrid(!grid)}
						className="bg-white h-9 flex md:hidden w-9 ml-auto items-center justify-center border-2 border-gray-200 rounded"
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
								d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
							/>
						</svg>
					</button>
				</div>
				<div className="flex flex-wrap -mx-1 md:-mx-2 overflow-hidden transition-all">
					{products.map((product, index) => (
						<Product sp={product} key={index} grid={grid} />
					))}

					{products.length === 0 && <div className="mx-auto">Trống</div>}
				</div>
				{totalPage > 1 && (
					<Pagination
						totalPage={totalPage}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						slug={slug}
					/>
				)}
			</section>
			{load && <Loading />}
		</>
	)
}

export default Category
