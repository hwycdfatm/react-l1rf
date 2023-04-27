import { useState, useEffect } from 'react'

import NoFoundImage from '../../images/no-found.jpg'
const ImageFallBack = ({ src, ...rest }) => {
	const [imgSrc, setImgSrc] = useState(src)
	useEffect(() => {
		setImgSrc(
			`https://raw.githubusercontent.com/hwycdfatm/image/main/${src
				.split('/')
				.slice(-1)[0]
				.toString()}`
		)
	}, [src])

	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		<img
			{...rest}
			src={imgSrc ? imgSrc : NoFoundImage}
			onError={() => {
				setImgSrc(NoFoundImage)
			}}
		/>
	)
}

export default ImageFallBack
