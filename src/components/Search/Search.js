import React from 'react'
import { Link } from 'react-router-dom'
const SearchForm = (props) => {
	const { handleSidebar, closeSearch } = props
	const { images, title, price, slug } = props.value
	return (
		<Link
			to={`/product/${slug}`}
			onClick={() => {
				handleSidebar()
				closeSearch()
			}}
			className="bg-white text-gray-700 dark:text-white dark:bg-darkBgColor transition-all py-2 px-2 border border-gray-200 shadow-md rounded-lg my-2 flex overflow-hidden"
		>
			<div className="h-16 w-14 flex items-center justify-center ml-2 mr-6 ">
				<img
					src={images[0]?.url}
					alt={title}
					className="h-full object-contain rounded"
				/>
			</div>
			<div className="flex flex-1 justify-between items-center">
				<div className="text-base font-semibold">
					<p className="uppercase">{title}</p>
					<p className="text-gray-400 text-sm">
						{parseInt(price).toLocaleString('en')} vnđ
					</p>
				</div>
			</div>
		</Link>
	)
}
const Search = ({ value, handleSidebar, closeSearch }) => {
	return (
		<div className="absolute top-full bg-white dark:bg-darkHeaderColor bg-opacity-80 dark:text-white mt-2 h-80v overflow-y-auto z-10 -left-1 -right-1">
			<div className="flex flex-col">
				{value?.map((items, i) => (
					<SearchForm
						key={i}
						value={items}
						handleSidebar={handleSidebar}
						closeSearch={closeSearch}
					/>
				))}
			</div>
		</div>
	)
}

export default Search
