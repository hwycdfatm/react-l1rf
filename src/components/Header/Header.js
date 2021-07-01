import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
	const [dropdown, setDropDown] = useState(false)
	const handleDropDown = () => setDropDown(!dropdown)
	return (
		<header className="flex w-full p-10 py-5 justify-between h-20 items-center fixed bg-white z-10 shadow-sm">
			<Link to="/" className=" text-3xl font-semibold uppercase logo">
				l1rf
			</Link>
			<div className="flex flex-row items-center space-x-3">
				<Link
					onClick={handleDropDown}
					to="#"
					className="px-3 h-10 flex items-center justify-center rounded-md font-semibold relative"
				>
					Danh mục sản phẩm
					<svg
						className="w-4 h-4 ml-1"
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
					{dropdown && (
						<div className="absolute flex flex-col bg-white rounded-md shadow-md w-52 top-12 p-2">
							<Link
								to="/category/pants"
								className="px-3 h-10 hover:bg-blue-300 hover:text-gray-50 leading-10 rounded-md"
							>
								Pants
							</Link>
							<Link
								to="/category/shirt"
								className="px-3 h-10 hover:bg-blue-300 hover:text-gray-50 leading-10 rounded-md"
							>
								Shirt
							</Link>
							<Link
								to="/category/shoes"
								className="px-3 h-10 hover:bg-blue-300 hover:text-gray-50 leading-10 rounded-md"
							>
								Shoes
							</Link>
							<Link
								to="/category/accessories"
								className="px-3 h-10 hover:bg-blue-300 hover:text-gray-50 leading-10 rounded-md"
							>
								Accessories
							</Link>
						</div>
					)}
				</Link>
				<Link
					to="/history"
					className="px-3 h-10 flex items-center justify-center rounded-md shadow-md font-semibold text-blue-500"
				>
					History
				</Link>
				<Link
					to="/login"
					className="px-3 h-10 flex items-center justify-center rounded-md shadow-md font-semibold text-purple-500"
				>
					Login
				</Link>
				<Link
					to="/logout"
					className="px-3 h-10 flex items-center justify-center rounded-md shadow-md font-semibold text-red-500"
				>
					Logout
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
