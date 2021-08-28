import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CategoryAdmin = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		async function fetchProduct() {
			try {
				const result = await axios.get(`/api/product`)

				setProducts(result.data.data)
			} catch (err) {
				// if (err) return setFail(true)
				console.log(err)
			}
		}
		fetchProduct()
	}, [])
	return (
		<div className="mt-10 lg:mt-0 lg:ml-56 p-3 flex flex-col space-y-4">
			<div>phần lọc</div>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
				{products.map((product, index) => (
					<div
						key={index}
						className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
					>
						<input type="checkbox" className="w-4 h-4 absolute top-1 right-1" />
						<div>
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
								<div className="flex p-1 justify-center item-center space-x-3">
									<button className="bg-yellow-400 w-20 rounded-md font-medium text-white">
										Sửa
									</button>
									<button className="bg-red-400 w-20 rounded-md font-medium text-white">
										Xóa
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
				{products.map((product, index) => (
					<div
						key={index}
						className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
					>
						<input type="checkbox" className="w-4 h-4 absolute top-1 right-1" />
						<div>
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
								<div className="flex p-1 justify-center item-center space-x-3">
									<button className="bg-yellow-400 w-20 rounded-md font-medium text-white">
										Sửa
									</button>
									<button className="bg-red-400 w-20 rounded-md font-medium text-white">
										Xóa
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
				{products.map((product, index) => (
					<div
						key={index}
						className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
					>
						<input type="checkbox" className="w-4 h-4 absolute top-1 right-1" />
						<div>
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
								<div className="flex p-1 justify-center item-center space-x-3">
									<button className="bg-yellow-400 w-20 rounded-md font-medium text-white">
										Sửa
									</button>
									<button className="bg-red-400 w-20 rounded-md font-medium text-white">
										Xóa
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
				{products.map((product, index) => (
					<div
						key={index}
						className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
					>
						<input type="checkbox" className="w-4 h-4 absolute top-1 right-1" />
						<div>
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
								<div className="flex p-1 justify-center item-center space-x-3">
									<button className="bg-yellow-400 w-20 rounded-md font-medium text-white">
										Sửa
									</button>
									<button className="bg-red-400 w-20 rounded-md font-medium text-white">
										Xóa
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
				{products.map((product, index) => (
					<div
						key={index}
						className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
					>
						<input type="checkbox" className="w-4 h-4 absolute top-1 right-1" />
						<div>
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
								<div className="flex p-1 justify-center item-center space-x-3">
									<button className="bg-yellow-400 w-20 rounded-md font-medium text-white">
										Sửa
									</button>
									<button className="bg-red-400 w-20 rounded-md font-medium text-white">
										Xóa
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
				{products.map((product, index) => (
					<div
						key={index}
						className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
					>
						<input type="checkbox" className="w-4 h-4 absolute top-1 right-1" />
						<div>
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
								<div className="flex p-1 justify-center item-center space-x-3">
									<button className="bg-yellow-400 w-20 rounded-md font-medium text-white">
										Sửa
									</button>
									<button className="bg-red-400 w-20 rounded-md font-medium text-white">
										Xóa
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
				{products.map((product, index) => (
					<div
						key={index}
						className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
					>
						<input type="checkbox" className="w-4 h-4 absolute top-1 right-1" />
						<div>
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
								<div className="flex p-1 justify-center item-center space-x-3">
									<button className="bg-yellow-400 w-20 rounded-md font-medium text-white">
										Sửa
									</button>
									<button className="bg-red-400 w-20 rounded-md font-medium text-white">
										Xóa
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
