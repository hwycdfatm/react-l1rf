import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '../../../images/facebook.png'
import InstgramIcon from '../../../images/instagram.png'
import TwitterIcon from '../../../images/twitter.png'
import { GlobalState } from '../../../GlobalState'
import assectAPI from '../../../api/assectAPI'
import './style-gradient.css'
const Footer = () => {
	const { categories } = useContext(GlobalState)
	const [assect, setAssect] = useState({})
	useEffect(() => {
		const fetchAssect = async () => {
			try {
				const result = await assectAPI.get()
				setAssect(result.data[0])
			} catch (error) {
				console.log(error)
			}
		}
		fetchAssect()
	}, [])
	return (
		<section className="relative border-t dark:border-transparent pb-6 bg-transparent dark:bg-darkHeaderColor transition-all dark:text-white">
			<div className="bottom-shide h-1 mb-12"></div>
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap text-left lg:text-left">
					<div className="w-full lg:w-6/12 px-4">
						<h4 className="text-3xl fonat-semibold mb-2">
							Hãy mua sắm nàooooo!
						</h4>
						<h5 className="text-lg mt-0 mb-5">
							Mua những món đồ xinh đẹp với giá cả phải chăngggg
						</h5>
						<div className="flex space-x-6 mb-5">
							<a
								className="h-10 w-10 rounded-full overflow-hidden border"
								href={assect.fb}
								target="_blank"
								rel="noreferrer"
							>
								<img src={FacebookIcon} alt="Facebook của toàn" />
							</a>
							<a
								className="h-10 w-10 rounded-full overflow-hidden border"
								href={assect.instagram}
								target="_blank"
								rel="noreferrer"
							>
								<img src={InstgramIcon} alt="Instagram của toàn" />
							</a>
							<a
								className="h-10 w-10 rounded-full overflow-hidden border"
								href={assect.twitter}
								target="_blank"
								rel="noreferrer"
							>
								<img src={TwitterIcon} alt="Twitter của toàn" />
							</a>
						</div>
						<div className="mb-5 lg:mb-0">
							<a
								target="_blank"
								rel="noreferrer"
								href="https://goo.gl/maps/49UqG5VJJJFNegDh7"
								className="text-sm font-medium font-maven"
							>
								Địa chỉ: {assect.address}
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
											href={`mailto:${assect.email}`}
										>
											Email góp ý
										</a>
									</li>
									<li>
										<a
											className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
											href={`tel:${assect.phone}`}
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
						<div className="text-sm text-blueGray-500 font-semibold py-1 tracking-widest">
							Copyright © 2021 by Mai Trí Toàn I Tờ .
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Footer
