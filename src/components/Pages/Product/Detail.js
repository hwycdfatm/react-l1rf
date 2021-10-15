import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import Error from '../Error/Error'
import NotFoundImage from './image-not-found.jpg'
import productAPI from '../../../api/productAPI'
import '../../../css/unreset.css'
import { Helmet } from 'react-helmet'
import Skeleton from 'react-loading-skeleton'
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
							<img
								src={imageMain ? imageMain : NotFoundImage}
								alt=""
								className="w-full h-full object-cover"
							/>
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
											alt=""
											className="object-cover w-full h-full"
										/>
									</div>
								))
							)}
						</div>
						<div className="flex items-center space-x-4 mt-6">
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

						<div className="flex text-base mt-4">
							<button
								onClick={() => {
									product.quantity = count
									addToCart(product)
								}}
								className="px-4 py-2 text-gray-900 bg-gray-100 rounded font-semibold hover:bg-gray-400 transition-all border border-gray-200"
							>
								Thêm vào giỏ hàng
							</button>
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
			</div>
		</section>
	)
}

export default Detail
