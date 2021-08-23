import React, { useState, useEffect } from 'react'
import axios from 'axios'
const CategoryAdmin = () => {
	const [products, setProducts] = useState([])
	const [load, setLoad] = useState(true)
	const [fail, setFail] = useState(false)

	useEffect(() => {
		async function fetchProduct() {
			try {
				const result = await axios.get(`/api/product`)

				setProducts(result.data.data)
			} catch (err) {
				if (err) return setFail(true)
			}
		}
		fetchProduct()
	}, [])
	return <div>heheheh</div>
}

export default CategoryAdmin
