import React, { useEffect, useState } from 'react'
import productAPI from '../../../api/productAPI'
import SlideProducts from './SlideProducts'
import SlideShow from './SlideShow'
import Seo from '../../../utils/Seo'
import sliderAPI from '../../../api/sliderAPI'
const Home = () => {
	const [newProducts, setNewProducts] = useState([])
	const [hotProducts, setHotProducts] = useState([])

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

		const fetchHotProducts = async () => {
			try {
				const params = {
					_limit: 9,
					sort: '-sold',
				}
				const result = await productAPI.getAll(params)
				if (result.status === 'Success') {
					setHotProducts(result.data)
				}
			} catch (error) {
				alert(error.message)
			}
		}
		fetchHotProducts()
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
			<Seo title="L1RF STORE" />
			<section className="h-screen -mt-16 pt-16">
				{/* slide show */}
				<SlideShow sliderData={sliderData} button={true} dots={true} />
			</section>
			{/* Banner hello */}

			<section className="bg-white dark:bg-darkBgColor flex items-center justify-center transition-all my-5 pt-5">
				<div className="text-gray-900 font-maven flex flex-col justify-center items-center space-y-6 font-black dark:text-white">
					<p className="text-center text-lg lg:text-5xl">Xin ch??o</p>
					<span className="lg:text-2xl">Ch??o m???ng b???n ?????n v???i l1rf store</span>

					<span className="text-center lg:text-lg">
						Shop b??n h??ng ?????u h??ng Vi???t Nam v???i ??a d???ng ng??nh h??ng, ?????y ????? m???u
						m?? cho b???n tho???i s???c l???a ch???n
					</span>
				</div>
			</section>

			{/* SLide Show new products */}
			<SlideProducts
				title="C??c s???n ph???m m???i"
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

			<SlideProducts
				title="S???n ph???m b??n ch???y"
				newProducts={hotProducts}
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
		</div>
	)
}

export default Home
