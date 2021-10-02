import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'

const CategoryManager = () => {
	const { categories } = useContext(GlobalState)
	console.log(categories)
	return (
		<div className="lg:ml-56 mt-10 lg:mt-0 min-h-screen flex flex-col">
			<div className="ppy-3 px-5">
				<div>Thêm mới danh mục</div>
				<div>
					Các danh mục hiện có
					<div className="flex flex-col space-y-2">
						<div className="h-96 flex rounded-lg overflow-hidden relative shadow-lg">
							<img
								src="https://static.dosi-in.com/images/news_content/507/2021/06/10/cargo-pants-chiec-quan-ben-bi_2021_06_10_4.jpg"
								alt=""
								className="h-full object-cover"
							/>
							<div>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
								amet autem veniam eum. Magni, laborum nesciunt laudantium
								maiores, quae commodi sequi alias unde a quod voluptatum sed
								ducimus! Aperiam, consequuntur.
							</div>
							<p className="absolute text-6xl bg-white p-1 text-green-300 font-bold top-52 left-10">
								Pants
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CategoryManager
