import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
	// Show/ Hidden Sidebar
	const [sideBar, setSideBar] = useState(false)
	const handleSidebar = () => setSideBar(!sideBar)
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
						: 'fixed top-0 left-0 bottom-0 right-0 transform -translate-x-full transition'
				}
			>
				<div className="relative h-full bg-gray-50 dark:bg-gray-600">
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
					<div className="flex flex-col w-3/5 mx-auto pt-20">
						<div
							className={
								dropdown
									? 'flex flex-col bg-white rounded-md shadow-md h-auto overflow-hidden'
									: 'flex flex-col bg-white rounded-md shadow-md h-10 overflow-hidden'
							}
						>
							<div
								className="flex flex-row justify-between items-center p-3 cursor-pointer"
								onClick={handleDropdown}
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
							</div>
							<div className="cursor-default flex flex-col space-y-2 mt-2">
								{props.data.map((sidebar, index) => (
									<Link
										onClick={handleSidebar}
										to={sidebar.path}
										key={index}
										className="p-3 px-6 rounded-md block w-full"
									>
										{sidebar.title}
									</Link>
								))}
							</div>
						</div>
						<div>
							<button onClick={props.fnc}>
								{props.colorTheme === 'dark' ? 'Dark mode' : 'Light mode'}
							</button>
						</div>
					</div>
				</div>
			</div>
			<button
				onClick={handleSidebar}
				className="flex justify-center items-center h-10 w-10 rounded-md shadow-md"
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
