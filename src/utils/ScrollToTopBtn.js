import React, { useState, useEffect } from 'react'
export const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})
}
const ScrollToTopBtn = () => {
	const [isActive, setIsActive] = useState(false)

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop
		if (scrolled > 300) {
			setIsActive(true)
		} else if (scrolled <= 300) {
			setIsActive(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', toggleVisible)
		return () => {
			window.removeEventListener('scroll', toggleVisible)
		}
	})
	return (
		<button
			onClick={scrollToTop}
			className={`w-10 h-10 bg-white flex items-center justify-center text-gray-800 z-40 bottom-24 right-8 rounded shadow-lg border ${
				isActive ? 'fixed' : 'hidden'
			}`}
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
					d="M5 11l7-7 7 7M5 19l7-7 7 7"
				/>
			</svg>
		</button>
	)
}

export default ScrollToTopBtn
