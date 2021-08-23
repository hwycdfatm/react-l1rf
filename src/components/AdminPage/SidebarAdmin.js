import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { dataSides } from './dataSideBar'
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
		localStorage.removeItem('first-login')
		localStorage.removeItem('login')
		localStorage.removeItem('admin')
		setCart([])
	}

	const handleSidebar = () => props.setOpen(!props.open)
	return (
		<div
			className={`absolute lg:relative h-screen w-56 bg-sidebar flex-col shadow-xl rounded-r-xl transition lg:flex z-40 transform lg:transform-none ${
				props.open && '-translate-x-full'
			}`}
		>
			<button onClick={handleSidebar} className="p-3 absolute lg:hidden">
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
			<div className="flex flex-col p-2 space-y-2">
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
				{dataSides.map((item, index) => (
					<NavLink
						key={index}
						to={item.slug}
						onClick={handleSidebar}
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300  hover:bg-gray-300 text-sm font-semibold"
						activeClassName="bg-gray-300 dark:bg-gray-900 dark:text-white"
					>
						{item.title}
					</NavLink>
				))}
				<div>
					<button
						onClick={handleLogout}
						className="w-full text-left leading-10 h-10 px-2 rounded-md transition duration-300  hover:bg-gray-300 text-sm font-semibold"
					>
						Đăng xuất
					</button>
				</div>
			</div>
		</div>
	)
}

export default SidebarAdmin
