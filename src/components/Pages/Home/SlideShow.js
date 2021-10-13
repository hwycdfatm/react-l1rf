import React, { useState, useEffect } from 'react'
import sliderAPI from '../../../api/sliderAPI'

const SlideShow = ({ slideData }) => {
	const [activeSlide, setActiveSlide] = useState(0)
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
						src={slide.image.url}
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
				className="hidden md:flex outline-none focus:outline-none focus:shadow-outline absolute top-1/2 left-5 p-4 rounded-full hover:shadow-lg hover:bg-white transition-all dark:hover:bg-black dark:text-white duration-500"
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
				className="hidden md:flex outline-none focus:outline-none focus:shadow-outline absolute top-1/2 right-5 p-4 rounded-full hover:shadow-lg hover:bg-white transition-all dark:hover:bg-black dark:text-white duration-500"
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
	)
}

export default SlideShow
