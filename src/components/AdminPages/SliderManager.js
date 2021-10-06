import React, { useContext, useEffect } from 'react'
import sliderAPI from '../../api/sliderAPI'
import { GlobalState } from '../../GlobalState'
import FormSlide from './FormSlide'
const SlideManager = () => {
	const { token } = useContext(GlobalState)
	useEffect(() => {
		const fetchSlide = async () => {
			try {
				const result = await sliderAPI.get()
				console.log(result)
			} catch (error) {
				console.log(error)
			}
		}
		fetchSlide()
	}, [])
	return (
		<>
			<FormSlide />
			<div className="mt-10 lg:mt-0 lg:ml-56 overflow-x-scroll scrollbar min-h-screen">
				<button className="fixed bottom-5 right-5 p-1 rounded-full bg-red-400 text-white">
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
					<div className="p-3 rounded-lg shadow-md">
						<p className="font-maven">Các slide sẽ hiển thị</p>
						<div className="flex flex-wrap">
							<div className="w-full md:w-1/2 lg:w-1/3 p-1">
								<div className="rounded-lg overflow-hidden relative">
									<img
										src="https://bangxephang.com/wp-content/uploads/2021/03/slide-dep-cho-powerpoint-1024x576.jpg"
										alt=""
										className="h-full w-full object-cover"
									/>
									<div
										style={{ zIndex: 1 }}
										className="absolute inset-0 flex items-center group justify-center hover:bg-gray-100 hover:bg-opacity-20"
									>
										<button className="opacity-100 md:opacity-0 md:group-hover:opacity-100 py-1 px-3 bg-red-300 rounded-lg text-white font-maven font-semibold text-lg">
											Ẩn đi
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Slide chưa hiển thị */}
					<div className="p-3 rounded-lg shadow-md">
						<p className="font-maven">Tất cả các slide</p>
						<div className="flex flex-wrap">
							<div className="w-full md:w-1/2 lg:w-1/3 p-1">
								<div className="rounded-lg overflow-hidden relative">
									<img
										src="https://bangxephang.com/wp-content/uploads/2021/03/slide-dep-cho-powerpoint-1024x576.jpg"
										alt=""
										className="h-full w-full object-cover"
									/>
									<div
										style={{ zIndex: 1 }}
										className="absolute inset-0 flex items-center group justify-center hover:bg-gray-100 hover:bg-opacity-20 space-x-4"
									>
										<button className="opacity-100 md:opacity-0 md:group-hover:opacity-100 py-1 px-3 bg-blue-400 rounded-lg text-white font-maven font-medium">
											Hiện
										</button>
										<button className="opacity-100 md:opacity-0 md:group-hover:opacity-100 py-1 px-3 bg-red-400 rounded-lg text-white font-maven font-medium">
											Xóa luôn
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SlideManager
