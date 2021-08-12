import React, { useRef, useState, useEffect, useContext } from 'react'

import { GlobalSate } from '../../GlobalState'

import { Link, NavLink } from 'react-router-dom'

import { useDetectOutsideClick } from '../../utils/useDetectOutsideClick'

import useDarkMode from '../../utils/useDarkMode.js'

import Sidebar from './Sidebar'

import axios from 'axios'

const Header = () => {
	// Global State
	const state = useContext(GlobalSate)
	const [isLogin, setIsLogin] = state.isLogin
	const [isAdmin, setIsAdmin] = state.isAdmin
	const [cart] = state.cart
	const handleLogout = async () => {
		await axios.get('/user/logout')
		setIsLogin(false)
		setIsAdmin(false)
		localStorage.removeItem('first-login')
	}
	// Dropdown
	const dropdownRef = useRef(null)
	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
	const handleDropdown = () => setIsActive(!isActive)

	const [colorTheme, setColorTheme] = useDarkMode()

	const [category, setCategory] = useState([])

	useEffect(() => {
		const getCategory = async () => {
			const res = await axios.get('/api/category')
			setCategory(res.data.data)
		}
		getCategory()
	}, [cart])

	function darkMode() {
		setColorTheme(colorTheme)
	}

	return (
		<header className="fixed top-0 z-50 left-0 right-0 flex flex-row justify-between items-center h-16 px-2 transition duration-700 bg-white dark:bg-gray-700  dark:text-white md:px-4 lg:px-8 shadow-sm">
			{/* Toggle Button & Sidebar */}
			<Sidebar
				fnc={darkMode}
				colorTheme={colorTheme}
				data={category}
				isLogin={isLogin}
				logout={handleLogout}
				isAdmin={isAdmin}
			/>

			{/* Logo */}
			{isAdmin ? (
				<Link to="/" className="font-bebas font-semibold text-3xl">
					Admin
				</Link>
			) : (
				<Link to="/" className="font-bebas font-semibold text-3xl">
					l1rf
				</Link>
			)}

			{/* Menu Header */}
			{!isAdmin && (
				<div className="hidden flex-row space-x-6 font-semibold md:flex md:space-x-2 lg:ml-28">
					{category.map((sidebar, index) => (
						<NavLink
							key={index}
							to={'/category/' + sidebar.slug}
							className="flex justify-center items-center h-10 px-7 rounded-md transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-600"
							activeClassName="bg-gray-300 dark:bg-gray-900 dark:text-white"
						>
							{sidebar.name}
						</NavLink>
					))}
				</div>
			)}

			{/* User */}
			<div className="flex space-x-3">
				{isLogin ? (
					<div className="space-x-2 hidden md:flex relative">
						<button
							to="#"
							ref={dropdownRef}
							onClick={handleDropdown}
							className="flex justify-center items-center h-10 px-2 font-semibold rounded-md dark:text-white"
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
							<div className="absolute top-14 right-0 w-40 rounded-md shadow-md bg-white dark:bg-gray-700">
								<div className="flex flex-col p-1 font-medium ">
									<Link
										to="/user"
										className="text-left font-medium text-sm hover:bg-gray-300 rounded-md p-2"
									>
										Thông tin cá nhân
									</Link>
									<Link
										to="/changepassword"
										className="text-left font-medium text-sm hover:bg-gray-300 rounded-md p-2"
									>
										Thay đổi mật khẩu
									</Link>
									<Link
										to="/"
										onClick={handleLogout}
										className="text-left font-medium text-sm hover:bg-gray-300 rounded-md p-2"
									>
										Đăng xuất
									</Link>
								</div>
							</div>
						)}
					</div>
				) : (
					<div className="space-x-3 hidden md:flex">
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
				)}

				{/* Login & Register */}

				{/* Dark Mode Toggle */}
				<button
					onClick={darkMode}
					className="hidden justify-center items-center h-10 px-2 rounded-md dark:text-white md:flex"
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

				{/* Cart button */}
				{isAdmin ? (
					<Link
						to="/add"
						className="flex justify-center items-center h-10 px-2 rounded-md dark:text-white xl:bg-blue-300"
					>
						<svg
							className="w-6 h-6 xl:hidden"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span className="hidden xl:block">Thêm sản phẩm</span>
					</Link>
				) : (
					<Link
						to="/cart"
						className="relative flex justify-center items-center h-10 px-2 rounded-md dark:text-white"
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
						<span className="absolute top-1 right-0 font-medium text-sm">
							{cart.length > 0 ? cart.length : ''}
						</span>
					</Link>
				)}
			</div>
		</header>
	)
}

export default Header
