import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import Error from '../Error/Error'
import NotFoundImage from './image-not-found.jpg'
import productAPI from '../../../api/productAPI'
import '../../../css/unreset.css'
import { Helmet } from 'react-helmet'
import Skeleton from 'react-loading-skeleton'

import Modal from '../../../utils/Modal/Modal'
import useModal from '../../../utils/Modal/useModal'
const Detail = () => {
	const { addToCart } = useContext(GlobalState)
	const [count, setCount] = useState(1)
	const [load, setLoad] = useState(true)
	const [fail, setFail] = useState(false)
	const { slug } = useParams()
	const [product, setProduct] = useState([])

	const [awaitAdd, setAwaitAdd] = useState(false)

	const { isShowing, toggle } = useModal()

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

	useEffect(() => {
		isShowing
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'scroll')
	}, [isShowing])

	const addToCartBtn = async () => {
		if (product.inStock === 0) return
		product.quantity = count
		const check = await addToCart(product)
		if (check) {
			setAwaitAdd(true)
			const timeOut = setTimeout(() => setAwaitAdd(false), 900)
			return () => clearTimeout(timeOut)
		} else {
			toggle()
		}
	}
	if (fail) return <Error />
	return (
		<section className="bg-transparent transition duration-700 dark:text-white py-2">
			<Helmet>
				<title>{product?.title}</title>
				<meta
					name="description"
					content={`${product?.title} một sản phẩm của L1rf Store`}
				/>
				<meta
					name="og:description"
					content={`${product?.title} một sản phẩm của L1rf Store`}
				/>
				<meta name="og:title" content={product?.title} />
				<meta
					property="og:image"
					content={imageMain ? imageMain : NotFoundImage}
				></meta>
				<meta
					property="image"
					content={imageMain ? imageMain : NotFoundImage}
				></meta>
			</Helmet>
			<div className="flex flex-col max-w-screen-lg mx-auto px-2 xs:px-5">
				<div className="flex flex-wrap">
					<div className="w-full sm:w-8/12 sm:mx-auto md:w-6/12 rounded-lg overflow-hidden">
						{load ? (
							<div className="w-full h-96 xs:h-542px">
								<Skeleton height="100%" />
							</div>
						) : (
							<div className="w-full h-96 xs:h-542px">
								<img
									src={imageMain ? imageMain : NotFoundImage}
									srcSet={imageMain ? imageMain : NotFoundImage}
									alt=""
									className="w-full h-full object-cover"
								/>
							</div>
						)}
					</div>
					<div className="flex flex-col w-full md:w-6/12 md:pl-4 font-maven">
						<h1
							title={product.title}
							className="text-lg font-bold font-maven uppercase md:text-xl mt-4 md:mt-0 md:mb-3"
						>
							<span className="text-sm font-light">/ {product.category} /</span>
							<br />
							{load ? <Skeleton height={30} /> : product.title}
						</h1>

						<span>
							{load ? (
								<Skeleton count={3} height={20} width="80%" />
							) : (
								product.description
							)}
						</span>
						<p className="text-base font-medium mt-8">
							{load ? (
								<Skeleton height={20} />
							) : (
								'Giá: ' + price.toLocaleString('en') + ' vnđ'
							)}
						</p>
						<div className="flex order-first items-center justify-center space-x-2 md:order-none md:justify-start mt-4 md:mt-10">
							{load ? (
								<>
									<Skeleton width={56} height={56} />
									<Skeleton width={56} height={56} />
									<Skeleton width={56} height={56} />
									<Skeleton width={56} height={56} />
								</>
							) : (
								images.length > 1 &&
								images.map((item, index) => (
									<div
										onClick={() => setImageMain(item.url)}
										className="h-14 w-14 cursor-pointer border border-gray-200 rounded overflow-hidden"
										key={index}
									>
										<img
											src={item.url}
											srcSet={item.url}
											alt=""
											className="object-cover w-full h-full"
										/>
									</div>
								))
							)}
						</div>
						<div className="flex items-center space-x-4 mt-6">
							<span>Số lượng</span>
							<div className="flex bg-gray-100 dark:text-gray-800 rounded items-center overflow-hidden">
								<button
									onClick={() => setCount(count > 1 ? count - 1 : count)}
									className="p-1 px-2 hover:bg-gray-200"
								>
									<span>-</span>
								</button>
								<input
									type="number"
									id="quantity"
									className="w-10 text-center text-base bg-transparent focus:outline-none focus:shadow-outline"
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

						<div className="flex mt-4">
							<div className="flex justify-center w-44">
								<button
									onClick={() => {
										!awaitAdd && addToCartBtn()
									}}
									className={`${
										awaitAdd
											? 'w-10 h-10 text-green-400 bg-gray-100 rounded-full'
											: 'h-10 w-44 text-gray-900 bg-gray-100 rounded'
									} flex items-center justify-center  font-semibold hover:border-gray-300 transition-all overflow-hidden border border-gray-200`}
								>
									{awaitAdd ? (
										<svg
											className="w-6 h-6"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									) : (
										<span className="flex-shrink-0 flex-grow">
											{product.inStock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
										</span>
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
				{load ? (
					<div className="unreset pt-2 pb-10 w-full mt-10">
						<Skeleton />
						<Skeleton width="60%" />
					</div>
				) : (
					<div
						className="unreset pt-2 pb-10 w-full mt-10 font-maven"
						dangerouslySetInnerHTML={{ __html: product.content }}
					/>
				)}
				<Modal
					isShowing={isShowing}
					hide={toggle}
					text="Vui lòng đăng nhập"
					type="alert"
				/>
			</div>
		</section>
	)
}

export default Detail
