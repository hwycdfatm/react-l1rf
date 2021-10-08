import React from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '../../../images/facebook.png'
import InstgramIcon from '../../../images/instagram.png'
import TwitterIcon from '../../../images/twitter.png'

const Footer = () => {
	return (
		<div className="w-full flex justify-center items-center bg-black text-white py-5">
			<div className="flex flex-col space-y-5">
				<div className="flex space-x-10">
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.facebook.com/mai.tritoann/"
						className="flex flex-col justify-center items-center space-y-2"
					>
						<img
							src={FacebookIcon}
							alt="l1rf-facebook"
							className="w-10 h-10 rounded-full"
						/>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.instagram.com/hwycdfatm/"
						className="flex flex-col justify-center items-center space-y-2"
					>
						<img
							src={InstgramIcon}
							alt="l1rf-instagram"
							className="w-10 h-10 rounded-full"
						/>
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.instagram.com/hwycdfatm/"
						className="flex flex-col justify-center items-center space-y-2"
					>
						<img
							src={TwitterIcon}
							alt="l1rf-twitter"
							className="w-10 h-10 rounded-full"
						/>
					</a>
				</div>
				<div className="text-center">
					<Link to="/dieu-khoan">Điều khoản sử dụng</Link>
				</div>
				<a className="text-center" href="tel:0339331767">
					Liên hệ với Toànn
				</a>
				<p className="text-center text-sm text-gray-300">
					@2021 Mai Trí Toàn I Tờ
				</p>
			</div>
		</div>
	)
}

export default Footer
