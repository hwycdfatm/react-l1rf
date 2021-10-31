import React, { useState, useEffect, useRef } from 'react'

const SlideShow = ({ sliderData, button, dots, children }) => {
	const [activeSlide, setActiveSlide] = useState(0)

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

	const [touchPosition, setTouchPosition] = useState(null)

	const slideRef = useRef(null)

	const handleTouchStart = (e) => {
		const touchDown = e.touches[0].clientX

		setTouchPosition(touchDown)
	}

	const handleTouchEnd = () => {
		document.body.style.overflow = 'scroll'
	}

	const handleTouchMove = (e) => {
		const touchDown = touchPosition

		if (touchDown === null) {
			return
		}

		const currentTouch = e.touches[0].clientX

		const diff = touchDown - currentTouch

		if (diff > 10) {
			document.body.style.overflow = 'hidden'
			if (activeSlide === 0) {
				setActiveSlide(sliderData.length - 1)
			} else {
				setActiveSlide(activeSlide - 1)
			}
		}

		if (diff < -10) {
			document.body.style.overflow = 'hidden'
			if (activeSlide < sliderData.length - 1) {
				setActiveSlide(activeSlide + 1)
			} else {
				setActiveSlide(0)
			}
		}

		setTouchPosition(null)
	}

	useEffect(() => {
		const slide = slideRef.current
		slide.addEventListener('touchstart', handleTouchStart, { passive: false })
		slide.addEventListener('touchmove', handleTouchMove, { passive: false })
		slide.addEventListener('touchend', handleTouchEnd, { passive: false })
		return () => {
			slide.removeEventListener('touchstart', handleTouchStart, {
				passive: false,
			})
			slide.removeEventListener('touchmove', handleTouchMove, {
				passive: false,
			})
			slide.removeEventListener('touchend', handleTouchEnd, { passive: false })
		}
	})

	return (
		<section className="h-full w-full flex relative overflow-hidden">
			<div ref={slideRef}>
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
			</div>
			{dots && (
				<div className="absolute bottom-10 w-full">
					<div className="mx-auto w-max h-6 space-x-3 z-10 flex items-center px-3 bg-transaprent rounded-full bg-opacity-70">
						{sliderData.map((slide, index) => (
							<button
								key={index}
								onClick={() => setActiveSlide(index)}
								className={` ${
									index === activeSlide
										? 'w-10 lg:w-16 bg-gray-600'
										: 'w-3 lg:w-6 bg-gray-300'
								} h-3 rounded-full transition-all duration-500`}
							/>
						))}
					</div>
				</div>
			)}

			{button && (
				<>
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
				</>
			)}
		</section>
	)
}

export default SlideShow
