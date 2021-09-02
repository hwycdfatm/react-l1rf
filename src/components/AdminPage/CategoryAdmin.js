import React, { useState, useEffect, useContext } from 'react'
import productAPI from '../../api/productAPI'
import Form from './Form'
import { useTransition, animated } from 'react-spring'
import { GlobalState } from '../../GlobalState'
const CategoryAdmin = () => {
	const { token } = useContext(GlobalState)
	const [productList, setProductList] = useState([])

	const [product, setProduct] = useState({})

	const [visible, setVisible] = useState(false)
	const transition = useTransition(visible, {
		from: { x: 100, y: 800, opacity: 0 },
		enter: { x: 0, y: 0, opacity: 1 },
		leave: { x: 200, y: 300, opacity: 0 },
	})
	const onChangeInput = (e) => {
		const { name, value } = e.target
		setProduct({ ...product, [name]: value })
	}

	useEffect(() => {
		async function fetchProduct() {
			try {
				const result = await productAPI.getAll()
				if (result.status === 'Success') {
					setProductList(result.data)
				}
			} catch (err) {
				// if (err) return setFail(true)
				console.log(err)
			}
		}
		fetchProduct()
	}, [])

	useEffect(() => {
		setVisible('')
	}, [])

	const handleShowFormEdit = (id) => {
		if (!visible) {
			setVisible(true)
			setProduct(productList.filter((e) => e._id === id))
		}
	}
	const handleDelete = async (id) => {
		try {
			await productAPI.delete(id, token)
			setProduct(productList.filter((e) => e._id !== id))
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<>
			{transition(
				(style, item) =>
					item && (
						<Form
							styles={style}
							onChangeInput={onChangeInput}
							product={product}
							setProduct={setProduct}
							setVisible={setVisible}
							visible={visible}
						/>
					)
			)}

			<div className="mt-10 lg:mt-0 lg:ml-56 p-3 flex flex-col space-y-4 relative">
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
									src={product.images[0].url}
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
