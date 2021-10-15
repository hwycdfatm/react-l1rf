import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '../../../images/facebook.png'
import InstgramIcon from '../../../images/instagram.png'
import TwitterIcon from '../../../images/twitter.png'
import { GlobalState } from '../../../GlobalState'
const Footer = () => {
	const { categories } = useContext(GlobalState)
	return (
		<section className="relative border-t dark:border-transparent pt-8 pb-6 bg-transparent dark:bg-darkHeaderColor transition-all dark:text-white">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap text-left lg:text-left">
					<div className="w-full lg:w-6/12 px-4">
						<h4 className="text-3xl fonat-semibold mb-2">
							Hãy mua sắm nàooooo!
						</h4>
						<h5 className="text-lg mt-0 mb-5">
							Mua những món đồ xinh đẹp với giá cả phải chăngggg
						</h5>
						<div className="flex space-x-6 mb-10">
							<a
								className="h-10 w-10 rounded-full overflow-hidden border"
								href="https://facebook.com/mai.tritoann"
								target="_blank"
								rel="noreferrer"
							>
								<img src={FacebookIcon} alt="Facebook của toàn" />
							</a>
							<a
								className="h-10 w-10 rounded-full overflow-hidden border"
								href="https://instagram.com/hwycdfatm"
								target="_blank"
								rel="noreferrer"
							>
								<img src={InstgramIcon} alt="Instagram của toàn" />
							</a>
							<a
								className="h-10 w-10 rounded-full overflow-hidden border"
								href="https://facebook.com/mai.tritoann"
								target="_blank"
								rel="noreferrer"
							>
								<img src={TwitterIcon} alt="Twitter của toàn" />
							</a>
						</div>
					</div>

					<div className="w-full lg:w-6/12 px-4">
						<div className="flex flex-wrap">
							<div className="w-full lg:w-4/12 ml-auto mb-6 lg:mb-0">
								<span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
									Hỗ trợ
								</span>
								<ul className="pl-4 max-w-max">
									<li>
										<Link
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											to="/dieu-khoan"
										>
											Điều khoản &amp; dịch vụ
										</Link>
									</li>
									<li>
										<Link
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											to="/about-us"
										>
											Về chúng tôi
										</Link>
									</li>
								</ul>
							</div>
							<div className="w-full lg:w-4/12 mb-6 lg:mb-0">
								<span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
									Liên hệ
								</span>
								<ul className="pl-4 max-w-max">
									<li>
										<a
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											href="mailto:mai.tritoan7102@gmail.com"
										>
											Email góp ý
										</a>
									</li>
									<li>
										<a
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											href="tel:0339331767"
										>
											Hotline phản ánh
										</a>
									</li>
								</ul>
							</div>
							<div className="w-full lg:w-4/12">
								<span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
									Danh mục
								</span>
								<ul className="pl-4 max-w-max">
									{categories.map((category) => (
										<li key={category._id}>
											<Link
												className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
												to={`/category/${category.slug}`}
											>
												{category.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<hr className="my-6 border-blueGray-300" />
				<div className="flex flex-wrap items-center md:justify-between justify-center">
					<div className="w-full md:w-4/12 px-4 mx-auto text-center">
						<div className="text-sm text-blueGray-500 font-semibold py-1">
							Copyright © 2021 by Mai Trí Toàn I Tờ .
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Footer
