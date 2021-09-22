import React, { useRef } from 'react'
import { useDetectOutsideClick } from '../../utils/useDetectOutsideClick'

const DetailOrder = () => {
	const dropdownRef = useRef(null)
	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
	const handleDropdown = () => setIsActive(!isActive)
	return (
		<div className="mt-11 lg:mt-0 lg:ml-56 bg-white w-full font-maven">
			<div className="flex flex-col my-3">
				<div className="flex flex-col space-y-6 md:space-y-0 md:flex-row mx-6 my-3 lg:space-x-10">
					<div className="rounded-lg border shadow-lg p-5 w-full">
						<h1 className="text-lg font-semibold ">Thông tin khách hàng</h1>
						<div className="pl-3 mt-2 space-y-1">
							<p className="text-base text-gray-600">Mai Trí Toàn</p>
							<p className="text-base text-gray-600">
								mai.tritoan7102@gmail.com
							</p>
							<p className="text-base text-gray-600">0339331767</p>
							<p className="text-base text-gray-600">
								12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Tp Hồ Chí Minh
							</p>
						</div>
					</div>
					<div className="rounded-lg border shadow-lg p-5 w-full">
						<h1 className="text-lg font-semibold ">Thông tin hóa đơn</h1>
					</div>
				</div>
				<div className="flex flex-col space-y-6 md:space-y-0 md:flex-row mx-6 my-6 lg:space-x-10">
					<div className="rounded-lg border shadow-lg p-5 w-full md:w-4/6">
						Chi tiết hóa đơn
					</div>
					<div className="rounded-lg border shadow-lg p-5 w-full md:w-2/6 space-y-2">
						<h5>Hành động</h5>
						<div className="flex w-full relative">
							<button
								to="#"
								ref={dropdownRef}
								onClick={handleDropdown}
								className="w-full flex items-center uppercase justify-between border h-9 px-2 text-sm rounded-md dark:text-white"
							>
								Đang cập nhật
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							{isActive && (
								<div className="absolute top-10 left-0 w-full rounded-md shadow-md bg-white dark:bg-gray-700 transform origin-top animation-down">
									<button className="text-left font-medium text-sm uppercase hover:bg-gray-300 rounded-md p-2 w-full">
										Đã chuyển cho đơn vị vận chuyển
									</button>
								</div>
							)}
						</div>
						<div className="flex w-full">
							<button className="w-full bg-green-300 text-white uppercase h-9 px-2 text-sm rounded-md dark:text-white">
								Cập nhật
							</button>
						</div>
						<div className="flex w-full">
							<button className="w-full bg-red-300 text-white uppercase h-9 px-2 text-sm rounded-md dark:text-white">
								Hủy
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DetailOrder
