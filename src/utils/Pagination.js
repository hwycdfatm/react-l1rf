import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { scrollToTop } from './ScrollToTopBtn'
const Pagination = (props) => {
	const page = []
	const maxPage = props.totalPage
	const currentPage = parseInt(props.currentPage)
	const history = useHistory()

	const nextPage = () => {
		if (currentPage < maxPage) {
			scrollToTop()
			history.push(`/category/${props.slug}?_page=${currentPage + 1}`)
		}
	}
	const prePage = () => {
		if (currentPage > 1) {
			scrollToTop()
			history.push(`/category/${props.slug}?_page=${currentPage - 1}`)
		}
	}

	const firstPage = () => {
		if (currentPage === 1) return
		scrollToTop()
		history.push(`/category/${props.slug}`)
	}

	const lastPage = () => {
		if (currentPage === maxPage) return
		scrollToTop()
		history.push(`/category/${props.slug}?_page=${maxPage}`)
	}

	for (let i = 1; i <= maxPage; i++) {
		page.push(i)
	}
	const [pageShow, setPageShow] = useState([])

	useEffect(() => {
		if (currentPage === 1) {
			setPageShow(page.slice(0, 5))
		} else if (currentPage > 2) {
			if (currentPage === maxPage - 1) {
				setPageShow(page.slice(currentPage - 4, currentPage + 2))
			} else if (currentPage === maxPage) {
				setPageShow(page.slice(currentPage - 5, currentPage + 2))
			} else {
				setPageShow(page.slice(currentPage - 3, currentPage + 2))
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage])

	return (
		<div className="flex flex-col items-center my-8 justify-center">
			<div className="flex text-gray-500 space-x-6">
				<div className="flex space-x-3">
					<button
						onClick={() => firstPage()}
						className={`w-6 h-8 rounded ${
							currentPage === 1 ? 'text-gray-300' : 'text-gray-800'
						}`}
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
								d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
							/>
						</svg>
					</button>
					<button
						onClick={prePage}
						className={`w-6 h-8 rounded ${
							currentPage === 1 ? 'text-gray-300' : 'text-gray-800'
						}`}
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
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
				</div>
				<div className="flex space-x-2 mx-2">
					{pageShow.map((page) => (
						<button
							key={page}
							onClick={() => {
								scrollToTop()
								history.push(`/category/${props.slug}?_page=${page}`)
							}}
							className={`w-6 h-8 rounded text-center font-bold bg-opacity-70 hover:bg-green-100 ${
								page === currentPage ? 'bg-green-300' : ''
							}`}
						>
							{page}
						</button>
					))}
				</div>
				<div className="flex space-x-3">
					<button
						onClick={nextPage}
						className={`w-6 h-8 rounded ${
							currentPage === page.length ? 'text-gray-300' : 'text-gray-800'
						}`}
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
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
					<button
						onClick={() => lastPage()}
						className={`w-6 h-8 rounded ${
							currentPage === page.length ? 'text-gray-300' : 'text-gray-800'
						}`}
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
								d="M13 5l7 7-7 7M5 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Pagination
