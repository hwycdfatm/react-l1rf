import React from 'react'
import ThinhIMG from '../../../images/thinh.jpg'
import ToanIMG from '../../../images/toan.jpg'
const About = () => {
	return (
		<div className="mx-auto w-full max-w-screen-xl flex flex-col md:flex-row justify-center items-center md:items-stretch p-4 md:space-x-10 py-10">
			<div className="w-full max-w-md py-4 px-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg my-20 space-y-4 transition-all">
				<div className="flex justify-center md:justify-end -mt-16">
					<img
						alt="hello"
						className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
						src={ThinhIMG}
					/>
				</div>
				<div>
					<h2 className="text-gray-800 text-3xl font-semibold dark:text-white transition-all">
						Nguyễn Quốc Thịnh
					</h2>
					<p
						style={{ minHeight: 100 }}
						className="mt-5 text-gray-600 dark:text-gray-200 transition-all"
					>
						Băng vệ sinh dội nước còn thấm! <br />
						Tình mình dù đầm thấm vẫn tàn phai......
					</p>
				</div>
				<div className="flex justify-end mt-4">
					<a
						target="_blank"
						href="https://www.facebook.com/nqthinh.0210"
						rel="noreferrer"
						className="text-lg font-medium text-indigo-500"
					>
						FB:Nguyễn Thịnh
					</a>
				</div>
			</div>
			<div className="w-full max-w-md py-4 px-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg my-20 space-y-4 transition-all">
				<div className="flex justify-center md:justify-end -mt-16">
					<img
						alt="hello"
						className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
						src={ToanIMG}
					/>
				</div>
				<div>
					<h2 className="text-gray-800 text-3xl font-semibold dark:text-white transition-all">
						Mai Trí Toàn
					</h2>
					<p
						style={{ minHeight: 100 }}
						className="mt-5 text-gray-600 dark:text-gray-200 transition-all"
					>
						Khi bạn cảm thấy buồn chán.... <br />
						Hãy đi ỉa
					</p>
				</div>
				<div className="flex justify-end mt-4">
					<a
						target="_blank"
						href="https://facebook.com/mai.tritoann"
						rel="noreferrer"
						className="text-lg font-medium text-indigo-500"
					>
						FB:Mai Trí Toàn
					</a>
				</div>
			</div>
		</div>
	)
}

export default About
