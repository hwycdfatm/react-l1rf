import React from 'react'

const Pagination = (props) => {
	const page = []
	const maxPage = props.totalPage
	const currentPage = parseInt(props.currentPage)
	const setCurrentPage = props.setCurrentPage
	const nextPage = () => {
		if (currentPage < maxPage) setCurrentPage(currentPage + 1)
	}
	const prePage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1)
	}
	for (let i = 1; i <= maxPage; i++) {
		page.push(i)
	}
	return (
		<div className="flex flex-col items-center my-12 justify-center">
			<div className="flex text-gray-500 space-x-6">
				<div className="flex space-x-3">
					<button onClick={() => setCurrentPage(1)} className="w-6 h-8 rounded">
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
					<button onClick={prePage} className="w-6 h-8 rounded">
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
					{page.map((page) => (
						<button
							key={page}
							onClick={() => {
								setCurrentPage(page)
							}}
							className={`w-6 h-8 rounded text-center font-bold hover:bg-gray-300 ${
								page === currentPage ? 'bg-blue-100' : ''
							}`}
						>
							{page}
						</button>
					))}
				</div>
				<div className="flex space-x-3">
					<button onClick={nextPage} className="w-6 h-8 rounded">
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
						onClick={() => setCurrentPage(maxPage)}
						className="w-6 h-8 rounded"
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
