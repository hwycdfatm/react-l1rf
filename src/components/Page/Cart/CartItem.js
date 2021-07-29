import React from 'react'

export default function CartItem() {
	return (
		<div className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-2 flex overflow-hidden">
			<div className="h-16 mr-6">
				<img
					src="https://cf.shopee.vn/file/a398cd59e3523786fe335a9d27be045c"
					alt=""
					className="h-full object-contain"
				/>
			</div>
			<div className="flex flex-1 justify-between items-center">
				<div className="text-base font-semibold">
					<p>
						Quần jean
						<span className="ml-6 font-normal text-sm">x1</span>
					</p>

					<p className="text-gray-400 text-sm">1,200,000 vnđ</p>
				</div>
				<div className="text-lg font-semibold">
					<button className="focus:outline-none font-bold py-2 px-2 rounded-full inline-flex items-center ">
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
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}
