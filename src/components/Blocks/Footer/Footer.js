import React from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '../../../images/facebook.png'
import InstgramIcon from '../../../images/instagram.png'
import TwitterIcon from '../../../images/twitter.png'

const Footer = () => {
	return (
		<div className="w-full flex justify-center items-center bg-white border-t text-black dark:bg-darkHeaderColor transition-all font-semibold dark:text-white dark:border-transparent py-16">
			<div className="flex flex-col space-y-5">
				<div className="flex space-x-10">
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.facebook.com/mai.tritoann/"
						className="w-12 h-12 rounded-full overflow-hidden border dark:border-transparent flex flex-col justify-center items-center"
					>
						<img src={FacebookIcon} alt="l1rf-facebook" className="w-full" />
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.instagram.com/hwycdfatm/"
						className="w-12 h-12 rounded-full overflow-hidden border dark:border-transparent flex flex-col justify-center items-center"
					>
						<img src={InstgramIcon} alt="l1rf-instagram" className="w-full" />
					</a>
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.instagram.com/hwycdfatm/"
						className="w-12 h-12 rounded-full overflow-hidden border dark:border-transparent flex flex-col justify-center items-center"
					>
						<img src={TwitterIcon} alt="l1rf-twitter" className="w-full" />
					</a>
				</div>
				<div className="text-center">
					<Link to="/dieu-khoan">Điều khoản sử dụng</Link>
				</div>
				<a className="text-center" href="tel:0339331767">
					Liên hệ với Toànn
				</a>
				<p className="text-center text-sm text-gray-600 dark:text-gray-200">
					@2021 Mai Trí Toàn I Tờ
				</p>
			</div>
		</div>
	)
}

export default Footer
