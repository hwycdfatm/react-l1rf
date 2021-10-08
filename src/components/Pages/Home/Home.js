import React, { useEffect, useState } from 'react'
import productAPI from '../../../api/productAPI'
import SlideProducts from './SlideProducts'
import SlideShow from './SlideShow'

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
			{/* slide show */}
			<SlideShow />
			{/* Banner hello */}
			<section
				style={{ clipPath: 'polygon(0 40%, 100% 0, 100% 60%, 0% 100%)' }}
				className="flex flex-col h-screen md:h-70v items-center justify-center bg-green-300 dark:bg-green-600 my-10"
			>
				<div className="text-white font-maven font-black">
					<p className="text-center mb-3 text-lg lg:text-5xl">Xin chào</p>
					<span className="lg:text-xl">Chào mừng bạn đến với l1rf store</span>
				</div>
			</section>

			{/* SLide Show new products */}
			<SlideProducts
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
		</div>
	)
}

export default Home
