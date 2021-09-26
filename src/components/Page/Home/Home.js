import React, { useEffect, useState } from 'react'
import productAPI from '../../../api/productAPI'
const Home = () => {
	const [newProducts, setNewProducts] = useState([])
	const [activeSlide, setActiveSlide] = useState(0)

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
	const sliderData = [
		{
			image:
				'https://media.gq.com/photos/6137a6599ea62dbe4a6ea9c6/master/pass/casual-pants.jpg',
		},
		{
			image:
				'https://stylesatlife.com/wp-content/uploads/2018/05/15-Best-Checks-Shirts-for-Mens-New-Fashion-2019-1.jpg.webp',
		},
		{
			image:
				'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/weekendbags-1624468650.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
		},
		{
			image:
				'https://eslforums.com/wp-content/uploads/2019/05/FASHION-ACCESSORIES-2.jpg',
		},
	]

	useEffect(() => {
		const interval = setInterval(() => {
			if (activeSlide < sliderData.length - 1) {
				setActiveSlide(activeSlide + 1)
			} else {
				setActiveSlide(0)
			}
		}, 5000)
		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	})

	return (
		<div className="flex flex-col">
			<section className="h-screen -mt-16 pt-16 relative overflow-hidden">
				{sliderData.map((slide, index) => (
					<div
						key={index}
						style={{ transition: '.9s ease-in-out' }}
						className={`h-screen w-full absolute ${
							index === activeSlide ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<img
							src={slide.image}
							alt=""
							className="w-full h-full object-cover"
						/>
					</div>
				))}
				<div className="absolute bottom-10 w-full">
					<div className="mx-auto w-max h-6 space-x-3 z-10 flex items-center px-3 bg-white rounded-full shadow-lg bg-opacity-70">
						{sliderData.map((slide, index) => (
							<button
								key={index}
								onClick={() => setActiveSlide(index)}
								className={` ${
									index === activeSlide ? 'w-16 bg-gray-600' : 'w-7 bg-gray-300'
								} h-3 rounded-full transition-all duration-500`}
							/>
						))}
					</div>
				</div>

				<button
					onClick={() => {
						if (activeSlide === 0) {
							setActiveSlide(sliderData.length - 1)
						} else {
							setActiveSlide(activeSlide - 1)
						}
					}}
					className="outline-none focus:outline-none focus:shadow-outline absolute top-1/2 left-5 p-4 rounded-full hover:shadow-lg hover:bg-white transition-all dark:hover:bg-black dark:text-white duration-500"
				>
					<svg
						className="w-7 h-7"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					onClick={() => {
						if (activeSlide < sliderData.length - 1) {
							setActiveSlide(activeSlide + 1)
						} else {
							setActiveSlide(0)
						}
					}}
					className="outline-none focus:outline-none focus:shadow-outline absolute top-1/2 right-5 p-4 rounded-full hover:shadow-lg hover:bg-white transition-all dark:hover:bg-black dark:text-white duration-500"
				>
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
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</section>
			<section
				style={{ clipPath: 'polygon(0 20%, 100% 0, 100% 80%, 0% 100%)' }}
				className="flex flex-col h-32 lg:h-72 items-center justify-center bg-green-300 dark:bg-green-600 my-10"
			>
				<div className="text-white font-maven font-black">
					<p className="text-center mb-3 text-lg lg:text-5xl">Xin chào</p>
					<span className="lg:text-xl">Chào mừng bạn đến với l1rf store</span>
				</div>
			</section>
			<section className="lg:px-10">
				<div className="flex flex-col md:flex-row md:gap-5">
					<div className="w-full md:w-1/2 h-screen md:h-70v shadow-lg rounded-xl overflow-hidden border flex items-center">
						<div className="w-1/2">
							<img
								src="https://bizweb.dktcdn.net/thumb/1024x1024/100/331/067/products/87172077-490828845140490-813408978422726656-n.jpg"
								alt=""
							/>
						</div>
						<div className="w-1/2">
							<p>Quẩn jean rách gói</p>
						</div>
					</div>
					<div className="w-full md:w-1/2 h-screen md:h-70v shadow-lg rounded-xl overflow-hidden border flex items-center">
						<div className="w-1/2">
							<img
								src="https://bizweb.dktcdn.net/thumb/1024x1024/100/331/067/products/87172077-490828845140490-813408978422726656-n.jpg"
								alt=""
							/>
						</div>
						<div className="w-1/2">
							<p>Quẩn jean rách gói</p>
						</div>
					</div>
				</div>
			</section>
			<section className="h-screen lg:px-10 my-10 overflow-hidden">
				<div className="flex justify-between items-center h-16">
					<p className="text-xl">Các sản phẩm mới</p>
					<div className="flex space-x-5">
						<button className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md outline-none focus:outline-none focus:shadow-outline">
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
						<button className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md outline-none focus:outline-none focus:shadow-outline">
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
				<div className="flex max-h-screen transition-all duration-700 -translate-x-full transform">
					<div
						style={{ minWidth: '25%' }}
						className="w-1/4 flex flex-col border transition-all duration-700"
					>
						<img
							src="https://zunezx.com/upload/image/data/san-pham/bottoms/pants/kuro-pant/KURO-PANT-1-8c9.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="px-1">
							<p>Quần jean rách gói</p>
							<span>1,000,000 vnđ</span>
						</div>
					</div>
					<div
						style={{ minWidth: '25%' }}
						className="w-1/4 flex flex-col border transition-all duration-700"
					>
						<img
							src="https://zunezx.com/upload/image/data/san-pham/bottoms/pants/kuro-pant/KURO-PANT-1-8c9.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="px-1">
							<p>Quần jean rách gói</p>
							<span>2,000,000 vnđ</span>
						</div>
					</div>
					<div
						style={{ minWidth: '25%' }}
						className="w-1/4 flex flex-col border transition-all duration-700"
					>
						<img
							src="https://zunezx.com/upload/image/data/san-pham/bottoms/pants/kuro-pant/KURO-PANT-1-8c9.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="px-1">
							<p>Quần jean rách gói</p>
							<span>3,000,000 vnđ</span>
						</div>
					</div>
					<div
						style={{ minWidth: '25%' }}
						className="w-1/4 flex flex-col border transition-all duration-700"
					>
						<img
							src="https://zunezx.com/upload/image/data/san-pham/bottoms/pants/kuro-pant/KURO-PANT-1-8c9.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="px-1">
							<p>Quần jean rách gói</p>
							<span>4,000,000 vnđ</span>
						</div>
					</div>
					<div
						style={{ minWidth: '25%' }}
						className="w-1/4 flex flex-col border transition-all duration-700"
					>
						<img
							src="https://zunezx.com/upload/image/data/san-pham/bottoms/pants/kuro-pant/KURO-PANT-1-8c9.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="px-1">
							<p>Quần jean rách gói</p>
							<span>5,000,000 vnđ</span>
						</div>
					</div>
					<div
						style={{ minWidth: '25%' }}
						className="w-1/4 flex flex-col border transition-all duration-700"
					>
						<img
							src="https://zunezx.com/upload/image/data/san-pham/bottoms/pants/kuro-pant/KURO-PANT-1-8c9.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="px-1">
							<p>Quần jean rách gói</p>
							<span>6,000,000 vnđ</span>
						</div>
					</div>
					<div
						style={{ minWidth: '25%' }}
						className="w-1/4 flex flex-col border transition-all duration-700"
					>
						<img
							src="https://zunezx.com/upload/image/data/san-pham/bottoms/pants/kuro-pant/KURO-PANT-1-8c9.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="px-1">
							<p>Quần jean rách gói</p>
							<span>7,000,000 vnđ</span>
						</div>
					</div>
					<div
						style={{ minWidth: '25%' }}
						className="w-1/4 flex flex-col border transition-all duration-700"
					>
						<img
							src="https://zunezx.com/upload/image/data/san-pham/bottoms/pants/kuro-pant/KURO-PANT-1-8c9.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="px-1">
							<p>Quần jean rách gói</p>
							<span>8,000,000 vnđ</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Home
