import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
// import sliderAPI from '../../api/slideAPI'
import uploadImageAPI from '../../api/uploadImageAPI'
import { checkImage } from '../../utils/handleUploadAndDeleteImage'

const FormSlide = ({ showFormSlide, setShowFormSlide }) => {
	const { token } = useContext(GlobalState)

	const handleUploadImage = async (e) => {
		e.preventDefault()
		try {
			const files = e.target.files
			const formData = new FormData()

			formData.append('file', files[0])
		} catch (error) {
			console.error(error.message)
		}
	}

	// const handleUploadSlide = async () => {
	// 	try {
	// 		const result = sliderAPI.create()
	// 	} catch (error) {
	// 		console.error(error.message)
	// 	}
	// }

	return (
		<div
			className={`fixed top-0 bottom-0 right-0 left-0 z-30 lg:pl-56 shadows-xl min-h-screen flex flex-col bg-white bg-opacity-90 transition duration-700 transform animation-scale scrollbar animation-down`}
		>
			<div className="p-3">
				<div className="w-full h-60v">
					{/* <img src="" alt="" className="h-full object-cover" />
					<div className="absolute top-1 right-1 text-red-300 cursor-pointer">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</div> */}
					<label
						htmlFor="image-upload"
						className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg"
					>
						<svg
							className="w-10 h-10"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
					</label>
				</div>

				<form>
					<input
						type="file"
						hidden
						id="image-upload"
						onChange={handleUploadImage}
					/>
					<div className="mx-auto max-w-screen-md mt-10">
						<input
							type="text"
							placeholder="Nhập tiêu đề của Slide ở đây"
							className="w-full text-base p-3 border-2 border-gray-800 rounded focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="text-base max-w-screen-md mt-10 mx-auto space-y-4 flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-3 justify-between">
						<button
							type="submit"
							className="w-full px-2 py-2 text-white bg-green-300 rounded font-medium xl:px-4"
						>
							Thêm
						</button>
						<button
							onClick={() => setShowFormSlide(!showFormSlide)}
							type="button"
							className="w-full px-2 py-2 text-white bg-red-400 rounded font-medium xl:px-4"
						>
							Hủy
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default FormSlide
