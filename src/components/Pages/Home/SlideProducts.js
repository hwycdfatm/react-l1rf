import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const SlideProducts = ({ newProducts, show }) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const [touchPosition, setTouchPosition] = useState(null)

	const handleTouchStart = (e) => {
		const touchDown = e.touches[0].clientX
		setTouchPosition(touchDown)
	}

	const handleTouchMove = (e) => {
		const touchDown = touchPosition

		if (touchDown === null) {
			return
		}
		const currentTouch = e.touches[0].clientX
		const diff = touchDown - currentTouch

		if (diff > 5) {
			next()
		}

		if (diff < -5) {
			prev()
		}

		setTouchPosition(null)
	}

	const next = () => {
		if (currentIndex < newProducts.length - show) {
			setCurrentIndex(currentIndex + 1)
		}
	}

	const prev = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1)
		}
	}

	return (
		<section className="px-2 h-screen lg:px-10 my-10">
			{/* btn next & prev */}
			<div className="flex justify-between items-center h-16">
				<p className="text-xl font-maven">Các sản phẩm mới</p>
				<div className="flex space-x-5">
					<button
						onClick={prev}
						className={`flex items-center justify-center ${
							!(currentIndex > 0) && 'opacity-30'
						} w-10 h-10 rounded-full bg-white shadow-md outline-none focus:outline-none focus:shadow-outline`}
					>
						<svg
							className="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
					<button
						onClick={next}
						className={`flex items-center justify-center w-10 h-10 rounded-full ${
							!(currentIndex < newProducts.length - show) && 'opacity-30'
						} bg-white shadow-md outline-none focus:outline-none focus:shadow-outline`}
					>
						<svg
							className="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				className="flex w-full overflow-hidden"
			>
				<div
					className="flex w-full transition-all duration-500"
					style={{
						transform: `translateX(-${currentIndex * (100 / show)}%)`,
					}}
				>
					{newProducts.map((product) => (
						<div
							key={product._id}
							className={`${
								show > 1 ? `w-1/${show}` : 'w-full'
							} flex flex-shrink-0 flex-grow h-96 px-2`}
						>
							<Link
								to={`/product/${product.slug}`}
								className="flex border flex-col-reverse w-full h-full"
							>
								<div className="px-1 font-maven">
									<p className="font-semibold">{product.title}</p>
									<span className="text-sm">
										{parseInt(product.price).toLocaleString('en')}vnđ
									</span>
								</div>
								<div className="flex-1">
									<img
										src={product.images[0]?.url}
										alt={product.title}
										className="w-full h-full object-cover"
									/>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default SlideProducts
