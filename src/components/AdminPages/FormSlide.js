import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import CheckImages from '../../utils/CheckImages'
import uploadImageAPI from '../../api/uploadImageAPI'
const FormSlide = ({
	showFormSlide,
	setShowFormSlide,
	slider,
	setSlider,
	handleUploadSlider,
}) => {
	const { token, admin } = useContext(GlobalState)

	const handleUploadImage = async (e) => {
		e.preventDefault()
		try {
			if (!admin) return alert('bạn không có quyền')
			const files = e.target.files[0]
			if (files.length === 0) return alert('Vui lòng chọn ảnh')
			let formData = new FormData()

			const check = CheckImages(files)
			if (check) formData.append('images', files)

			const res = await uploadImageAPI.upload(formData, token)
			setSlider({ ...slider, image: res.images[0] })
		} catch (error) {
			console.log(error)
		}
	}
	const handleDestroy = async (public_name) => {
		try {
			if (!admin) return alert('Mày không có quyền')

			await uploadImageAPI.delete(public_name, token)

			setSlider({ ...slider, image: '' })
		} catch (err) {
			alert(err)
		}
	}
	return (
		<div
			className={`fixed top-0 bottom-0 right-0 left-0 z-50 lg:pl-56 shadows-xl min-h-screen flex flex-col bg-white bg-opacity-90 transition duration-700 transform animation-scale scrollbar animation-down`}
		>
			<div className="p-3">
				<div className="w-full h-60v">
					{slider.image ? (
						<>
							<img
								src={slider.image.url}
								alt="Ảnh nè"
								className="h-full object-fit w-full"
							/>
							<div
								onClick={() => handleDestroy(slider.image.public_name)}
								className="absolute top-3 right-3 text-red-500 cursor-pointer"
							>
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
							</div>
						</>
					) : (
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
					)}
				</div>

				<form onSubmit={handleUploadSlider}>
					<input
						type="file"
						hidden
						id="image-upload"
						onChange={handleUploadImage}
					/>
					<div className="mx-auto max-w-screen-md mt-10">
						<input
							type="text"
							onChange={(e) => setSlider({ ...slider, title: e.target.value })}
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
							onClick={() => {
								slider.image && handleDestroy(slider.image.public_name)
								setShowFormSlide(!showFormSlide)
							}}
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
