import React, { useEffect, useState } from 'react'
import productAPI from '../../../api/productAPI'
import SlideProducts from './SlideProducts'
import SlideShow from './SlideShow'
import { Helmet } from 'react-helmet-async'
import sliderAPI from '../../../api/sliderAPI'

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

	const [sliderData, setSliderData] = useState([])
	useEffect(() => {
		const fetchSlide = async () => {
			const result = await sliderAPI.get()
			setSliderData([
				...result.sliders.filter((slide) => slide.activate === true),
			])
		}
		fetchSlide()
	}, [])

	const [windowSize, setWindowSize] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setWindowSize(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	})

	return (
		<div className="flex flex-col">
			<Helmet>
				<title>l1rf shop</title>
			</Helmet>
			<section className="h-screen -mt-16 pt-16">
				{/* slide show */}
				<SlideShow sliderData={sliderData} button={true} dots={true} />
			</section>
			{/* Banner hello */}

			<section className="h-32 md:h-56 bg-white dark:bg-darkBgColor flex items-center justify-center transition-all my-5">
				<div className="text-gray-900 font-maven flex flex-col justify-center items-center space-y-6 font-black dark:text-white">
					<p className="text-center text-lg lg:text-5xl">Xin chào</p>
					<span className="lg:text-2xl">Chào mừng bạn đến với l1rf store</span>

					<span className="text-center lg:text-lg">
						Shop bán hàng đầu hàng Việt Nam với đa dạng ngành hàng, đầy đủ mẫu
						mã cho bạn thoải sức lựa chọn
					</span>
				</div>
			</section>

			{/* SLide Show new products */}
			<SlideProducts
				title="Các sản phẩm mới"
				newProducts={newProducts}
				show={
					windowSize >= 1280
						? 4
						: windowSize >= 1024
						? 3
						: windowSize >= 555
						? 2
						: 1
				}
			/>
			<section className="lg:h-36 bg-white dark:bg-darkBgColor flex items-center justify-center transition-all my-5 px-5 lg:px-0">
				<code className="text-xl max-w-screen-lg leading-10 bg-gray-100 p-4 bg-opacity-60">
					Giá trị là cái bạn đã xây dựng trước khi bán hàng và trong suốt quá
					trình hợp tác. Bạn không tăng thêm giá trị mà chỉ khẳng định giá trị.
				</code>
			</section>
		</div>
	)
}

export default Home
