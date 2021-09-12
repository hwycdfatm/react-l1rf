import React from 'react'
import catLoading from './loading.webp'
export default function Loading() {
	return (
		<div className="fixed top-16 left-0 right-0 bottom-0 flex items-center justify-center bg-white">
			<div>
				<img src={catLoading} alt="" />
			</div>
		</div>
	)
}
