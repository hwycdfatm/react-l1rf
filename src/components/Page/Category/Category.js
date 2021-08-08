import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Pagination from '../../../utils/Pagination'
import Product from '../Product/Product'
import Loading from '../../../utils/Loading'

const Category = () => {
	const { slug } = useParams()
	const [products, setProducts] = useState([slug])
	const [load, setLoad] = useState(true)
	const [totalPage, setTotalPage] = useState('')
	const _limit = 1
	const [currentPage, setCurrentPage] = useState(1)
	useEffect(() => {
		async function fetchProduct() {
			try {
				const result = await axios.get(
					`/api/product?category=${slug}&_limit=${_limit}&_page=${currentPage}`
				)

				setLoad(false)
				setProducts(result.data.data)
				setTotalPage(result.data.pagination._total_Page)
			} catch (err) {
				console.log(err)
			}
		}
		fetchProduct()
	}, [slug, currentPage, _limit])
	return (
		<>
			<div className="w-full flex flex-col px-4 pt-24 dark:text-white transition duration-700 space-y-4">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{products.map((product, index) => (
						<Product sp={product} key={index} />
					))}
					{products.length === 0 && <div>Trống</div>}
				</div>
			</div>
			{totalPage > 1 && (
				<Pagination
					totalPage={totalPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}
			{load && <Loading />}
		</>
	)
}

export default Category
