import React from 'react'
export default function LoadingBtn() {
	return (
		<div className="flex space-x-3 justify-center loader">
			<div className="h-2 w-2 rounded-full bg-white animate-bounce duration-200"></div>
			<div className="h-2 w-2 rounded-full bg-white animate-bounce duration-200"></div>
			<div className="h-2 w-2 rounded-full bg-white animate-bounce duration-200"></div>
		</div>
	)
}
