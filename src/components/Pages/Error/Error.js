import React from 'react'
import notFound from './notFound.jpg'
import Seo from '../../../utils/Seo'
const Error = () => {
	return (
		<>
			<Seo title="404 || Không tìm thấy" />
			<div className="mx-auto flex items-center justify-center h-screen font-mono text-5xl">
				<img src={notFound} alt="Không tìm thấy" />
			</div>
		</>
	)
}

export default Error
