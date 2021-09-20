import React, { useState, useEffect, useContext } from 'react'
import productAPI from '../../api/productAPI'
import { GlobalState } from '../../GlobalState'
const CategoryAdmin = () => {
	const { token } = useContext(GlobalState)
	const [productList, setProductList] = useState([])

	useEffect(() => {
		async function fetchProduct() {
			try {
				const result = await productAPI.getTrash({}, token)
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
		<div className="mt-10 lg:mt-0 lg:ml-56 p-3 flex flex-col space-y-4 relative">
			<div>phần lọc</div>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				{productList.map((product, index) => (
					<div
						key={index}
						className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
					>
						<input type="checkbox" className="w-4 h-4 absolute top-1 right-1" />
						<div className="bg-white">
							<img
								src={product.images[0].url}
								alt={product.title}
								className="w-full object-cover h-48"
							/>
							<div className="flex flex-col space-y-1 py-1 px-2">
								<span className="text-sm font-semibold truncate">
									{product.title}
								</span>
								<span className="text-xs font-semibold ">{product.price}</span>
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
				))}
			</div>
		</div>
	)
}

export default CategoryAdmin
