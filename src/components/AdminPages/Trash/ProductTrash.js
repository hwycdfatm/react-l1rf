import React, { useState, useEffect, useContext } from 'react'
import productAPI from '../../../api/productAPI'
import { GlobalState } from '../../../GlobalState'
const ProductTrash = () => {
	const { token } = useContext(GlobalState)
	const [productList, setProductList] = useState([])

	useEffect(() => {
		async function fetchProduct() {
			try {
				const params = {
					_limit: 10000,
				}
				const result = await productAPI.getTrash(params, token)
				if (result.status === 'Success') {
					setProductList(result.data)
				}
			} catch (err) {
				console.log(err)
			}
		}
		fetchProduct()
	}, [token])

	const handleRestore = async (id) => {
		try {
			await productAPI.restore(id, token)
			setProductList([...productList.filter((e) => e._id !== id)])
		} catch (err) {
			console.log(err)
		}
	}
	const handleDelete = async (id) => {
		try {
			const msg = await productAPI.deletedForce(id, token)
			console.log(msg)
			setProductList([...productList.filter((e) => e._id !== id)])
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="p-3 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
			{productList.length > 0 ? (
				productList.map((product, index) => (
					<div
						key={index}
						className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
					>
						<div className="bg-white">
							<img
								src={product.images[0].url}
								alt={product.title}
								className="w-full object-cover h-48"
							/>
							<div className="flex flex-col space-y-1 py-1 px-2">
								<span className="text-sm font-semibold truncate uppercase">
									{product.title}
								</span>
								<span className="text-xs">
									{parseInt(product.price).toLocaleString('en')} vnđ
								</span>
								<div className="flex p-1 text-sm justify-center item-center space-x-3">
									<button
										onClick={() => handleRestore(product._id)}
										className="bg-yellow-400 w-20 rounded-md p-1 font-medium text-white transform hover:-translate-y-1 transition-all"
									>
										Khôi phục
									</button>
									<button
										onClick={() => handleDelete(product._id)}
										className="bg-red-400 w-20 rounded-md p-1 font-medium text-white transform hover:-translate-y-1 transition-all"
									>
										Xóa luôn
									</button>
								</div>
							</div>
						</div>
					</div>
				))
			) : (
				<p>Trống</p>
			)}
		</div>
	)
}

export default ProductTrash
