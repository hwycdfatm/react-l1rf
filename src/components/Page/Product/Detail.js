import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../../utils/Loading'
import { GlobalSate } from '../../../GlobalState'

const Detail = () => {
	const state = useContext(GlobalSate)
	const [count, setCount] = useState(1)
	const [load, setLoad] = useState(true)
	const { slug } = useParams()
	const [product, setProduct] = useState([slug])
	const addToCart = state.userAPI.addToCart
	useEffect(() => {
		async function fetchProduct() {
			try {
				const result = await axios.get(`/api/product/${slug}`)
				setLoad(false)
				setProduct(result.data.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchProduct()
	}, [slug])
	return (
		<>
			<div className="pt-20 flex flex-col bg-white dark:bg-gray-700 transition duration-700 dark:text-white">
				<div className="flex flex-col p-1 w-full max-w-screen-lg mx-auto overflow-hidden md:flex-row md:space-x-4">
					<div className="w-full h-96 md:w-1/2 rounded overflow-hidden flex items-center justify-center md:h-70v">
						<img src="" alt="" className="w-full h-full object-contain" />
					</div>
					<div className="w-full flex flex-col px-5 space-y-4 text-sm md:text-base md:w-1/2">
						<h1
							title="Quần jean rách gối ultimate vjp pr0 m1"
							className="text-xl font-semibold mt-4 md:text-2xl md:mt-0"
						>
							{product.title}
						</h1>
						<span>{product.description}</span>
						<p className="font-medium mt-8">{product.price} vnđ</p>
						<div className="flex order-first items-center justify-center space-x-2 md:order-none md:justify-start">
							<div
								className="h-14 w-14 cursor-pointer border border-gray-200 rounded overflow-hidden"
								key=""
							>
								<img src="" alt="" className="object-cover w-full h-full" />
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<span>Số lượng</span>
							<div className="flex bg-gray-100 rounded items-center overflow-hidden">
								<button
									onClick={() => setCount(count > 1 ? count - 1 : count)}
									className="p-1 px-2 hover:bg-gray-200"
								>
									<span>-</span>
								</button>
								<input
									type="number"
									id="quantity"
									className="w-12 text-center bg-transparent focus:outline-none focus:shadow-outline"
									value={count}
									onChange={(e) =>
										setCount(e.target.value > 100 ? 100 : +e.target.value)
									}
									min="1"
								/>
								<button
									onClick={() => setCount(count + 1)}
									className="p-1 px-2 hover:bg-gray-200"
								>
									<span>+</span>
								</button>
							</div>
						</div>
						<div className="flex flex-row space-x-4 text-base">
							<button className="px-4 py-2 bg-gray-900 rounded font-semibold text-white">
								Mua
							</button>
							<button
								onClick={() => {
									product.quantity = count
									addToCart(product)
								}}
								className="px-4 py-2 text-gray-900 bg-gray-100 rounded font-semibold "
							>
								Thêm vào giỏ hàng
							</button>
						</div>
					</div>
				</div>
				<div className="flex flex-row mt-10  slider relative">
					{product.content}
				</div>
			</div>
			{load && <Loading />}
		</>
	)
}

export default Detail
