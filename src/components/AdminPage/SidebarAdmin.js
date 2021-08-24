import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import axios from 'axios'
const SidebarAdmin = (props) => {
	const state = useContext(GlobalState)
	const [login, setIsLogin] = state.isLogin
	const [admin, setIsAdmin] = state.isAdmin
	const [cart, setCart] = state.cart
	const handleLogout = async () => {
		await axios.get('/user/logout')
		setIsLogin(!login)
		setIsAdmin(!admin)
		localStorage.setItem('cart', cart)
		localStorage.removeItem('first-login')
		localStorage.removeItem('login')
		localStorage.removeItem('admin')
		setCart([])
	}

	const handleSidebar = () => props.setOpen(!props.open)
	const hanbleButton = () => {
		props.setOpen(!props.open)
		props.setToggleForm(!props.toggleForm)
	}
	return (
		<>
			<div className="top-0 left-0 right-0 p-3 fixed bg-white lg:hidden z-30">
				<button onClick={handleSidebar}>
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
							d="M4 6h16M4 12h8m-8 6h16"
						/>
					</svg>
				</button>
			</div>
			<div
				className={`fixed h-screen w-56 bg-sidebar flex-col shadow-xl rounded-r-xl transition flex justify-between z-40 transform lg:transform-none ${
					props.open && '-translate-x-full'
				}`}
			>
				<button className="absolute p-3 lg:hidden" onClick={handleSidebar}>
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
				<div className="pt-16 pb-5 pl-2 flex space-x-1 justify-center items-center text-xl text-purple-600 font-extrabold">
					<h1 className="patriot cursor-default">l1rf Store</h1>
					<span>
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
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							/>
						</svg>
					</span>
				</div>
				<div className="mb-auto flex flex-col p-2 space-y-2">
					<NavLink
						to="/"
						onClick={handleSidebar}
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300  hover:bg-gray-300 text-sm font-semibold"
					>
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
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
						<span>Trang chủ</span>
					</NavLink>
					<NavLink
						to="/products"
						onClick={handleSidebar}
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300  hover:bg-gray-300 text-sm font-semibold"
						activeClassName="bg-gray-300 dark:bg-gray-900 dark:text-white"
					>
						Tất cả sản phẩm
					</NavLink>
					<NavLink
						to="/orders"
						onClick={handleSidebar}
						activeClassName="bg-gray-300 dark:bg-gray-900 dark:text-white"
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300  hover:bg-gray-300 text-sm font-semibold"
					>
						Tất cả hóa đơn
					</NavLink>
					<NavLink
						to="#"
						onClick={hanbleButton}
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300  hover:bg-gray-300 text-sm font-semibold"
					>
						Thêm sản phẩm mới
					</NavLink>
				</div>
				<div className="p-2 mb-5">
					<button
						onClick={handleLogout}
						className="w-full flex items-center space-x-2 text-left leading-10 h-10 px-2 rounded-md transition duration-300  hover:bg-gray-300 text-sm font-semibold"
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
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
						<span>Đăng xuất</span>
					</button>
				</div>
			</div>
		</>
	)
}

export default SidebarAdmin
