import React, { useRef } from 'react'

import { Link, NavLink } from 'react-router-dom'

import { useDetectOutsideClick } from '../../utils/useDetectOutsideClick'

import useDarkMode from '../../utils/useDarkMode.js'

import { SidebarData } from './SidebarData'

import Sidebar from './Sidebar'

const Header = () => {
	// Dropdown
	const dropdownRef = useRef(null)
	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
	const handleDropdown = () => setIsActive(!isActive)

	const [colorTheme, setColorTheme] = useDarkMode()

	function darkMode() {
		setColorTheme(colorTheme)
	}

	return (
		<header className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center h-16 px-2 bg-white transition duration-700 dark:bg-gray-700 dark:text-white md:px-4 lg:px-8 shadow-sm">
			<Sidebar fnc={darkMode} colorTheme={colorTheme} data={SidebarData} />
			<Link to="/" className="font-bebas font-semibold text-3xl">
				l1rf
			</Link>
			<div className="hidden flex-row space-x-6 font-semibold md:flex md:space-x-2 lg:ml-28">
				{SidebarData.map((sidebar, index) => (
					<NavLink
						key={index}
						to={sidebar.path}
						className="flex justify-center items-center h-10 px-7 rounded-md transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-600"
						activeClassName="bg-gray-300 dark:bg-gray-900 dark:text-white"
					>
						{sidebar.title}
					</NavLink>
				))}
			</div>
			<div className="flex space-x-3">
				<div className="space-x-2 hidden md:flex relative">
					<button
						to="#"
						ref={dropdownRef}
						onClick={handleDropdown}
						className="hidden justify-center items-center h-10 px-2 font-semibold rounded-md shadow-sm dark:text-white"
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
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</button>

					{isActive && (
						<div className="absolute top-14 right-10 w-40 rounded-md shadow-md bg-white dark:bg-gray-700">
							<div className="flex flex-col p-2 font-medium ">
								<Link
									to="/user"
									className="text-left font-medium text-sm hover:bg-gray-300 rounded-md p-2"
								>
									Thông tin cá nhân
								</Link>
								<Link
									to="/history"
									className="text-left font-medium text-sm hover:bg-gray-300 rounded-md p-2"
								>
									Lịch sử mua hàng
								</Link>
								<Link
									to="/changepassword"
									className="text-left font-medium text-sm hover:bg-gray-300 rounded-md p-2"
								>
									Thay đổi mật khẩu
								</Link>
								<Link
									to="/logout"
									className="text-left font-medium text-sm hover:bg-gray-300 rounded-md p-2"
								>
									Đăng xuất
								</Link>
							</div>
						</div>
					)}
				</div>
				<div className="space-x-3 flex">
					<Link
						to="/login"
						className="flex justify-center items-center h-10 px-2 font-semibold text-blue-400"
					>
						Login
					</Link>
					<Link
						to="/register"
						className="flex justify-center items-center h-10 px-4 font-semibold text-white rounded-md shadow-md dark:text-white bg-blue-400"
					>
						Register
					</Link>
				</div>
				<button
					onClick={darkMode}
					className="flex justify-center items-center h-10 px-2 rounded-md shadow-sm dark:text-white"
				>
					{colorTheme === 'light' ? (
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
								d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
					) : (
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
								d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
							/>
						</svg>
					)}
				</button>
				<Link
					to="/cart"
					className="flex justify-center items-center h-10 px-2 rounded-md shadow-sm dark:text-white"
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
