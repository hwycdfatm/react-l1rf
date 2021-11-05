import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import categoryAPI from '../../api/categoryAPI'
const CategoryManager = () => {
	const [valueForm, setValueForm] = useState('')
	const [categories, setCategories] = useState([])
	const { token } = useContext(GlobalState)

	const fetchCategories = async () => {
		try {
			const result = await categoryAPI.get()
			setCategories(result.data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchCategories()
	}, [])

	const submitForm = async () => {
		try {
			if (!valueForm) return
			const result = await categoryAPI.create({ name: valueForm }, token)
			if (result.status === 'Success') {
				alert(result.message)
				fetchCategories()
				setValueForm('')
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleDelete = async (id) => {
		try {
			const result = await categoryAPI.delete(id, token)
			if (result.status === 'Success') {
				setCategories((pre) => pre.filter((category) => category._id !== id))
				alert(result.message)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="lg:ml-56 mt-10 lg:mt-0 flex flex-col">
			<div className="py-3 px-5 flex" style={{ minHeight: '95vh' }}>
				<div className="w-full md:w-1/2 flex flex-col space-y-6">
					{categories?.map((category) => (
						<div
							key={category._id}
							className="flex justify-between w-full px-5 py-2 items-center border"
						>
							<p className="text-4xl md:text-6xl bg-white font-bold text-purple-400">
								{category.name}
							</p>
							<button
								onClick={() => handleDelete(category._id)}
								className="focus:outline-none focus:shadow-outline"
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
							</button>
						</div>
					))}
					<div className="flex flex-col space-y-2 w-full">
						<input
							type="text"
							value={valueForm}
							onChange={(e) => setValueForm(e.target.value)}
							className="px-3 py-2 border-gray-700 border text-2xl text-purple-400"
						/>
						<button
							onClick={() => submitForm()}
							className="py-3 border bg-green-300 text-white font-semibold text-lg w-full"
						>
							Thêm mới
						</button>
					</div>
				</div>
				<div className="hidden md:flex w-1/2 pl-10">
					<div className="relative w-full h-auto transition-all">
						<div className="transition-transform absolute p-20 shadow-lg -left-4 top-32 bg-pink-500 rounded-full" />
						<div className="transition-transform absolute p-20 shadow-lg top-10 -right-6 bg-red-300 rounded transform rotate-12" />
						<div className="transition-transform absolute w-56 p-20 shadow-lg bottom-10 -right-6 bg-green-300 rounded transform rotate-12" />
						<div
							style={{ transform: 'rotate(-36deg)' }}
							className="overflow-hidden absolute w-80 -top-16 left-20"
						>
							<div className="transition-transform h-56 w-56 bg-yellow-300 rotate-45 transform origin-bottom-left"></div>
						</div>
						<div
							style={{ transform: 'rotate(26deg)' }}
							className="overflow-hidden absolute w-80 bottom-56 left-0"
						>
							<div className="transition-transform h-32 w-32 bg-purple-600 rotate-45 transform origin-bottom-left"></div>
						</div>
						<div className="transition-transform absolute w-full max-w-screen-xs p-20 shadow-lg bottom-20 -left-6 bg-gray-300 rounded transform -rotate-45" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default CategoryManager
