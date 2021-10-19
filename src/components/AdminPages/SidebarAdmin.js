import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import boxPNG from '../../images/box.png'
import housePNG from '../../images/house.png'
import ticketPNG from '../../images/ticket.png'
import productPNG from '../../images/product.png'
import userPNG from '../../images/user.png'
import trashPNG from '../../images/delete.png'
import categoryPNG from '../../images/categoryicon.png'
import SlideShowPNG from '../../images/slideshow.png'
const SidebarAdmin = (props) => {
	const { logout } = useContext(GlobalState)
	const { handleSidebar, open } = props.option

	const [openTrash, setOpenTrash] = useState(true)

	return (
		<>
			<div className="top-0 left-0 right-0 h-10 flex items-center fixed bg-white lg:hidden z-30">
				<button onClick={handleSidebar} className="p-3">
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
				className={`fixed scrollbar h-screen w-56 bg-white overflow-y-auto flex-col shadow-xl transition flex justify-between z-40 transform lg:transform-none ${
					!open && '-translate-x-full'
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
					<h1 className="cursor-default">l1rf store</h1>
				</div>
				<div className="mb-auto flex flex-col p-2 space-y-2">
					<NavLink
						to="/"
						onClick={handleSidebar}
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300 hover:bg-green-300 bg-opacity-60 text-sm font-semibold"
					>
						<img src={housePNG} alt="" className="w-5 h-5" />

						<span>Trang chủ</span>
					</NavLink>
					<NavLink
						to="/products"
						onClick={handleSidebar}
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300 hover:bg-green-300 bg-opacity-60 text-sm font-semibold"
						activeClassName="bg-green-300 bg-opacity-60 dark:bg-gray-900 dark:text-white"
					>
						<img src={boxPNG} alt="" className="w-5 h-5" />
						<span>Tất cả sản phẩm</span>
					</NavLink>
					<NavLink
						to="/orders"
						onClick={handleSidebar}
						activeClassName="bg-green-300 bg-opacity-60 dark:bg-gray-900 dark:text-white"
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300 hover:bg-green-300 bg-opacity-60 text-sm font-semibold"
					>
						<img src={ticketPNG} alt="" className="w-5 h-5" />
						<span>Tất cả hóa đơn</span>
					</NavLink>
					<NavLink
						to="/add"
						onClick={handleSidebar}
						activeClassName="bg-green-300 bg-opacity-60 dark:bg-gray-900 dark:text-white"
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300 hover:bg-green-300 bg-opacity-60 text-sm font-semibold"
					>
						<img src={productPNG} alt="" className="w-5 h-5" />
						<span>Thêm sản phẩm mới</span>
					</NavLink>
					<NavLink
						to="/category-manager"
						onClick={handleSidebar}
						activeClassName="bg-green-300 bg-opacity-60 dark:bg-gray-900 dark:text-white"
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300 hover:bg-green-300 bg-opacity-60 text-sm font-semibold"
					>
						<img src={categoryPNG} alt="" className="w-5 h-5" />
						<span>Quản lý danh mục</span>
					</NavLink>
					<NavLink
						to="/allusers"
						activeClassName="bg-green-300 bg-opacity-60 dark:bg-gray-900 dark:text-white"
						onClick={handleSidebar}
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300 hover:bg-green-300 bg-opacity-60 text-sm font-semibold"
					>
						<img src={userPNG} alt="" className="w-5 h-5" />
						<span>Quản lý tài khoản</span>
					</NavLink>
					<NavLink
						to="/slideshow"
						activeClassName="bg-green-300 bg-opacity-60 dark:bg-gray-900 dark:text-white"
						onClick={handleSidebar}
						className="flex items-center space-x-2 h-10 px-2 rounded-md transition duration-300 hover:bg-green-300 bg-opacity-60 text-sm font-semibold"
					>
						<img src={SlideShowPNG} alt="" className="w-5 h-5" />
						<span>Quản lý Slider</span>
					</NavLink>
					<div className="flex flex-col rounded-md">
						<button onClick={() => setOpenTrash(!openTrash)}>
							<div className="w-full flex items-center justify-between space-x-2 h-10 px-2 rounded-md text-sm font-semibold">
								<div className="flex space-x-2">
									<img src={trashPNG} alt="" className="w-5 h-5" />
									<span>BTS</span>
								</div>
								<div
									className={`transform ${
										openTrash && 'rotate-180'
									} transition-transform`}
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
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</div>
							</div>
						</button>
						<div
							className={`flex flex-col ${
								openTrash ? 'max-h-0' : 'max-h-full'
							} overflow-hidden transition-all duration-500`}
						>
							<Link
								to="/trash/products"
								className="h-10 rounded-md flex items-center flex-shrink-0 flex-grow hover:bg-green-200 transition-colors"
							>
								<span className="text-sm font-semibold ml-10">Sản phẩm</span>
							</Link>
							<Link
								to="/trash/users"
								className="h-10 rounded-md flex items-center flex-shrink-0 flex-grow hover:bg-green-200 transition-colors"
							>
								<span className="text-sm font-semibold ml-10">Tài khoản</span>
							</Link>
							<Link
								to="/trash/orders"
								className="h-10 rounded-md flex items-center flex-shrink-0 flex-grow hover:bg-green-200 transition-colors"
							>
								<span className="text-sm font-semibold ml-10">Hóa đơn</span>
							</Link>
						</div>
					</div>
				</div>
				<div className="p-2 mb-5">
					<button
						onClick={logout}
						className="w-full flex items-center space-x-2 text-left leading-10 h-10 px-2 rounded-md transition duration-300 text-sm font-semibold"
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
			<div
				onClick={handleSidebar}
				className={`fixed lg:hidden h-screen w-full ml-56 bg-gray-600 bg-opacity-10 transition z-40 transform lg:transform-none ${
					!open && 'translate-x-full'
				}`}
			></div>
		</>
	)
}

export default SidebarAdmin
