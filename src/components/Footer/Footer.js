import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<div className="w-ful bg-black text-white h-20">
			<div className="max-w-screen-xl mx-auto flex justify-center items-center">
				<Link to="/dieu-khoan">Điều khoản</Link>
			</div>
		</div>
	)
}

export default Footer
