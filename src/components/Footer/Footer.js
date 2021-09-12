import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<div className="w-ful">
			<div className="max-w-screen-xl mx-auto flex flex-col p-5">
				<div className="flex flex-col items-center justify-center p-3 mt-6">
					<Link to="/dieu-khoan">Điều khoản</Link>
				</div>
			</div>
		</div>
	)
}

export default Footer
