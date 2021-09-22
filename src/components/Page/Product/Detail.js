import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../../utils/Loading'
import { GlobalState } from '../../../GlobalState'
import Error from '../Error/Error'
import NotFoundImage from './image-not-found.jpg'
import productAPI from '../../../api/productAPI'
import '../../../css/unreset.css'
const Detail = () => {
	const { addToCart } = useContext(GlobalState)
	const [count, setCount] = useState(1)
	const [load, setLoad] = useState(true)
	const [fail, setFail] = useState(false)
	const { slug } = useParams()
	const [product, setProduct] = useState([])

	const images = product.images || []
	// Image
	const [imageMain, setImageMain] = useState('')

	const price = parseInt(product.price)

	useEffect(() => {
		async function fetchProduct() {
			try {
				const result = await productAPI.getBySlug(slug)
				setLoad(false)
				if (result.status === 'Success') {
					setProduct(result.data)
					if (result.data.images[0]) {
						setImageMain(result.data.images[0].url)
					}
				}
			} catch (error) {
				if (error) return setFail(true)
			}
		}
		fetchProduct()
	}, [slug])
	if (fail) return <Error />
	return (
		<>
			<section className="flex flex-col mx-auto bg-transparent transition duration-700 dark:text-white">
				<div className="mt-4 flex flex-col w-full mx-auto md:flex-row md:space-x-4">
					<div className="w-full h-96 md:w-1/2 rounded-lg overflow-hidden flex items-center justify-center md:h-542px lg:w-lg">
						<img
							src={imageMain ? imageMain : NotFoundImage}
							alt=""
							className="w-full h-full object-contain"
						/>
					</div>
					<div className="w-full flex flex-col space-y-6 px-4 md:px-0 text-sm md:text-base md:w-1/2 lg:w-lg  rounded-lg lg:pl-4">
						<h1
							title="Quần jean rách gối ultimate vjp pr0 m1"
							className="text-lg font-bold font-maven uppercase mt-4 md:text-xl md:mt-0"
						>
							{product.title}
						</h1>
						<span>{product.description}</span>
						<p className="text-base font-medium mt-8">
							{price.toLocaleString('en')} vnđ
						</p>
						<div className="flex order-first items-center justify-center space-x-2 md:order-none md:justify-start">
							{images.length > 1 &&
								images.map((item, index) => (
									<div
										onClick={() => setImageMain(item.url)}
										className="h-14 w-14 cursor-pointer border border-gray-200 rounded overflow-hidden"
										key={index}
									>
										<img
											src={item.url}
											alt=""
											className="object-cover w-full h-full"
										/>
									</div>
								))}
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
									className="w-10 text-center bg-transparent focus:outline-none focus:shadow-outline"
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

						<div className="flex text-base">
							<button
								onClick={() => {
									product.quantity = count
									addToCart(product)
								}}
								className="px-4 py-2 text-gray-900 bg-gray-100 rounded font-semibold hover:bg-gray-500 transition-all border border-gray-200"
							>
								Thêm vào giỏ hàng
							</button>
						</div>
					</div>
				</div>
				<div
					className="unreset px-4 py-3 mt-10"
					dangerouslySetInnerHTML={{ __html: product.content }}
				/>
			</section>
			{load && <Loading />}
		</>
	)
}

export default Detail
