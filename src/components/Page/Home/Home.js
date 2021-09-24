import React, { useEffect, useState } from 'react'
import productAPI from '../../../api/productAPI'
const Home = () => {
	const [newProducts, setNewProducts] = useState([])

	useEffect(() => {
		const fetchNewProducts = async () => {
			try {
				const params = {
					_limit: 9,
				}
				const result = await productAPI.getAll(params)
				if (result.status === 'Success') {
					setNewProducts(result.data)
				}
			} catch (error) {
				alert(error.message)
			}
		}
		fetchNewProducts()
	}, [])
	return (
		<div className="w-full px-3 mx-auto max-w-screen-xl xl:px-0 flex flex-col dark:text-white transition duration-500">
			<section className="my-3">
				<div className="w-full lg:h-80v bg-yellow-200 rounded-xl">Slider</div>
			</section>
			<section className="my-3 flex flex-wrap">
				<div className="w-full md:w-1/4 px-3 py-3 h-32">
					<div className="p-3 bg-yellow-200 rounded-xl h-full">
						Banner quảng cáo
					</div>
				</div>
				<div className="w-full md:w-1/4 px-3 py-3 h-32">
					<div className="p-3 bg-yellow-200 rounded-xl h-full">
						Banner quảng cáo
					</div>
				</div>
				<div className="w-full md:w-1/4 px-3 py-3 h-32">
					<div className="p-3 bg-yellow-200 rounded-xl h-full">
						Banner quảng cáo
					</div>
				</div>
				<div className="w-full md:w-1/4 px-3 py-3 h-32">
					<div className="p-3 bg-yellow-200 rounded-xl h-full">
						Banner quảng cáo
					</div>
				</div>
			</section>
			<section className="my-3 flex flex-col">
				<div className="flex justify-between py-3">
					<h5 className="font-maven">Sản phẩm mới</h5>
					<div className="flex items-center font-maven hover:text-red-300 space-x-2 ">
						<button className="hover:underline">Xem tất cả</button>
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
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</div>
				</div>
				<div className="flex overflow-x-scroll scrollbar px-3">
					{newProducts &&
						newProducts.map((product) => (
							<div
								className="w-44 bg-white mr-4"
								key={product._id}
								style={{ minWidth: '175px' }}
							>
								<div className="h-44">
									<img src={product.images[0].url} alt="" />
								</div>
								<div className="pb-2 space-y-2">
									<p className="font-mavenl">{product.title}</p>
									<p className="font-maven text-sm">
										{parseInt(product.price).toLocaleString('en')} vnđ
									</p>
								</div>
							</div>
						))}
				</div>
			</section>
			<section className="my-3 flex flex-col">
				<div className="flex justify-between py-3">
					<h5 className="font-maven">Sản bán chạy</h5>
					<div className="flex items-center font-maven hover:text-red-300 space-x-2 ">
						<button className="hover:underline">Xem tất cả</button>
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
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</div>
				</div>
				<div className="flex overflow-x-scroll scrollbar px-3">
					{newProducts &&
						newProducts.map((product) => (
							<div
								className="w-44 bg-white mr-4"
								key={product._id}
								style={{ minWidth: '175px' }}
							>
								<div className="h-44">
									<img src={product.images[0].url} alt="" />
								</div>
								<div className="pb-2 space-y-2">
									<p className="font-mavenl">{product.title}</p>
									<p className="font-maven text-sm">
										{parseInt(product.price).toLocaleString('en')} vnđ
									</p>
								</div>
							</div>
						))}
				</div>
			</section>
		</div>
	)
}

export default Home
