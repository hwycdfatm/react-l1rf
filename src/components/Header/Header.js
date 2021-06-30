import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
	return (
		<header className="flex w-full p-10 py-5 justify-between h-20 items-center fixed bg-white z-10 shadow-sm">
			<Link to="/" className=" text-3xl font-semibold uppercase">
				l1rf
			</Link>
			<div className="flex flex-row items-center space-x-3">
				<Link
					to="/product"
					className="px-3 h-10 flex items-center justify-center rounded-md font-semibold"
				>
					Sản phẩm
				</Link>

				<Link
					to="/login"
					className="px-3 h-10 flex items-center justify-center rounded-md shadow-md font-semibold text-purple-500"
				>
					Login
				</Link>

				<Link
					to="/cart"
					className=" flex justify-center  w-10 h-10 items-center rounded-md shadow-md"
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
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						/>
					</svg>
				</Link>
			</div>
		</header>
	)
}

export default Header
