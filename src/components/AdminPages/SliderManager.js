import React, { useContext, useEffect, useState } from 'react'
import sliderAPI from '../../api/sliderAPI'
import { GlobalState } from '../../GlobalState'
import FormSlide from './FormSlide'
const SlideManager = () => {
	const { token } = useContext(GlobalState)

	const [showFormSlide, setshowFormSlide] = useState(false)

	const [slideActive, setSlideActive] = useState([])
	const [slideNoneActive, setSlideNoneActive] = useState([])

	useEffect(() => {
		const fetchSlide = async () => {
			try {
				const result = await sliderAPI.get()
				setSlideNoneActive([
					...result.sliders.filter((slide) => slide.activate === false),
				])
				setSlideActive([
					...result.sliders.filter((slide) => slide.activate === true),
				])
			} catch (error) {
				console.log(error)
			}
		}
		fetchSlide()
	}, [])

	useEffect(() => {
		setshowFormSlide(false)
	}, [])
	// Nút để thêm slide vào chỗ hiển thị
	const handleActiveSlide = async (slideObj) => {
		try {
			if (slideActive.length >= 4) return alert('Tối đa 4 ảnh thôi nha')
			await sliderAPI.update(token, slideObj._id, true)
			setSlideNoneActive([
				...slideNoneActive.filter((slide) => slide._id !== slideObj._id),
			])
			setSlideActive((pre) => [...pre, { ...slideObj }])
		} catch (error) {
			console.log(error)
		}
	}

	// Nút để xóa slide ra khỏi chỗ hiển thị
	const handleRemoveActiveSlide = async (slideObj) => {
		try {
			await sliderAPI.update(token, slideObj._id, false)
			setSlideActive([
				...slideActive.filter((slide) => slide._id !== slideObj._id),
			])
			setSlideNoneActive((pre) => [...pre, { ...slideObj }])
		} catch (error) {
			console.log(error)
		}
	}

	// Xóa slide khỏi Database
	const handleDestroySlide = async (_id) => {
		try {
			console.log(_id)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			{showFormSlide && (
				<FormSlide
					showFormSlide={showFormSlide}
					setShowFormSlide={setshowFormSlide}
				/>
			)}
			<div className="mt-10 lg:mt-0 lg:ml-56 overflow-x-scroll scrollbar min-h-screen md:px-4">
				<button
					onClick={() => setshowFormSlide(!showFormSlide)}
					className="fixed bottom-5 right-5 p-1 rounded-full bg-red-400 text-white z-10"
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
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
				</button>

				{/* Các slide sẽ hiện thị ở đây */}
				<div className="flex flex-col p-3 space-y-4">
					{/* Slide hiển thị */}
					<div className="p-3 rounded-lg shadow-md mb-6">
						<p className="font-maven">Các slide sẽ hiển thị</p>
						<div className="flex flex-wrap">
							{slideActive.length > 0 ? (
								slideActive.map((slide) => (
									<div key={slide._id} className="w-full md:w-1/2 lg:w-1/3 p-1">
										<div className="rounded-lg h-full w-full overflow-hidden relative">
											<img
												src={slide.image}
												alt={slide.title}
												className="h-full w-full object-cover"
											/>
											<div
												style={{ zIndex: 1 }}
												className="absolute inset-0 flex items-center group justify-center hover:bg-gray-100 hover:bg-opacity-20"
											>
												<button
													onClick={() => handleRemoveActiveSlide(slide)}
													className="opacity-100 md:opacity-0 md:group-hover:opacity-100 py-1 px-3 bg-red-300 rounded-lg text-white font-maven font-semibold text-lg"
												>
													Ẩn đi
												</button>
											</div>
										</div>
									</div>
								))
							) : (
								<div className="text-center w-full p-3">Trống</div>
							)}
						</div>
					</div>
					{/* Slide chưa hiển thị */}
					<div className="p-3 rounded-lg shadow-md">
						<p className="font-maven">Các slide còn lại</p>
						<div className="flex flex-wrap">
							{slideNoneActive.length > 0 ? (
								slideNoneActive.map((slide) => (
									<div key={slide._id} className="w-full md:w-1/2 lg:w-1/3 p-1">
										<div className="rounded-lg h-full w-full overflow-hidden relative">
											<img
												src={slide.image}
												alt={slide.title}
												className="h-full w-full object-cover"
											/>
											<div
												style={{ zIndex: 1 }}
												className="absolute inset-0 flex items-center group justify-center hover:bg-gray-100 hover:bg-opacity-20 space-x-4"
											>
												<button
													onClick={() => handleActiveSlide(slide)}
													className="opacity-100 md:opacity-0 md:group-hover:opacity-100 py-1 px-3 bg-blue-400 rounded-lg text-white font-maven font-medium"
												>
													Hiện
												</button>
												<button
													onClick={() => handleDestroySlide(slide._id)}
													className="opacity-100 md:opacity-0 md:group-hover:opacity-100 py-1 px-3 bg-red-400 rounded-lg text-white font-maven font-medium"
												>
													Xóa luôn
												</button>
											</div>
										</div>
									</div>
								))
							) : (
								<div className="text-center w-full p-3">Trống</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SlideManager
