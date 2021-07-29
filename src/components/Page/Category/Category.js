import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Product from '../Product/Product'
import Loading from '../../../utils/Loading'

const Filter = () => {
	return (
		<div className="rounded-sm flex items-center ">
			<div className="relative text-gray-600">
				<input
					className="w-36 border-2 border-gray-300 bg-white h-10 px-2 pr-6 rounded-lg text-sm focus:outline-none appearance-none"
					type="search"
					name="search"
					placeholder="Search"
				/>
				<button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
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
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
			<div>
				<select
					name=""
					id=""
					className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none appearance-none"
				>
					<option value="">Giá</option>
				</select>
			</div>
			<div>
				<select
					name=""
					id=""
					className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none appearance-none"
				>
					<option value="">Mơi</option>
				</select>
			</div>
		</div>
	)
}

const Category = () => {
	const { slug } = useParams()
	const [products, setProducts] = useState([slug])
	const [load, setLoad] = useState(true)

	useEffect(() => {
		async function fetchProduct() {
			try {
				const result = await axios.get(`/api/product?category=${slug}`)
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
				<Filter />
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{products.map((product, index) => (
						<Product sp={product} key={index} />
					))}
					{products.length === 0 && <div>Trống</div>}
				</div>

				<div className="flex flex-col items-center my-12">
					<div className="flex text-gray-700">
						<div className="h-8 w-8 mr-1 flex justify-center items-center  cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100%"
								height="100%"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-chevron-left w-4 h-4"
							>
								<polyline points="15 18 9 12 15 6"></polyline>
							</svg>
						</div>
						<div className="flex h-8 font-medium ">
							<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
								1
							</div>
							<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-orange-600  ">
								2
							</div>
							<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
								3
							</div>
							<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
								...
							</div>
							<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
								13
							</div>
							<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
								14
							</div>
							<div className="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  border-t-2 border-transparent">
								15
							</div>
							<div className="w-8 h-8 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in border-t-2 border-orange-600">
								2
							</div>
						</div>
						<div className="h-8 w-8 ml-1 flex justify-center items-center  cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100%"
								height="100%"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-chevron-right w-4 h-4"
							>
								<polyline points="9 18 15 12 9 6"></polyline>
							</svg>
						</div>
					</div>
				</div>
			</div>
			{load && <Loading />}
		</>
	)
}

export default Category
