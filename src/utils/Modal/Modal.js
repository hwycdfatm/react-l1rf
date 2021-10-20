import React from 'react'
import ReactDOM from 'react-dom'
import FireWorksIcon from '../../images/confetti.png'
const Modal = ({ isShowing, hide, text, type }) =>
	isShowing
		? ReactDOM.createPortal(
				<React.Fragment>
					<div className="fixed flex items-center justify-center bg-opacity-70 bg-gray-200 inset-0 z-50 animation-opacity">
						<div className="w-72 h-44 md:w-96 md:h-48 p-3 flex flex-col justify-between -mt-44 bg-white rounded-lg shadow-md">
							<p className="text-gray-800 text-center text-lg font-maven">
								{text}
								{type === 'ok' ? (
									<img
										src={FireWorksIcon}
										alt=""
										className="w-16 h-16 mx-auto my-4 "
									/>
								) : type === 'alert' ? (
									<svg
										className="w-20 h-20 mx-auto my-4 text-red-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								) : (
									''
								)}
							</p>

							<button
								type="button"
								className={`px-7 rounded-lg py-1 mx-auto ${
									type === 'alert' ? 'bg-red-500' : 'bg-blue-500'
								}`}
								onClick={hide}
							>
								<span className="text-white">Ok</span>
							</button>
						</div>
					</div>
				</React.Fragment>,
				document.body
		  )
		: null

export default Modal
