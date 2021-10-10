import React, { useEffect } from 'react'
import axios from 'axios'
const Test = () => {
	useEffect(() => {
		async function redirectToFacebook() {
			const result = await axios.get('http://localhost:5000/api_v1/test')
			console.log(result)
		}
		redirectToFacebook()
	}, [])
	return <div className="mt-56 text-7xl">Hello test</div>
}

export default Test
