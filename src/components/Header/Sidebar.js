import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
	// Show/ Hidden Sidebar
	const [sideBar, setSideBar] = useState(false)
	const handleSidebar = () => setSideBar(!sideBar)

	// Block scroll out page when open sidebar
	sideBar
		? document.querySelector('body').classList.add('overflow-hidden')
		: document.querySelector('body').classList.remove('overflow-hidden')

	// Dropdown Category in Sidebar
	const [dropdown, setDropdown] = useState(false)
	const handleDropdown = () => setDropdown(!dropdown)

	return (
		<div className="md:hidden">
			<div
				className={
					sideBar
						? 'fixed top-0 left-0 bottom-0 right-0 transform transition'
						: 'fixed top-0 left-0 bottom-0 right-0 transform transition -translate-x-full'
				}
			>
				<div className="relative h-full bg-gray-50 dark:bg-gray-600">
					{/* X button */}
					<button className="absolute top-4 right-4" onClick={handleSidebar}>
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
					{/* Content sidebar */}
					<div className="flex flex-col w-4/5 mx-auto pt-20 space-y-6">
						{/* Search Input Field */}
						<div className="flex justify-between items-center border-2 border-gray-300 rounded-md h-10">
							<input
								type="text"
								className="flex-1 p-1 pl-2 text-sm bg-transparent focus:outline-none focus:shadow-outline"
							/>

							<button className="px-2">
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
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</button>
						</div>
						<div className="flex flex-col space-y-4">
							<div className="flex flex-col rounded-md shadow-sm">
								<button
									onClick={handleDropdown}
									className="rounded-md px-3 w-full flex flex-row justify-between items-center h-10 bg-gray-300"
								>
									<span>Danh mục sản phẩm</span>
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
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
								{dropdown && (
									<div className="flex flex-col p-2 space-y-1 bg-transparent">
										{props.data.map((data, index) => (
											<Link
												to={data.path}
												key={index}
												className="px-3 h-8 leading-8 rounded-md hover:bg-gray-600"
											>
												{data.title}
											</Link>
										))}
									</div>
								)}
							</div>
							<Link
								to="/"
								className="flex flex-row items-center justify-between h-10 rounded-md bg-gray-300 px-3 shadow-md"
							>
								<span>Thông tin cá nhân</span>
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
										d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</Link>
							<Link
								to="/"
								className="flex flex-row items-center justify-between h-10 rounded-md bg-gray-300 px-3 shadow-md"
							>
								<span>Đăng xuất</span>
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
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
									/>
								</svg>
							</Link>
							<Link
								to="#"
								onClick={props.fnc}
								className="flex flex-row items-center justify-between h-10 rounded-md bg-gray-300 px-3 shadow-md"
							>
								{props.colorTheme === 'light' ? 'Light mode' : 'Dark mode'}
							</Link>
						</div>
					</div>
				</div>
			</div>
			{/* Toggle Menu in header */}
			<button
				onClick={handleSidebar}
				className="flex justify-center items-center h-10 w-10 rounded-md shadow-sm"
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
						d="M4 8h16M4 16h16"
					/>
				</svg>
			</button>
		</div>
	)
}
