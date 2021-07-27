import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Product from '../Product/Product'
import Loading from '../../../utils/Loading'

const Category = () => {
	const { slug } = useParams()
	const [products, setProducts] = useState([slug])
	const [load, setLoad] = useState(true)

	useEffect(() => {
		async function fetchProduct() {
			try {
				const result = await axios.get(`/api/category/${slug}`)
				setLoad(false)
				setProducts(result.data.data)
			} catch (err) {
				console.log(err)
			}
		}
		fetchProduct()
	}, [slug])
	return (
		<>
			<div className="w-full flex flex-col px-4 pt-24 dark:text-white transition duration-700 space-y-4">
				<div className="py-2 border border-gray-200 rounded-sm flex justify-end px-5">
					<div>Giá</div>
					<div>Mới nhất</div>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{products.map((product, index) => (
						<Product sp={product} key={index} />
					))}
				</div>
			</div>
			{load && <Loading />}
		</>
	)
}

export default Category
