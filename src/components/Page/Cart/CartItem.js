import React from 'react'

export default function CartItem(props) {
	return (
		<div className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-2 flex overflow-hidden">
			<div className="h-16 mr-6">
				<img src={props.item.image} alt="" className="h-full object-contain" />
			</div>
			<div className="flex flex-1 justify-between items-center">
				<div className="text-base font-semibold">
					<p>
						{props.item.title}
						<span className="ml-6 font-normal text-sm">
							x{props.item.quantity}
						</span>
					</p>

					<p className="text-gray-400 text-sm">{props.item.price} vnđ</p>
				</div>
				<div className="text-lg font-semibold">
					<button
						onClick={() => props.fncRM(props.item._id)}
						className="focus:outline-none font-bold py-2 px-2 rounded-full inline-flex items-center "
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
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}
