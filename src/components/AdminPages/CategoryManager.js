import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'

const CategoryManager = () => {
	const { categories } = useContext(GlobalState)
	return (
		<div className="lg:ml-56 mt-10 lg:mt-0 min-h-screen flex flex-col">
			<div className="py-3 px-5">
				<div>
					<div className="flex flex-col space-y-6">
						{categories?.map((category) => (
							<div key={category._id} className="flex">
								<p className="text-6xl bg-white text-green-300 font-bold">
									{category.name}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CategoryManager
