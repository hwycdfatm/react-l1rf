import React, { useState, useEffect, useContext } from 'react'
import productAPI from '../../api/productAPI'
import Form from './Form'
import { GlobalState } from '../../GlobalState'
const CategoryAdmin = () => {
	const { token } = useContext(GlobalState)
	const [productList, setProductList] = useState([])

	const [product, setProduct] = useState({})

	const [visible, setVisible] = useState(false)

	const onChangeInput = (e) => {
		const { name, value } = e.target
		setProduct({ ...product, [name]: value })
	}
	async function fetchProduct() {
		try {
			const result = await productAPI.getAll()
			if (result.status === 'Success') {
				setProductList([...result.data])
			}
		} catch (err) {
			console.log(err)
		}
	}
	useEffect(() => {
		fetchProduct()
	}, [])

	const handleShowFormEdit = (id) => {
		if (!visible) {
			setVisible(true)
			setProduct(...productList.filter((e) => e._id === id))
		}
	}
	const handleDelete = async (id) => {
		try {
			await productAPI.delete(id, token)
			setProductList([...productList.filter((e) => e._id !== id)])
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<>
			{visible && (
				<Form
					onChangeInput={onChangeInput}
					product={product}
					setProduct={setProduct}
					setVisible={setVisible}
					visible={visible}
					fetchProduct={fetchProduct}
				/>
			)}

			<div className="mt-10 lg:mt-0 lg:ml-56 p-3 flex flex-col space-y-4 relative w-full ">
				<div>phần lọc</div>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
					{productList.map((product, index) => (
						<div
							key={index}
							className="rounded-lg shadow-lg hover:shadow-xl transition duration-700 border overflow-hidden relative"
						>
							<input
								type="checkbox"
								className="w-4 h-4 absolute top-1 right-1"
							/>
							<div className="bg-white">
								<img
									src={product.images[0]?.url}
									alt={product.title}
									className="w-full object-cover h-48"
								/>
								<div className="flex flex-col space-y-1 py-1 px-2">
									<span className="text-sm font-semibold truncate">
										{product.title}
									</span>
									<span className="text-xs font-semibold ">
										{product.price}
									</span>
									<div className="flex p-1 justify-center item-center space-x-3">
										<button
											onClick={() => handleShowFormEdit(product._id)}
											className="bg-yellow-400 w-20 rounded-md font-medium text-white transform hover:-translate-y-1 transition-all"
										>
											Sửa
										</button>
										<button
											onClick={() => handleDelete(product._id)}
											className="bg-red-400 w-20 rounded-md font-medium text-white transform hover:-translate-y-1 transition-all"
										>
											Xóa
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default CategoryAdmin
