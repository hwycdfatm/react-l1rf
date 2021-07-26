import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
const Category = () => {
	const { slug } = useParams()
	const [products, setProducts] = useState([slug])
	useEffect(() => {
		async function fetchProduct() {
			try {
				const result = await axios.get(`/api/category/${slug}`)
				setProducts(result.data.data)
			} catch (err) {
				console.log(err)
			}
		}
		fetchProduct()
	}, [slug])
	return (
		<div className="w-full flex flex-col px-4 pt-24 dark:text-white transition duration-700 space-y-4">
			<div className="py-2 border border-gray-200 rounded-sm flex justify-end px-5">
				<div>Giá</div>
				<div>Mới nhất</div>
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
				{products.length > 0 ? (
					products.map((product, index) => (
						<Link
							to={`/product/${product.slug}`}
							key={index}
							className="flex flex-col h-96 rounded-sm shadow-md p-3 space-y-2"
						>
							<div className="h-5/6 flex items-center justify-center overflow-hidden rounded-md">
								<img
									src="https://storage.googleapis.com/cdn.nhanh.vn/store/7136/ps/20210202/216202141650_IMG_1712.jpg"
									alt=""
									className="h-full object-contain transform hover:scale-110 duration-300"
								/>
							</div>
							<h1 className="text-base font-semibold truncate">
								{product.title}
							</h1>
							<p className="text-sm cursor-auto">{product.price} vnđ</p>
						</Link>
					))
				) : (
					<p>Không có sản phẩm nào</p>
				)}
			</div>
		</div>
	)
}

export default Category
