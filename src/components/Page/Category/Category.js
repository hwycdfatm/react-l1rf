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

	useEffect(() => {
		async function fetchProduct() {
			try {
				const params = {
					category: slug,
					_page: currentPage,
					_limit: 9, // tối đa bao nhiêu sản phẩm trong 1 trang
				}
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
			<div className="w-full px-3 py-5">
				<div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{products.map((product, index) => (
						<Product sp={product} key={index} />
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
			</div>
			{load && <Loading />}
		</>
	)
}

export default Category
