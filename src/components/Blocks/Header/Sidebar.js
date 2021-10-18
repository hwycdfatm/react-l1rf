import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Search from '../../Search/Search'
import productAPI from '../../../api/productAPI'
export default function Sidebar(props) {
	const { darkModeFuntion, colorTheme, categorys, login, logout } = props
	// Show/ Hidden Sidebar
	const [sideBar, setSideBar] = useState(false)

	const handleSidebar = () => setSideBar(!sideBar)

	const [searchValue, setSearchValue] = useState('')
	const [resultSearchValue, setResultSearchValue] = useState([])
	const typeingTimeoutRef = useRef(null)

	const handleSubmitSearch = async (value) => {
		if (value && value.trim() !== '') {
			const params = {
				q: value,
			}
			const result = await productAPI.getAll(params)
			if (result.status === 'Success') {
				setResultSearchValue(result.data)
			}
		} else {
			setResultSearchValue([])
			setSearchValue('')
		}
	}

	const handleSearch = (e) => {
		const value = e.target.value
		setSearchValue(value)
		if (value) {
			if (typeingTimeoutRef.current) {
				clearTimeout(typeingTimeoutRef.current)
			}
			typeingTimeoutRef.current = setTimeout(() => {
				handleSubmitSearch(value.trim())
			}, 300)
		}
	}

	// Block scroll out page when open sidebar
	sideBar
		? document.querySelector('body').classList.add('overflow-hidden')
		: document.querySelector('body').classList.remove('overflow-hidden')

	// Dropdown Category in Sidebar
	const [dropdown, setDropdown] = useState(false)
	const handleDropdown = () => setDropdown(!dropdown)

	const closeSearch = () => {
		setSearchValue('')
		setResultSearchValue([])
	}

	return (
		<div className="md:hidden z-10">
			<div
				className={`fixed top-0 left-0 bottom-0 right-0 transform transition ${
					!sideBar && '-translate-x-full'
				}`}
			>
				<div className="relative h-full bg-gray-50 dark:bg-darkHeaderColor overflow-y-scroll transition-all">
					{/* X button */}
					<button
						className="absolute top-6 left-6"
						onClick={() => {
							handleSidebar()
							closeSearch()
						}}
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
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					{/* Content sidebar */}
					<div className="flex flex-col w-4/5 mx-auto py-20 space-y-6">
						{/* Search Input Field */}
						<div className="flex justify-between items-center border-2 border-gray-300 rounded-md h-10 relative">
							<input
								value={searchValue}
								onChange={handleSearch}
								type="text"
								className="flex-1 p-1 pl-2 text-base bg-transparent focus:outline-none focus:shadow-outline"
							/>

							<button onClick={() => closeSearch()} className="px-2">
								{searchValue ? (
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
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								)}
							</button>

							{searchValue && searchValue.trim() !== '' && (
								<Search
									value={resultSearchValue}
									handleSidebar={handleSidebar}
									closeSearch={closeSearch}
								/>
							)}
						</div>
						<div className="flex flex-col space-y-4">
							<div className="flex flex-col rounded-md shadow-sm">
								<button
									onClick={handleDropdown}
									className="rounded-md px-3 w-full flex flex-row justify-between shadow-sm items-center h-10 bg-white dark:bg-darkBgColor transition-all"
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
										{categorys.map((data, index) => (
											<Link
												to={`/category/${data.slug}`}
												key={index}
												onClick={() => {
													handleSidebar()
													handleDropdown()
												}}
												className="px-3 h-8 leading-8 rounded-md hover:bg-gray-600"
											>
												{data.name}
											</Link>
										))}
									</div>
								)}
							</div>

							{login ? (
								<>
									<Link
										to="/user"
										onClick={handleSidebar}
										className="flex flex-row items-center justify-between h-10 rounded-md bg-white dark:bg-darkBgColor px-3 shadow-sm transition-all"
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
										onClick={() => {
											logout()
											handleSidebar()
										}}
										className="flex flex-row items-center justify-between h-10 rounded-md bg-white dark:bg-darkBgColor px-3 shadow-sm transition-all"
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
								</>
							) : (
								<Link
									to="/login"
									onClick={handleSidebar}
									className="flex flex-row items-center justify-between h-10 rounded-md bg-white dark:bg-darkBgColor px-3 shadow-sm transition-all"
								>
									Đăng nhập
								</Link>
							)}
							<Link
								to="#"
								onClick={darkModeFuntion}
								className="flex flex-row items-center justify-between h-10 rounded-md bg-white dark:bg-darkBgColor px-3 shadow-sm transition-all"
							>
								<span>Dark mode</span>
								<div className="flex items-center justify-center w-10">
									<div className="relative">
										<div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
										<div
											className={`absolute left-1 top-1  w-4 h-4 rounded-full transition-all ${
												colorTheme === 'dark'
													? 'bg-white'
													: 'transform translate-x-full bg-green-400'
											}`}
										></div>
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
			{/* Toggle Menu in header */}
			<button
				onClick={handleSidebar}
				className="flex justify-center items-center h-10 w-10 rounded-md"
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
